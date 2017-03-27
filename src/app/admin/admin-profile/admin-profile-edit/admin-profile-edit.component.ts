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
import { AuthenticationService } from 'app/core';
import { AlertService } from 'app/modules/alert';
import { TranslationService } from 'app/modules/translation';

/** Models */
import { UserDetailDto } from 'app/swagger';
import { Fields } from 'app/models';

/**
 * AdminProfileEditComponent
 *
 * @export
 * @class AdminProfileEditComponent
 * @implements {OnInit}
 */
@Component({
    selector: 'pk-admin-profile-edit',
    templateUrl: './admin-profile-edit.component.html',
    styleUrls: ['./admin-profile-edit.component.scss']
})
export class AdminProfileEditComponent implements OnInit {
    @HostBinding('class') classes = 'content--default';

    private _form: Array<Object>;
    get form() { return this._form; }
    set form(form) { this._form = form; }
    private user: UserDetailDto;

    /**
     * Creates an instance of AdminProfileEditComponent.
     * @param {Router} router
     * @param {AuthenticationService} auth
     * @param {AlertService} alert
     * @param {TranslationService} translationService
     *
     * @memberOf AdminProfileEditComponent
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
     * @memberOf AdminProfileEditComponent
     */
    ngOnInit() {
        this.getUser();
    }

    /**
     * get the current user
     *
     * @private
     *
     * @memberOf AdminProfileEditComponent
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
        }, error => { console.error(error); });
    }

    /**
     * save the user attributes
     *
     * @param {UserDetailDto} user
     *
     * @memberOf AdminProfileEditComponent
     */
    public save(user: UserDetailDto) {
        user.id = this.user.id;
        this.auth.updateUser(user).subscribe(result => {
            this.router.navigateByUrl('/admin/profile');
            this.alert.setSuccessHint('UpdateUser' + result.id, this.translationService.translate('updatedUser'));
        });
    }

    /**
     * cancel the edit user view
     *
     * @memberOf AdminProfileEditComponent
     */
    public cancel() {
        this.router.navigateByUrl('/admin/profile');
    }

}
