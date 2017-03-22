import { Component, OnInit, HostBinding } from '@angular/core';

/** Services */
import {
    PermissionService,
    UserService
 } from 'app/core';
 import { AlertService } from 'app/modules/alert';

/** Models */
import { UserDetailDto } from 'app/swagger';

/** Decorators */
import { Access, OnAccess } from 'app/shared/decorators/access.decorator';

@Component({
    selector: 'pk-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnAccess {
    @HostBinding('class') classes = 'content--default';

    public users: UserDetailDto[];

    constructor(
        private userService: UserService,
        public permission: PermissionService,
        public alert: AlertService
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
