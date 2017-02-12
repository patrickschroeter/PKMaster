import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Observable, Observer } from 'rxjs/Rx';

import { RoleApiMock } from './../../../core';

import { PermissionEndpoint } from './PermissionEndpoint';

import { RoleDto } from './../../../swagger';

@Injectable()
export class RoleEndpoint {

    constructor(
        private permissionApi: PermissionEndpoint
    ) { }

    public getRoles(extraHttpRequestParams?: any): Observable<Array<RoleDto>> {
        return this.observe(this._roles());
    }

    public addRole(role?: RoleDto, extraHttpRequestParams?: any): Observable<RoleDto> {
        const newrole = this._roleAdd(role);
        return this.observe(newrole);
    }

    public getRoleById(roleId: string, extraHttpRequestParams?: any): Observable<RoleDto> {
        const role = this._role(roleId);
        return this.observe(role);
    }

    public updateRoleById(roleId: string, role?: RoleDto, extraHttpRequestParams?: any): Observable<RoleDto> {
        const updaterole = this._roleUpdate(roleId, role);
        return this.observe(updaterole);
    }

    public deletePermissionOfRole(roleId: string, permissionId: string, extraHttpRequestParams?: any): Observable<any> {
        const updaterole = this._removePermission(roleId, permissionId);
        return this.observe(updaterole);
    }

    public addPermissionToRole(roleId: string, permissionId: string, permissionId2: string, extraHttpRequestParams?: any): Observable<any> {
        const role = this._addPermission(roleId, permissionId);
        return this.observe(role);
    }

    /**
     * Helper observer
     */
    private observe<T>(obj: T): Observable<T> {
        return new Observable<T>((observer: Observer<T>) => {
            setTimeout(() => {
                observer.next(obj);
                observer.complete();
            }, 500);
        });
    }

    /**
     * Mock Server
     */

    // tslint:disable-next-line:member-ordering
    private _list: RoleDto[] = [
        RoleApiMock.ROLES_OBJECTS.All,
        RoleApiMock.ROLES_OBJECTS.Admin,
        RoleApiMock.ROLES_OBJECTS.Docent,
        RoleApiMock.ROLES_OBJECTS.Member,
        RoleApiMock.ROLES_OBJECTS.Observer,
        RoleApiMock.ROLES_OBJECTS.Principal,
        RoleApiMock.ROLES_OBJECTS.Secreteriat,
        RoleApiMock.ROLES_OBJECTS.Student
    ];

    private _roles(): RoleDto[] {
        return JSON.parse(JSON.stringify(this._list));
    }

    private _roleAdd(role: RoleDto): RoleDto {
        const id = this._list.length === 0 ? 'Q' : this._list[this._list.length - 1].id + 'Q';
        role.id = id;
        role.rolePermissions = [];
        this._list.push(role);
        return JSON.parse(JSON.stringify(this._list[this._list.length - 1]));
    }

    private _role(id?: string): RoleDto {
        let result: RoleDto;
        const list = this._list;
        for (let i = 0, length = list.length; i < length; i++) {
            if (list[i].id === id) {
                result = list[i];
            }
        }
        if (!result) { return null; }
        return JSON.parse(JSON.stringify(result));
    }

    private _roleUpdate(id: string, role: RoleDto): RoleDto {
        const list = this._list;
        for (let i = 0, length = list.length; i < length; i++) {
            if (list[i].id === id) {
                list[i] = role;
                return JSON.parse(JSON.stringify(list[i]));
            }
        }
        return null;
    }

    private _removePermission(roleId: string, permissionId: string): RoleDto {
        const role = this._role(roleId);
        if (!role) { return; }

        let index = -1;
        for (let i = 0, length = role.rolePermissions.length; i < length; i++) {
            if (role.rolePermissions[i].id === permissionId) {
                index = i;
            }
        }

        if (index !== -1) {
            role.rolePermissions.splice(index, 1);
        }
        return this._roleUpdate(role.id, role);
    }

    private _addPermission(roleId: string, permissionId: string): RoleDto {
        const permission = this.permissionApi['_permission'](permissionId);
        const role = this._role(roleId);
        if (!role) { return; }
        if (!permission) { return role; }
        this._removePermission(roleId, permissionId);
        role.rolePermissions.push(permission);
        return this._roleUpdate(role.id, role);
    }
}
