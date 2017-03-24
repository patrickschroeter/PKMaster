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

import { Component, OnInit, HostBinding, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { AuthenticationService } from 'app/core';

import { FieldDto, UserDetailDto } from 'app/swagger';
import { Fields } from 'app/models';

/**
 * ProfileComponent
 *
 * @export
 * @class ProfileComponent
 * @implements {OnInit}
 */
@Component({
    selector: 'pk-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    @HostBinding('class') classes = 'content--default';

    private _form: FieldDto[];
    get form() { return this._form; }
    set form(form) { this._form = form; }
    public user: UserDetailDto;

    /**
     * Creates an instance of ProfileComponent.
     * @param {AuthenticationService} auth
     *
     * @memberOf ProfileComponent
     */
    constructor(
        private auth: AuthenticationService,
    ) { }

    /**
     * implements OnInit
     *
     * @memberOf ProfileComponent
     */
    ngOnInit() {
        this.getUser();
    }

    /**
     * get the logged in user
     *
     * @private
     *
     * @memberOf ProfileComponent
     */
    private getUser() {
        this.auth.getUser().subscribe((user: UserDetailDto) => {
            this.user = user;
            this.form = [
                new Fields.Firstname(user.firstname),
                new Fields.Lastname(user.lastname),
                new Fields.Devider(),
                new Fields.Email(user.email),
                new Fields.Matrikelnummer(user.ldapId ? user.ldapId.toString() : '')
            ];
        });
    }
}
