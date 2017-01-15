import { Injectable } from '@angular/core';

import { AppUser } from './../../../swagger';

@Injectable()
export class PermissionMock {

    constructor() {}

    public updateUserPermissions(user?: AppUser): AppUser {
        return user;
    }

    public hasPermission(permission: string): boolean {
        return !!permission;
    }

    public hasAllPermissions(permissions: string[]): boolean {
        return !!permissions;
    }

}
