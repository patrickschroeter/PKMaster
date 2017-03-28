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
import * as _ from 'lodash';

import { Observable, Observer } from 'rxjs/Rx';

import {
    ApplicationApiMock,
    PermissionApiMock
} from './';

import { PermissionDto } from 'app/swagger';

@Injectable()
export class PermissionEndpoint {

    constructor() { }

    public getPermissions() {
        return new Observable((observer: Observer<any>) => {
            setTimeout(() => {
                observer.next(this._permissions());
                observer.complete();
            }, 500);
        });
    }

    public updatePermission(id: string, permission: PermissionDto): Observable<any> {
        const perm = this._permissionUpdate(id, permission);
        return new Observable((observer: Observer<any>) => {
            setTimeout(() => {
                observer.next(perm);
                observer.complete();
            }, 500);
        });
    }

    /**
     * Mock Server
     */

    // tslint:disable-next-line:member-ordering
    private _list: PermissionDto[] = PermissionApiMock.PERMISSIONS;

    private _permissions(): PermissionDto[] {
        return JSON.parse(JSON.stringify(this._list));
    }

    private _permissionAdd(permission: PermissionDto): PermissionDto {
        const id = this._list.length === 0 ? 'Q' : this._list[this._list.length - 1].id + 'Q';
        permission.id = id;
        this._list.push(permission);
        return JSON.parse(JSON.stringify(this._list[this._list.length - 1]));
    }

    private _permission(id?: string): PermissionDto {
        let result: PermissionDto;
        const list = this._list;
        for (let i = 0; i < list.length; i++) {
            if (list[i].id === id) {
                result = list[i];
            }
        }
        if (!result) { return null; }
        return JSON.parse(JSON.stringify(result));
    }

    private _permissionUpdate(id: string, permission: PermissionDto) {
        const list = this._list;
        for (let i = 0; i < list.length; i++) {
            if (list[i].id === id) {
                list[i] = permission;
                return JSON.parse(JSON.stringify(list[i]));
            }
        }
        return null;
    }
}
