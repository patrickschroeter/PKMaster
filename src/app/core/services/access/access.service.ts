import { Injectable } from '@angular/core';
import {
    Router,
    CanActivate,
    CanDeactivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanLoad,
    Route
} from '@angular/router';
import { Observable, Observer } from 'rxjs/Rx';

import { AuthenticationService } from './../authentication/authentication.service';
import { PermissionService } from './../permission/permission.service';

export class AccessService implements CanActivate, CanDeactivate<any>, CanLoad {

    constructor(
        protected authentication: AuthenticationService,
        protected permission: PermissionService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        Observable<boolean> | Promise<boolean> | boolean {
        return this.hasAccess(['ReadApplications', 'ReadForms', 'ReadConferences'], true);
    }

    canDeactivate(component: any, route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        Observable<boolean> | Promise<boolean> | boolean {
        return this.authentication.isLoggedIn();
    }

    canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
        const user = this.authentication.getUser();
        /** TODO: catch error */
        return user.map((e) => {
            /** Requires user in this.permission */
            return this.permission.hasPermission(['ReadApplications', 'ReadForms', 'ReadConferences'], true);
        });
    }

    /**
     * waiting for the user object to check the permission
     * @param {(String|Array<String>)} permission - the permission(s) to check the user for
     * @param {Boolean} or - flag to indicate if the user needs one or all of the permissions
     */
    protected hasAccess(permission: string | string[], or = false): Observable<boolean> {
        const user = this.authentication.getUser();
        /** TODO: catch error */
        return user.map((e) => {
            /** Requires user in this.permission */
            return this.permission.hasPermission(permission, or);
        });
    }
}

/**
 * Main Area
 */
@Injectable()
export class AccessMain extends AccessService {
    constructor(auth: AuthenticationService, perm: PermissionService) { super(auth, perm); }
}

/**
 * Applications
 */
@Injectable()
export class AccessApplications extends AccessService {
    constructor(auth: AuthenticationService, perm: PermissionService) { super(auth, perm); }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.hasAccess(['ReadApplications', 'CreateApplications'], true);
    }
}

@Injectable()
export class AccessApplicationsEdit extends AccessService {
    constructor(auth: AuthenticationService, perm: PermissionService) { super(auth, perm); }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.hasAccess(['EditApplications', 'CreateApplications'], true);
    }
}

/**
 * Conferences
 */
@Injectable()
export class AccessConferencesDetail extends AccessService {
    constructor(auth: AuthenticationService, perm: PermissionService) { super(auth, perm); }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.hasAccess('ReadConferences');
    }
}

@Injectable()
export class AccessConferencesEdit extends AccessService {
    constructor(auth: AuthenticationService, perm: PermissionService) { super(auth, perm); }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.hasAccess('EditConferences');
    }
}

/**
 * Forms
 */
@Injectable()
export class AccessForms extends AccessService {
    constructor(auth: AuthenticationService, perm: PermissionService) { super(auth, perm); }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.hasAccess('ReadForms');
    }
}

@Injectable()
export class AccessFormsEdit extends AccessService {
    constructor(auth: AuthenticationService, perm: PermissionService) { super(auth, perm); }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.hasAccess('EditForms');
    }
}


/**
 * Admin Area
 */
@Injectable()
export class AccessAdmin extends AccessService {
    constructor(auth: AuthenticationService, perm: PermissionService) { super(auth, perm); }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.hasAccess(['ReadRoles', 'ReadPermissions', 'ReadUsers'], true);
    }

    canLoad(route: Route) {
        return this.hasAccess(['ReadRoles', 'ReadPermissions', 'ReadUsers'], true);
    }
}

/**
 * Roles
 */
@Injectable()
export class AccessRoles extends AccessService {
    constructor(auth: AuthenticationService, perm: PermissionService, private router: Router) { super(auth, perm); }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.hasAccess('ReadRoles').map(access => {
            if (!access) {
                this.router.navigate(['', 'admin', 'profile']);
                return false;
            }
            return true;
        });
    }
}

@Injectable()
export class AccessRolesEdit extends AccessService {
    constructor(auth: AuthenticationService, perm: PermissionService) { super(auth, perm); }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.hasAccess('EditRoles');
    }
}

/**
 * Permissions
 */
@Injectable()
export class AccessPermissions extends AccessService {
    constructor(auth: AuthenticationService, perm: PermissionService) { super(auth, perm); }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.hasAccess('ReadPermissions');
    }
}

/**
 * Users
 */
@Injectable()
export class AccessUsers extends AccessService {
    constructor(auth: AuthenticationService, perm: PermissionService) { super(auth, perm); }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.hasAccess('ReadUsers');
    }
}

@Injectable()
export class AccessUsersEdit extends AccessService {
    constructor(auth: AuthenticationService, perm: PermissionService) { super(auth, perm); }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.hasAccess('EditUsers');
    }
}
