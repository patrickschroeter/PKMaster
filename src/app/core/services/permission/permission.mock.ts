/**
 *
 * @author Patrick Schröter <patrick.schroeter@hotmail.de>
 *
 * @license CreativeCommons BY-NC-SA 4.0 2017
 *
 * This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/.
 *
 */

import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs/Rx';

import { UserDetailDto } from 'app/swagger';

@Injectable()
export class PermissionMock {

    constructor() {}

    public updateUserPermissions(user?: UserDetailDto): UserDetailDto {
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
