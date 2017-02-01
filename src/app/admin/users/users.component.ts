import { Component, OnInit, HostBinding } from '@angular/core';

/** Services */
import {
    PermissionService,
    UserService
 } from './../../core';

/** Models */
import { AppUser } from './../../swagger';

/** Decorators */
import { Access } from './../../shared';

@Component({
    selector: 'pk-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
    @HostBinding('class') classes = 'content--default';

    public users: AppUser[];

    constructor(
        private userService: UserService,
        private permission: PermissionService
    ) { }

    ngOnInit() {
        this.getUsers();
    }

    /**
     * get a list of users
     */
    @Access('ReadUsers')
    private getUsers(): void {
        this.userService.getUsers().subscribe(result => {
            this.users = result;
        });
    }

}
