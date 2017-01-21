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

@Injectable()
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
        let user = this.authentication.getUser();
        /** TODO: catch error */
        return user.map((e) => {
            /** Requires user in this.permission */
            return this.permission.hasPermission(['ReadApplications', 'ReadForms', 'ReadConferences'], true);
        });
    }

    /**
     * @description waiting for the user object to check the permission
     */
    protected hasAccess(permission: string | string[], or = false): Observable<boolean> {
        let user = this.authentication.getUser();
        /** TODO: catch error */
        return user.map((e) => {
            /** Requires user in this.permission */
            return this.permission.hasPermission(permission, or);
        });
    }
}

@Injectable()
export class AccessReadApplications extends AccessService {
    constructor(auth: AuthenticationService, perm: PermissionService) { super(auth, perm); }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) { return this.hasAccess('ReadApplications'); }
}

@Injectable()
export class AccessEditApplications extends AccessService {
    constructor(auth: AuthenticationService, perm: PermissionService) { super(auth, perm); }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) { return this.hasAccess('EditApplications'); }
}

@Injectable()
export class AccessReadConferences extends AccessService {
    constructor(auth: AuthenticationService, perm: PermissionService) { super(auth, perm); }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) { return this.hasAccess('ReadConferences'); }
}

@Injectable()
export class AccessEditConferences extends AccessService {
    constructor(auth: AuthenticationService, perm: PermissionService) { super(auth, perm); }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) { return this.hasAccess('EditConferences'); }
}

@Injectable()
export class AccessReadForms extends AccessService {
    constructor(auth: AuthenticationService, perm: PermissionService) { super(auth, perm); }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) { return this.hasAccess('ReadForms'); }
}

@Injectable()
export class AccessEditForms extends AccessService {
    constructor(auth: AuthenticationService, perm: PermissionService) { super(auth, perm); }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) { return this.hasAccess('EditForms'); }
}

@Injectable()
export class AccessAdmin extends AccessService {
    constructor(auth: AuthenticationService, perm: PermissionService) { super(auth, perm); }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) { return this.hasAccess(['ReadRoles', 'ReadPermissions', 'ReadUsers'], true); }
    canLoad(route: Route) { return this.hasAccess(['ReadRoles', 'ReadPermissions', 'ReadUsers'], true); }
}

@Injectable()
export class AccessReadRoles extends AccessService {
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
export class AccessEditRoles extends AccessService {
    constructor(auth: AuthenticationService, perm: PermissionService) { super(auth, perm); }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) { return this.hasAccess('EditRoles'); }
}

@Injectable()
export class AccessReadPermissions extends AccessService {
    constructor(auth: AuthenticationService, perm: PermissionService) { super(auth, perm); }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) { return this.hasAccess('ReadPermissions'); }
}

@Injectable()
export class AccessEditPermissions extends AccessService {
    constructor(auth: AuthenticationService, perm: PermissionService) { super(auth, perm); }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) { return this.hasAccess('EditPermissions'); }
}

@Injectable()
export class AccessReadUsers extends AccessService {
    constructor(auth: AuthenticationService, perm: PermissionService) { super(auth, perm); }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) { return this.hasAccess('ReadUsers'); }
}

@Injectable()
export class AccessEditUsers extends AccessService {
    constructor(auth: AuthenticationService, perm: PermissionService) { super(auth, perm); }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) { return this.hasAccess('EditUsers'); }
}
