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
     * @description check if the user has the given permission (string)
     * @version v1.0.0
     */
    public hasPermission(permission: string): boolean {
        return (!!this.permissions && !!permission && this.permissions.indexOf(permission) !== -1);
    }

    /**
     * @description check if the user has the given permissions (string[])
     * @version v1.0.0
     */
    public hasAllPermissions(permissions: string[]): boolean {
        return (!!this.permissions && !!permissions && !_.difference(permissions, this.permissions).length);
    }

}
