import { Injectable } from '@angular/core';
import { Router, CanActivate, CanDeactivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { AuthenticationService } from './../authentication/authentication.service';

@Injectable()
export class AccessService implements CanActivate, CanDeactivate<any>, CanActivateChild {

    private guard: Object = {
        'main': this.allAccessWhenLoggedIn.bind(this),
        'profile': this.allAccessWhenLoggedIn.bind(this),
        'applications': this.allAccessWhenLoggedIn.bind(this),
        'conferences': this.guardConferencesRoute.bind(this),
        'forms': this.guardFormsRoute.bind(this),

        'admin': this.guardAdminRoute.bind(this),
        'admin/roles': this.guardRolesRoute.bind(this),
        'admin/permissions': this.guardPermissionsRoute.bind(this),
        'admin/users': this.guardUsersRoute.bind(this),
        'admin/profile': this.guardUsersRoute.bind(this)
    };

    constructor(private authentication: AuthenticationService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        Observable<boolean> | Promise<boolean> | boolean {
        let name = state.url.slice(1);
        if (!this.authentication.isLoggedIn()) {
            this.router.navigate(['/login']);
            return false;
        }
        if (name === '') { return this.guard['main'](); }
        /** TODO production only */
        if (!this.guard[name]) { console.error(`Missing Guard for: ${name}`); }
        return this.guard[name] ? this.guard[name]() : false;
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        Observable<boolean> | Promise<boolean> | boolean {
        return this.canActivate(route, state);
    }

    canDeactivate(component: any, route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        Observable<boolean> | Promise<boolean> | boolean {
        return this.authentication.isLoggedIn();
    }


    /**
    * Guard Definitions for Routes
    */

    private allAccessWhenLoggedIn(): Observable<any> {
        let user = this.authentication.getUser();
        /** TODO: catch error */
        return user.map((e) => {
            return !!e;
        });
    }

    private guardConferencesRoute(): Observable<any> {
        let user = this.authentication.getUser();
        return user.map((e) => {
            return e.permissions.indexOf('CreateForms') !== -1;
        });
    }

    private guardFormsRoute(): Observable<any> {
        let user = this.authentication.getUser();
        return user.map((e) => {
            return e.permissions.indexOf('ReadForms') !== -1;
        });
    }

    private guardAdminRoute(): Observable<any> {
        let user = this.authentication.getUser();
        return user.map((e) => {
            console.log(e.permissions.indexOf('ReadPermissions'));
            return e.permissions.indexOf('ReadPermissions') !== -1;
        });
    }

    private guardUsersRoute(): Observable<any> {
        let user = this.authentication.getUser();
        return user.map((e) => {
            return e.permissions.indexOf('ReadPermissions') !== -1;
        });
    }

    private guardRolesRoute(): Observable<any> {
        let user = this.authentication.getUser();
        return user.map((e) => {
            return e.permissions.indexOf('ReadPermissions') !== -1;
        });
    }

    private guardPermissionsRoute(): Observable<any> {
        let user = this.authentication.getUser();
        return user.map((e) => {
            return e.permissions.indexOf('ReadPermissions') !== -1;
        });
    }

}