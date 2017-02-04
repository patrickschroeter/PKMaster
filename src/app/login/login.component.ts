import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
    AuthenticationService,
    AccessMain,
    AccessAdmin
} from './../core';

@Component({
    selector: 'pk-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginForm: Array<Object>;

    constructor(
        private authentication: AuthenticationService,
        private router: Router,
        private mainRoute: AccessMain,
        private adminRoute: AccessAdmin
    ) { }

    ngOnInit() {

        this.automaticLogin();

        this.loginForm = [
            {
                fieldType: 'input',
                name: 'email',
                contentType: 'email',
                required: true,
                placeholder: 'E-Mail',

                validations: [
                    'useExternalEmail',
                    'isEmail'
                ],

                styles: [
                    'small'
                ]
            },
            {
                fieldType: 'input',
                name: 'password',
                contentType: 'password',
                required: true,
                placeholder: 'Password',

                validations: [
                    'minLength',
                    'maxLength'
                ],

                styles: [
                    'small'
                ]
            }
        ];
    }

    /**
     * Redirect the user to the start page if he is logged in
     */
    private automaticLogin() {
        if (this.authentication.isLoggedIn()) {
            this.authentication.logout();
            // this.redirect();
        }
    }

    /**
     * log the user in with the credentials
     * @param {Object} credentials
     */
    public login(credentials) {
        this.authentication.login(credentials.email, credentials.password).subscribe(user => {
            this.redirect();
        }, error => {
            /** TODO: catch */
        });
    }

    /**
     * redirect the user depending on his permissions
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
}
