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
import { RoleService, PermissionService } from 'app/core';
import { OverlayComponent, ModalService } from 'app/modules/overlay';
import { TranslationService } from 'app/modules/translation';
import { AlertService } from 'app/modules/alert';

/** Models */
import { RoleDto, FieldDto, PermissionDto } from 'app/swagger';
import { Selectable } from 'app/models';

/** Decorator */
import { Access, OnAccess } from 'app/shared/decorators/access.decorator';

/**
 * RolesDetailComponent
 *
 * @export
 * @class RolesDetailComponent
 * @implements {OnInit}
 * @implements {OnAccess}
 */
@Component({
    selector: 'pk-roles-detail',
    templateUrl: './roles-detail.component.html',
    styleUrls: ['./roles-detail.component.scss']
})
export class RolesDetailComponent implements OnInit, OnAccess {
    @HostBinding('class') classes = 'content--default';

    @ViewChild('overlay') overlay: OverlayComponent;

    public role: RoleDto;
    public editRoleForm: FieldDto[];

    private permissions: Selectable[];

    /**
     * Creates an instance of RolesDetailComponent.
     * @param {ActivatedRoute} activatedRoute
     * @param {Router} router
     * @param {RoleService} roleService
     * @param {ModalService} modalService
     * @param {TranslationService} translationService
     * @param {PermissionService} permission
     * @param {AlertService} alert
     *
     * @memberOf RolesDetailComponent
     */
    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private roleService: RoleService,
        private modalService: ModalService,
        private translationService: TranslationService,
        public permission: PermissionService,
        public alert: AlertService
    ) { }

    /**
     * implements OnInit
     *
     * @memberOf RolesDetailComponent
     */
    ngOnInit() {
        this.getRoleByRouteParam();

        this.permission.getPermissions().subscribe(result => {
            this.permissions = result.map(obj => { return new Selectable(obj.id, obj.name); });
        });
    }

    /**
     * Read Route Param and GET Role with param ID
     *
     * @private
     *
     * @memberOf RolesDetailComponent
     */
    @Access('ReadRoles')
    private getRoleByRouteParam(): void {
        this.activatedRoute.params.forEach((params: Params) => {
            this.roleService.getRoleById(params['id']).subscribe((role) => {
                if (!role) { return this.router.navigate(['admin', 'roles']); }
                this.role = role;
                /** TODO: permission denied when no 'ReadRoles' permission */
                this.initEditRoleForm();
            }, error => {
                console.error(error);
                this.router.navigate(['admin', 'roles']);
            });
        });
    }

    /**
     * Initialize the form to edit the roles attributes
     *
     * @private
     *
     * @memberOf RolesDetailComponent
     */
    @Access('EditRoles')
    private initEditRoleForm(): void {
        this.editRoleForm = [
            {
                fieldType: 'input',
                name: 'name',
                label: this.translationService.translate('roleName'),
                required: true,
                value: this.role.name
            }
        ];
    }

    /**
     * save the updated role
     *
     * @param {RoleDto} form
     *
     * @memberOf RolesDetailComponent
     */
    @Access('EditRoles')
    public saveRoleAttribute(form: RoleDto): void {
        /** TODO */ const role = _.cloneDeep(this.role); role.name = form.name;
        this.roleService.updateRoleById(this.role.id, role).subscribe(result => {
            this.role = result;
            this.overlay.toggle(false);
        });
    }

    /**
     * remove the given permission from the current role
     *
     * @param {PermissionDto} permission
     *
     * @memberOf RolesDetailComponent
     */
    @Access('EditRoles')
    public removePermissionOfRole(permission: PermissionDto): void {
        this.roleService.removePermissionOfRole(this.role.id, permission.id).subscribe(result => {
            this.role = result;
        });
    }

    /**
     * open the modal to add permission to role
     *
     * @memberOf RolesDetailComponent
     */
    @Access('EditRoles')
    public addPermissionToRoleModal(): void {
        this.modalService.createListModal({
            title: this.translationService.translate('addPermissionToRole'),
            list: this.permissions,
            click: this.addPermissionToRole.bind(this),

            selectedValues: this.role.rolePermissions ? this.role.rolePermissions.map(obj => { return obj.id; }) : [],

            emptyText: this.translationService.translate('noPermissionsAvailable')
        });
    }

    /**
     * add the given permission to the role
     *
     * @private
     * @param {Selectable} data
     *
     * @memberOf RolesDetailComponent
     */
    @Access('EditRoles')
    private addPermissionToRole(data: Selectable): void {
        const permission = _.find(this.role.rolePermissions, (obj: PermissionDto) => obj.id === data.value);
        const fn = (result: RoleDto) => {
            this.role = result;
            this.modalService.updateSelectedValues(result.rolePermissions.map(obj => { return obj.id; }));
        };
        if (permission) {
            this.roleService.removePermissionOfRole(this.role.id, permission.id).subscribe(fn.bind(this));
        } else {
            this.roleService.addPermissionToRole(this.role.id, data.value).subscribe(fn.bind(this));
        }
    }

}
