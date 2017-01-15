import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import { AppUser } from './../../../swagger';

@Injectable()
export class PermissionService {

    private _permissions: string[];

    set permissions(permissions: string[]) { this._permissions = permissions; }
    get permissions(): string[] { return this._permissions; }

    constructor() { }

    /**
     * @description update the permission object in the class with the input user
     * @version v1.0.0
     */
    public updateUserPermissions(user?: AppUser): AppUser {
        this.permissions = (user && user.permissions) ? user.permissions : [];
        return user;
    }

    /**
     * @description check if the user has the given permission (string), permissions (array, and), permissions (array, or)
     * @version v1.0.0
     */
    public hasPermission(permission: string | string[], or = false): boolean {
        if (Array.isArray(permission)) {
            if (or) {
                return this.hasOneOfPermissions((permission as string[]));
            } else {
                return this.hasAllPermissions((permission as string[]));
            }
        } else if (typeof permission === 'string') {
            return (!permission || (!!this.permissions && !!permission && this.permissions.indexOf(permission) !== -1));
        }
        return true;
    }

    /**
     * @description check if the user has this one permission
     */
    private hasOnePermission(permission: string): boolean {
        return (!permission || (!!this.permissions && !!permission && this.permissions.indexOf(permission) !== -1));
    }

    /**
     * @description check if the user has the given permissions (array, and)
     * @version v1.0.0
     */
    private hasAllPermissions(permissions: string[]): boolean {
        return (!permissions || !permissions.length || (!!this.permissions && !!permissions && !_.difference(permissions, this.permissions).length));
    }

    /**
     * @description check if the user has one of the given permissios (array, or)
     */
    private hasOneOfPermissions(permissions: string[]): boolean {
        if (!permissions.length) { return true; }
        for (let i = 0, length = permissions.length; i < length; i++) {
            if (this.hasOnePermission(permissions[i])) { return true; }
        }
        return false;
    }

}
