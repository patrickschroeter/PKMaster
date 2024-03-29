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

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/** Services */
import {
    AuthenticationService,
    AccessMain,
    AccessAdmin
} from 'app/core';
import { TranslationService } from 'app/modules/translation';

/** Models */
import { Credentials } from 'app/models';
import { FieldDto } from 'app/swagger';

/**
 * The Login Component
 *
 * @export
 * @class LoginComponent
 * @implements {OnInit}
 */
@Component({
    selector: 'pk-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    /**
     * the form to login
     *
     * @type {Array<Field>}
     * @memberOf LoginComponent
     */
    public loginForm: Array<FieldDto>;

    /**
     * A flag to display an errors
     *
     * @type {Boolean}
     * @memberOf LoginComponent
     */
    public error: boolean;

    /**
     * Creates an instance of LoginComponent.
     * @param {AuthenticationService} authentication
     * @param {Router} router
     * @param {AccessMain} mainRoute
     * @param {AccessAdmin} adminRoute
     * @param {TranslationService} translationService
     *
     * @memberOf LoginComponent
     */
    constructor(
        private authentication: AuthenticationService,
        private router: Router,
        private mainRoute: AccessMain,
        private adminRoute: AccessAdmin,
        private translationService: TranslationService
    ) { }

    /**
     * implements OnInit
     *
     * @memberOf LoginComponent
     */
    ngOnInit() {

        this.automaticLogin();

        this.initLoginForm();
    }

    /**
     * initialize the login form
     *
     * @private
     *
     * @memberOf LoginComponent
     */
    private initLoginForm(): void {
        this.loginForm = [
            {
                fieldType: 'input',
                name: 'email',
                contentType: 'email',
                required: true,
                placeholder: this.translationService.translate('email'),

                validationIds: [
                    'isEmail'
                ],

                styleIds: [
                    'small'
                ]
            },
            {
                fieldType: 'input',
                name: 'password',
                contentType: 'password',
                required: true,
                placeholder: this.translationService.translate('password'),

                styleIds: [
                    'small'
                ]
            }
        ];
    }

    /**
     * Redirect the user to the start page if he is logged in
     *
     * @private
     *
     * @memberOf LoginComponent
     */
    private automaticLogin() {
        const isLoggedIn = this.authentication.isLoggedIn();
        if (!isLoggedIn) {
            this.authentication.logout();
        } else {
            this.redirect();
        }
    }

    /**
     * log the user in with the credentials
     *
     * @param {Credentials} credentials
     *
     * @memberOf LoginComponent
     */
    public login(credentials: Credentials) {
        this.error = false;
        this.authentication.login(credentials.email, credentials.password).subscribe(user => {
            this.redirect();
        }, error => {
            /** TODO: catch */
            console.error(error);
            this.error = true;
        });
    }

    /**
     * redirect the user depending on his permissions
     *
     * @private
     *
     * @memberOf LoginComponent
     */
    private redirect() {
        this.mainRoute.canActivate(null, null).subscribe(accessMain => {
            if (accessMain) {
                this.router.navigate(['', 'applications']);
            } else {
                this.adminRoute.canActivate(null, null).subscribe(accessAdmin => {
                    if (accessAdmin) {
                        this.router.navigate(['', 'admin']);
                    } else {
                        this.authentication.logout();
                    }
                });
            }
        });
    }

    /** TODO remove for production */
    public fake(username: string) {
        this.login({
            email: username,
            password: 'einPasswort'
        });
    }
}
