import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';

/** Services */
import {
    RoleService,
    PermissionService
} from './../../core';

/** Models */
import { RoleDto, FieldDto } from './../../swagger';

/** Decorators */
import { Access } from './../../shared/decorators/access.decorator';

/**
 * Displays a list of all roles
 *
 * @export
 * @class RolesComponent
 * @implements {OnInit}
 */
@Component({
    selector: 'pk-roles',
    templateUrl: './roles.component.html',
    styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

    /**
     * Default Layout Class
     *
     * @memberOf RolesComponent
     */
    @HostBinding('class') classes = 'content--default';

    /**
     * An Array of all Roles
     *
     * @type {RoleDto[]}
     * @memberOf RolesComponent
     */
    public roles: RoleDto[];

    /**
     * the Form for creata a new role
     *
     * @private
     * @type {Array<any>}
     * @memberOf RolesComponent
     */
    private _newRole: Array<FieldDto>;

    /**
     * set newRole
     *
     * @memberOf RolesComponent
     */
    set newRole(value) { this._newRole = value; }

    /**
     * get newRole
     *
     * @memberOf RolesComponent
     */
    get newRole() { return this._newRole; }

    /**
     * Creates an instance of RolesComponent.
     *
     * @param {RoleService} roleService
     * @param {PermissionService} permission
     * @param {Router} router
     *
     * @memberOf RolesComponent
     */
    constructor(
        private roleService: RoleService,
        private permission: PermissionService,
        private router: Router
    ) { }

    /**
     * implements OnInit
     *
     * @memberOf RolesComponent
     */
    ngOnInit() {
        this.newRole = [
            {
                fieldType: 'input',
                name: 'name',
                label: 'Role Name:',
                required: true
            }
        ];

        this.getRoles();
    }

    /**
     * Fetch all roles from server
     *
     * @private
     *
     * @memberOf RolesComponent
     */
    @Access('ReadRoles')
    private getRoles(): void {
        this.roleService.getRoles().subscribe(roles => {
            this.roles = roles;
        });
    }

    /**
     * Create a new Role
     *
     * @param {RoleDto} role
     *
     * @memberOf RolesComponent
     */
    @Access('EditRoles')
    public createNewRole(role: RoleDto) {
        this.roleService.addRole(role).subscribe(result => {
            this.router.navigate(['admin', 'roles', result.id]);
        });
    }

}
