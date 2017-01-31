import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Observable, Observer } from 'rxjs/Rx';

import { RoleApiMock } from './../../../core';

import { Role } from './../../../swagger';

@Injectable()
export class RoleEndpoint {

    constructor() { }

    public getRoles (token?: number, extraHttpRequestParams?: any ) : Observable<Array<Role>> {
        return new Observable((observer: Observer<any>) => {
            setTimeout(() => {
                observer.next(this._roles());
                observer.complete();
            }, 500);
        });
    }

    public addRole (token?: number, role?: Role, extraHttpRequestParams?: any ) : Observable<Role> {
        const newrole = this._roleAdd(role);
        return new Observable((observer: Observer<any>) => {
            setTimeout(() => {
                observer.next(newrole);
                observer.complete();
            }, 500);
        });
    }

    public getRoleById (roleId: string, token?: number, extraHttpRequestParams?: any ) : Observable<Role> {
        const role = this._role(roleId);
        return new Observable((observer: Observer<any>) => {
            setTimeout(() => {
                observer.next(role);
                observer.complete();
            }, 500);
        });
    }

    /**
     * Mock Server
     */

    // tslint:disable-next-line:member-ordering
    private _list: Role[] = [
        RoleApiMock.ROLES_OBJECTS.All,
        RoleApiMock.ROLES_OBJECTS.Admin,
        RoleApiMock.ROLES_OBJECTS.Docent,
        RoleApiMock.ROLES_OBJECTS.Member,
        RoleApiMock.ROLES_OBJECTS.Observer,
        RoleApiMock.ROLES_OBJECTS.Principal,
        RoleApiMock.ROLES_OBJECTS.Secreteriat,
        RoleApiMock.ROLES_OBJECTS.Student
    ];

    private _roles(): Role[] {
        return JSON.parse(JSON.stringify(this._list));
    }

    private _roleAdd(role: Role): Role {
        const id = this._list.length === 0 ? 'Q' : this._list[this._list.length - 1].id + 'Q';
        role.id = id;
        role.rolePermissions = [];
        this._list.push(role);
        return JSON.parse(JSON.stringify(this._list[this._list.length - 1]));
    }

    private _role(id?: string): Role {
        let result: Role;
        const list = this._list;
        for (let i = 0, length = list.length; i < length; i++) {
            if (list[i].id === id) {
                result = list[i];
            }
        }
        if (!result) { return null; }
        return JSON.parse(JSON.stringify(result));
    }

    private _roleUpdate(id: string, role: Role) {
        const list = this._list;
        for (let i = 0, length = list.length; i < length; i++) {
            if (list[i].id === id) {
                list[i] = role;
                return JSON.parse(JSON.stringify(list[i]));
            }
        }
        return null;
    }
}
