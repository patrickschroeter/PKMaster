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

/** Services */
import {
    UserService,
    PermissionService
} from 'app/core';
import { AlertService } from 'app/modules/alert';

/** Models */
import { UserDetailDto, FieldDto } from 'app/swagger';
import { Fields } from 'app/models';

/** Decorators */
import { Access, OnAccess } from 'app/shared/decorators/access.decorator';

/**
 * UsersEditComponent
 *
 * @export
 * @class UsersEditComponent
 * @implements {OnInit}
 * @implements {OnAccess}
 */
@Component({
    selector: 'pk-users-edit',
    templateUrl: './users-edit.component.html',
    styleUrls: ['./users-edit.component.scss']
})
export class UsersEditComponent implements OnInit, OnAccess {
    @HostBinding('class') classes = 'content--default';

    public user: UserDetailDto;
    public form: FieldDto[];

    /**
     * Creates an instance of UsersEditComponent.
     * @param {UserService} userService
     * @param {ActivatedRoute} activatedRoute
     * @param {Router} router
     * @param {PermissionService} permission
     * @param {AlertService} alert
     *
     * @memberOf UsersEditComponent
     */
    constructor(
        private userService: UserService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        public permission: PermissionService,
        public alert: AlertService
    ) { }

    /**
     * implements OnInit
     *
     * @memberOf UsersEditComponent
     */
    ngOnInit() {
        this.getUser();
    }

    /**
     * get the user by param id
     *
     * @private
     *
     * @memberOf UsersEditComponent
     */
    @Access('EditUsers')
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
     * @memberOf UsersEditComponent
     */
    @Access('EditUsers')
    private initUserForm(user: UserDetailDto) {
        this.form = [
            new Fields.Firstname(user.firstname),
            new Fields.Lastname(user.lastname),
            new Fields.Devider(),
            new Fields.Email(user.email)
        ];
    }

    /**
     * save the user
     *
     * @param {UserDetailDto} user
     *
     * @memberOf UsersEditComponent
     */
    @Access('EditUsers')
    public save(user: UserDetailDto): void {
        user.id = this.user.id;
        this.userService.updateUser(user).subscribe(result => {
            this.router.navigate(['', 'admin', 'users', result.id]);
        });
    }

    /**
     * cancel edit user
     *
     * @memberOf UsersEditComponent
     */
    @Access('EditUsers')
    public cancel(): void {
        this.router.navigate(['', 'admin', 'users', this.user.id]);
    }

}
