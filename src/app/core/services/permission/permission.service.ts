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
    roles:  this.guardRolesRoute.bind(this),
    permissions: this.guardPermissionsRoute.bind(this),
    users: this.guardUsersRoute.bind(this)
  };

  constructor(private authentication: AuthenticationService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  Observable<boolean>|Promise<boolean>|boolean {
    let name = state.url.slice(1);
    return true; // hack
    // if (!this.authentication.isLoggedIn()) {
    //   this.router.navigate(['/login']);
    //   return false;
    // }

    // if (name === '') { return this.guard['main'](); }
    // return this.guard[name] ? this.guard[name]() : false;
  }

  canActivateChild = this.canActivate;

  canDeactivate(component: any, route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    return this.authentication.isLoggedIn();
  }


  /**
  * Guard Definitions for Routes
  */

  allAccessWhenLoggedIn() {
    return true;
  }

  guardConferencesRoute(): Observable<any> {
    let user = this.authentication.getUser();
    return user.map((e) => {
      return e.isPK;
    });
  }

  guardFormsRoute(): Observable<any> {
    let user = this.authentication.getUser();
    return user.map((e) => {
      return e.isPK;
    });
  }

  guardAdminRoute(): Observable<any> {
    let user = this.authentication.getUser();
    return user.map((e) => {
      return e.isAdmin;
    });
  }

  guardUsersRoute(): Observable<any> {
    let user = this.authentication.getUser();
    return user.map((e) => {
      return e.isAdmin;
    });
  }

  guardRolesRoute(): Observable<any> {
    let user = this.authentication.getUser();
    return user.map((e) => {
      return e.isAdmin;
    });
  }

  guardPermissionsRoute(): Observable<any> {
    let user = this.authentication.getUser();
    return user.map((e) => {
      return e.isAdmin;
    });
  }

}
