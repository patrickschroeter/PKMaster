import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs/Rx';

import { UserDto } from './../../../swagger';

@Injectable()
export class PermissionMock {

    constructor() {}

    public updateUserPermissions(user?: UserDto): UserDto {
        return user;
    }

    public hasPermission(permission: string): boolean {
        return !!permission;
    }

    public hasAllPermissions(permissions: string[]): boolean {
        return !!permissions;
    }

    public getPermissions(): Observable<any[]> {
        return new Observable((observer: Observer<any[]>) => observer.next([]));
    }

}
