import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';

import {
    RoleService,
    PermissionService
} from './../../core';

import { Role } from './../../swagger';

import { Access } from './../../shared';

@Component({
    selector: 'pk-roles',
    templateUrl: './roles.component.html',
    styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
    @HostBinding('class') classes = 'content--default';

    private roles;
    private _newRole: Array<any>;

    set newRole(value) { this._newRole = value; }
    get newRole() { return this._newRole; }

    constructor(
        private roleService: RoleService,
        private permission: PermissionService,
        private router: Router
    ) { }

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
     * Catch all roles from server
     */
    @Access('ReadRoles')
    private getRoles(): void {
        this.roleService.getRoles().subscribe(roles => {
            this.roles = roles;
        });
    }

    /**
     * Create a new Role
     * @param {Object} form
     */
    @Access('EditRoles')
    createNewRole(role: Role) {
        this.roleService.addRole(role).subscribe(result => {
            this.router.navigate(['admin', 'roles', result.id, 'edit']);
        });
    }

}
