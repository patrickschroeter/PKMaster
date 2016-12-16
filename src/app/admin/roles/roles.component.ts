import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
    selector: 'pk-roles',
    templateUrl: './roles.component.html',
    styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
    @HostBinding('class') classes = 'content--default';

    private roles;
    private _newRole: Array<any>;
    private _isOpenNewRole: boolean = false;

    set newRole(value) { this._newRole = value; }
    get newRole() { return this._newRole; }

    set isOpenNewRole(value) { this._isOpenNewRole = value; }
    get isOpenNewRole() { return this._isOpenNewRole; }

    constructor() { }

    ngOnInit() {
        this.newRole =  [
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
        this.roles = [
            {
                title: 'Student',
                id: 1,
                created: 674467500,
                restricted: true
            },
            {
                title: 'Dozent',
                id: 2,
                created: 1315382700,
                restricted: false
            },
            {
                title: 'PK Member',
                id: 3,
                created: 1455613500,
                restricted: true
            },
            {
                title: 'PK Chef',
                id: 4,
                created: 1477555500,
                restricted: false
            },
            {
                title: 'Admin',
                id: 4,
                created: 1477555500,
                restricted: false
            }
        ];
    }

    sortBy(sortValue: string) {
        // TODO
    }

    createNewRole(form) {
        // TODO: create new role
    }

    toggleCreateNew() {
        this.isOpenNewRole = !this.isOpenNewRole;
    }

}
