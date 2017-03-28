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

import { AuthenticationService } from 'app/core';

/**
 * NavbarComponent
 *
 * @export
 * @class NavbarComponent
 * @implements {OnInit}
 */
@Component({
    selector: 'pk-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    protected _isOpen: boolean;
    get isOpen() { return this._isOpen; }
    set isOpen(isOpen: boolean) { this._isOpen = isOpen; }

    /**
     * Creates an instance of NavbarComponent.
     * @param {AuthenticationService} authenticationService
     * @param {Router} router
     *
     * @memberOf NavbarComponent
     */
    constructor(
        protected authenticationService: AuthenticationService,
        protected router: Router
    ) { }

    /**
     * implements OnInit
     *
     * @memberOf NavbarComponent
     */
    ngOnInit() {
        this.isOpen = false;
    }

    /**
     * toggle navbar
     *
     * @memberOf NavbarComponent
     */
    public toggleNavbar() {
        this.isOpen = !this.isOpen;
    }

    /**
     * logout
     *
     * @memberOf NavbarComponent
     */
    public logout() {
        this.authenticationService.logout();
    }
}

/**
 * NavbarAdminComponent
 *
 * @export
 * @class NavbarAdminComponent
 * @extends {NavbarComponent}
 */
@Component({
    selector: 'pk-navbar-admin',
    templateUrl: './navbar-admin.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarAdminComponent extends NavbarComponent {

    protected _isOpen: boolean;
    get isOpen() { return this._isOpen; }
    set isOpen(isOpen: boolean) { this._isOpen = isOpen; }

    /**
     * Creates an instance of NavbarAdminComponent.
     * @param {AuthenticationService} authenticationService
     * @param {Router} router
     *
     * @memberOf NavbarAdminComponent
     */
    constructor(
        protected authenticationService: AuthenticationService,
        protected router: Router
    ) {
        super(authenticationService, router);
    }

    /**
     * toggle navbar
     *
     * @memberOf NavbarAdminComponent
     */
    public toggleNavbar() { super.toggleNavbar(); }

    /**
     * logout
     *
     * @memberOf NavbarAdminComponent
     */
    public logout() { super.logout(); }
}
