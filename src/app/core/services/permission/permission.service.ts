import { Injectable } from '@angular/core';
import { Router, CanActivate, CanDeactivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { AuthenticationService } from './../authentication/authentication.service';

@Injectable()
export class PermissionService implements CanActivate, CanDeactivate<any>, CanActivateChild {

    private guard: Object = {
        main: this.allAccessWhenLoggedIn,
        profile: this.allAccessWhenLoggedIn,
        applications: this.allAccessWhenLoggedIn,
        conferences: this.guardConferencesRoute.bind(this),
        forms: this.guardFormsRoute.bind(this),

        admin: this.guardAdminRoute.bind(this),
        roles: this.guardRolesRoute.bind(this),
        permissions: this.guardPermissionsRoute.bind(this),
        users: this.guardUsersRoute.bind(this)
    };

    constructor(private authentication: AuthenticationService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        let name = state.url.slice(1);
        if (!this.authentication.isLoggedIn()) {
            this.router.navigate(['/login']);
            return false;
        }

        if (name === '') { return this.guard['main'](); }
        return this.guard[name] ? this.guard[name]() : false;
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.canActivate(route, state);
    }

    canDeactivate(component: any, route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.authentication.isLoggedIn();
    }


    /**
    * Guard Definitions for Routes
    */

    private allAccessWhenLoggedIn() {
        return true;
    }

    private guardConferencesRoute(): Observable<any> {
        let user = this.authentication.getUser();
        return user.map((e) => {
            return e.isPK;
        });
    }

    private guardFormsRoute(): Observable<any> {
        let user = this.authentication.getUser();
        return user.map((e) => {
            console.log(e);
            return e.isPK;
        });
    }

    private guardAdminRoute(): Observable<any> {
        let user = this.authentication.getUser();
        return user.map((e) => {
            return e.isAdmin;
        });
    }

    private guardUsersRoute(): Observable<any> {
        let user = this.authentication.getUser();
        return user.map((e) => {
            return e.isAdmin;
        });
    }

    private guardRolesRoute(): Observable<any> {
        let user = this.authentication.getUser();
        return user.map((e) => {
            return e.isAdmin;
        });
    }

    private guardPermissionsRoute(): Observable<any> {
        let user = this.authentication.getUser();
        return user.map((e) => {
            return e.isAdmin;
        });
    }

}
