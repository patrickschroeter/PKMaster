import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './../../../core';

@Component({
    selector: 'pk-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    protected _isOpen: boolean;
    get isOpen() { return this._isOpen; }
    set isOpen(isOpen: boolean) { this._isOpen = isOpen; }

    constructor(
        protected authenticationService: AuthenticationService,
        protected router: Router
    ) { }

    ngOnInit() {
        this.isOpen = false;
    }

    toggleNavbar() {
        this.isOpen = !this.isOpen;
    }

    public logout() {
        this.authenticationService.logout();
    }
}


@Component({
    selector: 'pk-navbar-admin',
    templateUrl: './navbar-admin.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarAdminComponent extends NavbarComponent {

    protected _isOpen: boolean;
    get isOpen() { return this._isOpen; }
    set isOpen(isOpen: boolean) { this._isOpen = isOpen; }

    constructor(
        protected authenticationService: AuthenticationService,
        protected router: Router
    ) {
        super(authenticationService, router);
    }

    toggleNavbar() { super.toggleNavbar(); }
    logout() { super.logout(); }
}
