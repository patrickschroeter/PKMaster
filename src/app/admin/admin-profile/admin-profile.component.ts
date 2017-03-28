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

import { AuthenticationService } from 'app/core';

import { FieldDto, UserDetailDto } from 'app/swagger';
import { Fields } from 'app/models';

/**
 * AdminProfileComponent
 *
 * @export
 * @class AdminProfileComponent
 * @implements {OnInit}
 */
@Component({
    selector: 'pk-admin-profile',
    templateUrl: './admin-profile.component.html',
    styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent implements OnInit {
    @HostBinding('class') classes = 'content--default';

    public user: UserDetailDto;
    public form: FieldDto[];

    /**
     * Creates an instance of AdminProfileComponent.
     * @param {AuthenticationService} auth
     *
     * @memberOf AdminProfileComponent
     */
    constructor(
        private auth: AuthenticationService
    ) { }

    /**
     * implements OnInit
     *
     * @memberOf AdminProfileComponent
     */
    ngOnInit() {
        this.getUser();
    }

    /**
     * get current user
     *
     * @private
     *
     * @memberOf AdminProfileComponent
     */
    private getUser(): void {
        this.auth.getUser().subscribe(user => {
            this.user = user;
            this.form = [
                new Fields.Firstname(user.firstname),
                new Fields.Lastname(user.lastname),
                new Fields.Devider(),
                new Fields.Email(user.email)
            ];
        }, error => { console.error(error); });
    }

}
