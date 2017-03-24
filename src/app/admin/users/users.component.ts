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

/**
 * UsersComponent
 *
 * @export
 * @class UsersComponent
 * @implements {OnInit}
 * @implements {OnAccess}
 */
@Component({
    selector: 'pk-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnAccess {
    @HostBinding('class') classes = 'content--default';

    public users: UserDetailDto[];

    /**
     * Creates an instance of UsersComponent.
     * @param {UserService} userService
     * @param {PermissionService} permission
     * @param {AlertService} alert
     *
     * @memberOf UsersComponent
     */
    constructor(
        private userService: UserService,
        public permission: PermissionService,
        public alert: AlertService
    ) { }

    /**
     * implements OnInit
     *
     * @memberOf UsersComponent
     */
    ngOnInit() {
        this.getUsers();
    }

    /**
     * get a list of users
     *
     * @private
     *
     * @memberOf UsersComponent
     */
    @Access('ReadUsers')
    private getUsers(): void {
        this.userService.getUsers().subscribe(result => {
            this.users = result;
        });
    }

}
