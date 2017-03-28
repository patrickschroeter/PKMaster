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

import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';

/** Services */
import {
    RoleService,
    PermissionService
} from 'app/core';
import { AlertService } from 'app/modules/alert';
import { TranslationService } from 'app/modules/translation';

/** Models */
import { RoleDto, FieldDto } from 'app/swagger';

/** Decorators */
import { Access, OnAccess } from 'app/shared/decorators/access.decorator';

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
export class RolesComponent implements OnInit, OnAccess {

    @HostBinding('class') classes = 'content--default';

    public roles: RoleDto[];

    private _newRole: Array<FieldDto>;
    set newRole(value) { this._newRole = value; }
    get newRole() { return this._newRole; }

    /**
     * Creates an instance of RolesComponent.
     * @param {RoleService} roleService
     * @param {PermissionService} permission
     * @param {AlertService} alert
     * @param {Router} router
     * @param {TranslationService} translationService
     *
     * @memberOf RolesComponent
     */
    constructor(
        private roleService: RoleService,
        public permission: PermissionService,
        public alert: AlertService,
        private router: Router,
        private translationService: TranslationService
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
                label: this.translationService.translate('roleName'),
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
