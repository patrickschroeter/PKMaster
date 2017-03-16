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

    static map = {
        main: [
            'CreateApplications',
            'ReadApplications',
            'EditApplications',
            'CommentApplications',
            'DeactivateApplications',
            'AcceptApplications',
            'SubmitApplications',
            'ValidateApplications',
            'ReadForms',
            'EditForms',
            'ReadConferences',
            'EditConferences'
        ],
        admin: [
            'ReadRoles',
            'EditRoles',
            'ReadPermissions',
            'EditPermissions',
            'ReadUsers',
            'EditUsers'
        ]
    };

    constructor(
        protected authentication: AuthenticationService,
        protected permission: PermissionService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        Observable<boolean> | Promise<boolean> | boolean {
        console.error('you should not be here');
        return false;
    }

    canDeactivate(component: any, route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        Observable<boolean> | Promise<boolean> | boolean {
        console.error('you should not be here');
        return false;
    }

    canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
        console.error('you should not be here');
        return false;
    }

    /**
     * waiting for the user object to check the permission
     * @param {(String|Array<String>)} permission - the permission(s) to check the user for
     * @param {Boolean} or - flag to indicate if the user needs one (true) or all(false) of the permissions
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
    constructor(auth: AuthenticationService, perm: PermissionService, private router: Router) { super(auth, perm); }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.hasAccess(AccessService.map.main, true).map(access => {
            if (!access) {
                this.router.navigate(['', 'login']);
                return false;
            }
            return access;
        });
    }

    canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
        return this.hasAccess(AccessService.map.main, true).map(access => {
            if (!access) {
                this.router.navigate(['', 'login']);
                return false;
            }
            return access;
        });
    }
}

/**
 * Applications
 */
@Injectable()
export class AccessApplications extends AccessService {
    constructor(auth: AuthenticationService, perm: PermissionService, private router: Router) { super(auth, perm); }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.hasAccess([
            'ReadApplications',
            'CreateApplications'
        ], true).map(redirectProfile.bind(this));
    }
}

@Injectable()
export class AccessApplicationsDetail extends AccessService {
    constructor(auth: AuthenticationService, perm: PermissionService, private router: Router) { super(auth, perm); }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.hasAccess([
            'ReadApplications',
            'CreateApplications'
        ], true).map(redirectApplications.bind(this));
    }
}

@Injectable()
export class AccessApplicationsEdit extends AccessService {
    constructor(auth: AuthenticationService, perm: PermissionService, private router: Router) { super(auth, perm); }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.hasAccess([
            'EditApplications',
            'CreateApplications'
        ], true).map(redirectApplications.bind(this));
    }
}

/**
 * Conferences
 */
@Injectable()
export class AccessConferences extends AccessService {
    constructor(auth: AuthenticationService, perm: PermissionService, private router: Router) { super(auth, perm); }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.hasAccess(AccessService.map.main, true).map(redirectApplications.bind(this));
    }
}


@Injectable()
export class AccessConferencesDetail extends AccessService {
    constructor(auth: AuthenticationService, perm: PermissionService, private router: Router) { super(auth, perm); }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.hasAccess('ReadConferences').map(redirectApplications.bind(this));
    }
}

@Injectable()
export class AccessConferencesEdit extends AccessService {
    constructor(auth: AuthenticationService, perm: PermissionService, private router: Router) { super(auth, perm); }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.hasAccess('EditConferences').map(redirectApplications.bind(this));
    }
}

/**
 * Forms
 */
@Injectable()
export class AccessForms extends AccessService {
    constructor(auth: AuthenticationService, perm: PermissionService, private router: Router) { super(auth, perm); }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.hasAccess('ReadForms').map(redirectApplications.bind(this));
    }
}

@Injectable()
export class AccessFormsEdit extends AccessService {
    constructor(auth: AuthenticationService, perm: PermissionService, private router: Router) { super(auth, perm); }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.hasAccess('EditForms').map(redirectApplications.bind(this));
    }
}


/**
 * Admin Area
 */
@Injectable()
export class AccessAdmin extends AccessService {
    constructor(auth: AuthenticationService, perm: PermissionService) { super(auth, perm); }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.hasAccess(AccessService.map.admin, true);
    }

    canLoad(route: Route) {
        return this.hasAccess(AccessService.map.admin, true);
    }
}

/**
 * Roles
 */
@Injectable()
export class AccessRoles extends AccessService {
    constructor(auth: AuthenticationService, perm: PermissionService, private router: Router) { super(auth, perm); }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.hasAccess([
            'ReadRoles',
            'EditRoles'
        ], true).map(redirectAdminProfile.bind(this));
    }
}

@Injectable()
export class AccessRolesEdit extends AccessService {
    constructor(auth: AuthenticationService, perm: PermissionService, private router: Router) { super(auth, perm); }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.hasAccess([
            'EditRoles',
        ], true).map(redirectAdminProfile.bind(this));
    }
}

/**
 * Permissions
 */
@Injectable()
export class AccessPermissions extends AccessService {
    constructor(auth: AuthenticationService, perm: PermissionService, private router: Router) { super(auth, perm); }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.hasAccess('ReadPermissions').map(redirectAdminProfile.bind(this));
    }
}

/**
 * Users
 */
@Injectable()
export class AccessUsers extends AccessService {
    constructor(auth: AuthenticationService, perm: PermissionService, private router: Router) { super(auth, perm); }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.hasAccess([
            'ReadUsers',
            'EditUsers'
        ], true).map(redirectAdminProfile.bind(this));
    }
}

@Injectable()
export class AccessUsersDetail extends AccessService {
    constructor(auth: AuthenticationService, perm: PermissionService, private router: Router) { super(auth, perm); }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.hasAccess('ReadUsers').map(redirectAdminProfile.bind(this));
    }
}

@Injectable()
export class AccessUsersEdit extends AccessService {
    constructor(auth: AuthenticationService, perm: PermissionService, private router: Router) { super(auth, perm); }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.hasAccess('EditUsers').map(redirectAdminProfile.bind(this));
    }
}


/** Redirect */
export function redirectAdminProfile(access: boolean): boolean {
    if (!access) {
        this.router.navigate(['', 'admin', 'profile']);
        return false;
    }
    return true;
}

export function redirectProfile(access: boolean): boolean {
    if (!access) {
        this.router.navigate(['', 'profile']);
        return false;
    }
    return true;
}

export function redirectApplications(access: boolean): boolean {
    if (!access) {
        this.router.navigate(['', 'applications']);
        return false;
    }
    return true;
}
