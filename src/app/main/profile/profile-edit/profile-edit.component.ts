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

import { AuthenticationService } from 'app/core';
import { AlertService } from 'app/modules/alert';
import { TranslationService } from 'app/modules/translation';

import { UserDetailDto } from 'app/swagger';
import { Fields } from 'app/models';

/**
 * ProfileEditComponent
 *
 * @export
 * @class ProfileEditComponent
 * @implements {OnInit}
 */
@Component({
    selector: 'pk-profile-edit',
    templateUrl: './profile-edit.component.html',
    styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {
    @HostBinding('class') classes = 'content--default';

    private _form: Array<Object>;
    get form() { return this._form; }
    set form(form) { this._form = form; }
    public user: UserDetailDto;

    /**
     * Creates an instance of ProfileEditComponent.
     * @param {Router} router
     * @param {AuthenticationService} auth
     * @param {AlertService} alert
     * @param {TranslationService} translationService
     *
     * @memberOf ProfileEditComponent
     */
    constructor(
        private router: Router,
        private auth: AuthenticationService,
        private alert: AlertService,
        private translationService: TranslationService
    ) { }

    /**
     * implements OnInit
     *
     *
     * @memberOf ProfileEditComponent
     */
    ngOnInit() {
        this.getUser();
    }

    /**
     * get the current user
     *
     * @private
     *
     * @memberOf ProfileEditComponent
     */
    private getUser() {
        this.auth.getUser().subscribe(user => {
            this.user = user;
            this.form = [
                new Fields.Firstname(user.firstname),
                new Fields.Lastname(user.lastname),
                new Fields.Devider(),
                new Fields.Email(user.email, { required: true })
            ];
        });
    }

    /**
     * save the user attributes
     *
     * @param {UserDetailDto} user
     *
     * @memberOf ProfileEditComponent
     */
    public save(user: UserDetailDto) {
        const param: UserDetailDto = new UserDetailDto(this.user);
        param.firstname = user.firstname;
        param.lastname = user.lastname;
        param.email = user.email;
        this.auth.updateUser(param).subscribe(result => {
            this.router.navigateByUrl('/profile');
            this.alert.setSuccessHint('UpdateUser' + result.id, this.translationService.translate('updatedUser'));
        });
    }

    /**
     * cancel the edit user view
     *
     * @memberOf ProfileEditComponent
     */
    public cancel() {
        this.router.navigateByUrl('/profile');
    }

}
