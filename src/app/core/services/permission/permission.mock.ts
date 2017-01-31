import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

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

    public getPermissions(): Observable<any[]> {
        return new Observable(observer => observer.next([]));
    }

}
