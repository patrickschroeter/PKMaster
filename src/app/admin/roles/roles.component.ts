import { Component, OnInit, HostBinding } from '@angular/core';

import {
    RoleService,
    PermissionService
 } from './../../core';

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
        private permission: PermissionService
    ) { }

    ngOnInit() {
        this.newRole = [
            {
                fieldType: 'input',
                name: 'title',
                label: 'Role Name:',
                value: '',
                required: true,
                validations: [
                    'minLength'
                ]
            }
        ];
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
    createNewRole(form) {
        // TODO: create new role
    }

}
