/**
 *
 * @author Patrick Schröter <patrick.schroeter@hotmail.de>
 *
 * @license CreativeCommons BY-NC-SA 4.0 2017
 *
 * This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/.
 *
 */

import { Component, OnInit, HostBinding, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import * as _ from 'lodash';

/** Services */
import {
    UserService,
    PermissionService,
    RoleService
} from 'app/core';
import { ModalService } from 'app/modules/overlay';
import { TranslationService } from 'app/modules/translation';
import { AlertService } from 'app/modules/alert';

/** Models */
import { UserDetailDto, FieldDto, RoleDto } from 'app/swagger';
import { Fields, Selectable } from 'app/models';

/** Decorators */
import { Access, OnAccess } from 'app/shared/decorators/access.decorator';

/**
 * UsersDetailComponent
 *
 * @export
 * @class UsersDetailComponent
 * @implements {OnInit}
 */
@Component({
    selector: 'pk-users-detail',
    templateUrl: './users-detail.component.html',
    styleUrls: ['./users-detail.component.scss']
})
export class UsersDetailComponent implements OnInit, OnAccess {

    @HostBinding('class') classes = 'content--default';

    public user: UserDetailDto;
    public form: FieldDto[];
    private roles: Selectable[];

    /**
     * Creates an instance of UsersDetailComponent.
     * @param {UserService} userService
     * @param {ActivatedRoute} activatedRoute
     * @param {Router} router
     * @param {PermissionService} permission
     * @param {AlertService} alert
     * @param {ModalService} modalService
     * @param {TranslationService} translationService
     * @param {RoleService} roleService
     *
     * @memberOf UsersDetailComponent
     */
    constructor(
        private userService: UserService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        public permission: PermissionService,
        public alert: AlertService,
        private modalService: ModalService,
        private translationService: TranslationService,
        private roleService: RoleService
    ) { }

    /**
     * implements OnInit
     *
     * @memberOf UsersDetailComponent
     */
    ngOnInit() {
        this.getUser();

        this.roleService.getRoles().subscribe(roles => {
            this.roles = roles.map(obj => { return new Selectable(obj.id, obj.name); });
        });
    }

    /**
     * get the user by param id
     *
     * @private
     *
     * @memberOf UsersDetailComponent
     */
    @Access('ReadUsers')
    private getUser(): void {
        this.activatedRoute.params.forEach((params: Params) => {
            this.userService.getUserById(params['id']).subscribe(user => {
                if (!user) { return this.router.navigate(['admin', 'users']); }
                this.user = user;
                this.initUserForm(user);
            }, error => {
                console.error(error);
                this.router.navigate(['admin', 'users']);
            });
        });
    }

    /**
     * initialize the user form
     *
     * @private
     * @param {UserDetailDto} user
     *
     * @memberOf UsersDetailComponent
     */
    @Access('ReadUsers')
    private initUserForm(user: UserDetailDto) {
        this.form = [
            new Fields.Firstname(user.firstname),
            new Fields.Lastname(user.lastname),
            new Fields.Devider(),
            new Fields.Email(user.email),
            new Fields.Matrikelnummer(user.ldapId ? user.ldapId.toString() : '')
        ];
    }

    /**
     * remove role from user
     *
     * @param {RoleDto} role
     *
     * @memberOf UsersDetailComponent
     */
    @Access(['EditUsers', 'EditRoles'])
    public removeRole(role: RoleDto): void {
        this.userService.removeRoleFromUser(this.user, role).subscribe(result => {
            this.user = result;
        });
    }

    /**
     * open the modal to add permission to role
     *
     * @memberOf UsersDetailComponent
     */
    @Access(['EditUsers', 'EditRoles'])
    public addRoleToUserModal(): void {
        this.modalService.createListModal({
            title: this.translationService.translate('addRoleToUser'),
            list: this.roles,
            click: this.addRoleToUser.bind(this),

            selectedValues: this.user.roles.map(obj => { return obj.id; }),

            emptyText: this.translationService.translate('noRolesAvailable'),
            redirect: this.permission.hasPermission('EditRoles'),
            redirectText: this.translationService.translate('createNewRole'),
            redirectParam: ['', 'admin', 'roles']
        });
    }

    /**
     * add/remove the given permission to the role
     *
     * @private
     * @param {Selectable} data
     *
     * @memberOf UsersDetailComponent
     */
    @Access(['EditUsers', 'EditRoles'])
    private addRoleToUser(data: Selectable): void {
        const role = _.find(this.user.roles, (obj: RoleDto) => obj.id === data.value);
        const fn = (result: UserDetailDto) => {
            this.user = result;
            this.modalService.updateSelectedValues(result.roles.map(obj => { return obj.id; }));
        };
        if (role) {
            this.userService.removeRoleFromUser(this.user, role).subscribe(fn.bind(this));
        } else {
            this.userService.addRoleToUser(this.user.id, data.value).subscribe(fn.bind(this));
        }
    }

}
