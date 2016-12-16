import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './../../../core';

@Component({
    selector: 'pk-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    private isOpen: boolean;

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

    constructor(
        protected authenticationService: AuthenticationService,
        protected router: Router
    ) {
        super(authenticationService, router);
    }

}
