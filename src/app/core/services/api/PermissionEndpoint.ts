import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import { Observable, Observer } from 'rxjs/Rx';

import {
    ApplicationApiMock,
    PermissionApiMock
} from './';

import { Permission } from './../../../swagger';

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

    public updatePermission(id: string, permission: Permission): Observable<any> {
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
    private _list: Permission[] = PermissionApiMock.PERMISSIONS;

    private _permissions(): Permission[] {
        return JSON.parse(JSON.stringify(this._list));
    }

    private _permissionAdd(permission: Permission): Permission {
        const id = this._list.length === 0 ? 'Q' : this._list[this._list.length - 1].id + 'Q';
        permission.id = id;
        this._list.push(permission);
        return JSON.parse(JSON.stringify(this._list[this._list.length - 1]));
    }

    private _permission(id?: string): Permission {
        let result: Permission;
        const list = this._list;
        for (let i = 0, length = list.length; i < length; i++) {
            if (list[i].id === id) {
                result = list[i];
            }
        }
        if (!result) { return null; }
        return JSON.parse(JSON.stringify(result));
    }

    private _permissionUpdate(id: string, permission: Permission) {
        const list = this._list;
        for (let i = 0, length = list.length; i < length; i++) {
            if (list[i].id === id) {
                list[i] = permission;
                return JSON.parse(JSON.stringify(list[i]));
            }
        }
        return null;
    }
}
