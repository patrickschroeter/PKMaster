import { Component, OnInit, HostBinding, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import * as _ from 'lodash';

/** Services */
import { RoleService, PermissionService } from './../../../core';
import { OverlayComponent, ModalService } from './../../../modules/overlay';
import { TranslationService } from './../../../modules/translation';

/** Models */
import { Role, Field, Permission } from './../../../swagger';
import { Selectable } from './../../../models';

/** Decorator */
import { Access } from './../../../shared';

@Component({
    selector: 'pk-roles-detail',
    templateUrl: './roles-detail.component.html',
    styleUrls: ['./roles-detail.component.scss']
})
export class RolesDetailComponent implements OnInit {
    @HostBinding('class') classes = 'content--default';

    @ViewChild('overlay') overlay: OverlayComponent;

    public role: Role;
    public editRoleForm: Field[];

    private permissions: Selectable[];

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private roleService: RoleService,
        private modalService: ModalService,
        private translationService: TranslationService,
        private permission: PermissionService
    ) { }

    ngOnInit() {
        this.getRoleByRouteParam();

        this.permission.getPermissions().subscribe(result => {
            this.permissions = result.map(obj => { return new Selectable(obj.id, obj.name); });
        });
    }

    /**
     * Read Route Param and GET Role with param ID
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
     */
    @Access('EditRoles')
    private initEditRoleForm(): void {
        this.editRoleForm = [
            {
                fieldType: 'input',
                name: 'name',
                label: 'Role Name:',
                required: true,
                value: this.role.name
            }
        ]
    }

    /**
     * save the updated role
     * @param {Object} form
     */
    @Access('EditRoles')
    public saveRoleAttribute(form): void {
        /** TODO */ const role = _.cloneDeep(this.role); role.name = form.name;
        this.roleService.updateRoleById(this.role.id, role).subscribe(result => {
            this.role = result;
            this.overlay.toggle(false);
        });
    }

    /**
     * remove the given permission from the current role
     * @param {Permission} permission
     */
    @Access('EditRoles')
    public removePermissionOfRole(permission: Permission): void {
        this.roleService.removePermissionOfRole(this.role.id, permission.id).subscribe(result => {
            this.role = result;
        });
    }

    /**
     * open the modal to add permission to role
     */
    @Access('EditRoles')
    public addPermissionToRoleModal(): void {
        this.modalService.createListModal({
            title: this.translationService.translate('addPermissionToRole'),
            list: this.permissions,
            click: this.addPermissionToRole.bind(this),

            selectedValues: this.role.rolePermissions.map(obj => { return obj.id; }),

            emptyText: this.translationService.translate('noPermissionsAvailable')
        });
    }

    /**
     * add the given permission to the role
     * @param {Selectable} data
     */
    @Access('EditRoles')
    private addPermissionToRole(data: Selectable): void {
        this.roleService.addPermissionToRole(this.role.id, data.value).subscribe(result => {
            this.role = result;
            this.modalService.destroyModal();
        });
    }

}
