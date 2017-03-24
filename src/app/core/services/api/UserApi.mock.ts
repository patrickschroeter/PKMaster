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

// tslint:disable:max-line-length
import { Injectable } from '@angular/core';

import { Observable, Observer } from 'rxjs/Rx';

import { RoleApiMock } from './RoleApi.mock';
import { UserDetailDto, UserCreateDto } from 'app/swagger';

class UserDetailDtoMock implements UserDetailDto, UserCreateDto {
    id: string;
    token?: string;
    password: string;
    email: string;
    ldapId?: number;
    firstname?: string;
    lastname?: string;
    matNr?: number;
    permissions?: any[];
    roles?: any[];
}

@Injectable()
export class UserApiMock {

    static USERS: UserDetailDtoMock[] = [
        { id: 'b904cc6e-b3a6-42a9-8880-3096be1b6c61', email: 'patrick.schroeter@hotmail.de', password: 'password', token: 'patrick.schroeter@hotmail.de', firstname: 'Patrick', lastname: 'Schroeter', matNr: 949225, permissions: RoleApiMock.ROLE.All, roles: [RoleApiMock.ROLES_OBJECTS.All] },
        { id: 'ee632373-432e-40f0-9f33-8cc6b684e673', email: 'stephan.reichinger@gmail.de', token: 'stephan.reichinger@gmail.de', password: 'password', firstname: 'Stephan', lastname: 'Reichinger', permissions: RoleApiMock.ROLE.Student, roles: [RoleApiMock.ROLES_OBJECTS.Student] },
        { id: '1', email: 'admin@pk.de', token: 'admin@pk.de', password: 'password', firstname: 'Admin', lastname: 'PK-Admin', permissions: RoleApiMock.ROLE.Admin, roles: [RoleApiMock.ROLES_OBJECTS.Admin] },
        { id: '2', email: 'principal@pk.de', token: 'principal@pk.de', password: 'password', firstname: 'Principal', lastname: 'PK-Principal', permissions: RoleApiMock.ROLE.Principal, roles: [RoleApiMock.ROLES_OBJECTS.Principal] },
        { id: '3', email: 'member@pk.de', token: 'member@pk.de', password: 'password', firstname: 'Member', lastname: 'PK-Member', permissions: RoleApiMock.ROLE.Member, roles: [RoleApiMock.ROLES_OBJECTS.Member] },
        { id: '4', email: 'docent@pk.de', token: 'docent@pk.de', password: 'password', firstname: 'Docent', lastname: 'PK-Docent', permissions: RoleApiMock.ROLE.Docent, roles: [RoleApiMock.ROLES_OBJECTS.Docent] },
        { id: '5', email: 'student@pk.de', token: 'student@pk.de', password: 'password', firstname: 'Student', lastname: 'PK-Student', permissions: RoleApiMock.ROLE.Student, roles: [RoleApiMock.ROLES_OBJECTS.Student] },
        { id: '6', email: 'observer@pk.de', token: 'observer@pk.de', password: 'password', firstname: 'Observer', lastname: 'PK-Observer', permissions: RoleApiMock.ROLE.Observer, roles: [RoleApiMock.ROLES_OBJECTS.Observer] },
        { id: '7', email: 'secreteriat@pk.de', token: 'secreteriat@pk.de', password: 'password', firstname: 'Secreteriat', lastname: 'PK-Secreteriat', permissions: RoleApiMock.ROLE.Secreteriat, roles: [RoleApiMock.ROLES_OBJECTS.Secreteriat] },
    ];

    static USER: UserDetailDto = UserApiMock.USERS[1];

    private list: UserDetailDto[] = [];

    static getUserByEmail(email: string): UserDetailDtoMock {
        for (const user of UserApiMock.USERS) {
            if (user.email === email) {
                return user;
            }
        }
        return UserApiMock.USERS[0];
    }

    constructor() { }

    public addUser(user?: UserDetailDto, extraHttpRequestParams?: any): Observable<any> {
        if (user) {
            user.id = '1';
            this.list.push(user);
        };
        return new Observable((observer: Observer<any>) => { user ? observer.next(user) : observer.error('error'); observer.complete(); });
    }

    public getUserById(userId: string, extraHttpRequestParams?: any): Observable<any> {
        const user = UserApiMock.USER; user.id = userId;
        return new Observable((observer: Observer<any>) => { userId ? observer.next(user) : observer.error('error'); observer.complete(); });
    }

    public getUsers(token?: number, extraHttpRequestParams?: any): Observable<any> {
        return new Observable((observer: Observer<any>) => { observer.next(this.list); observer.complete(); });
    }

    public updateUserById(userId: string, user?: UserDetailDto, extraHttpRequestParams?: any): Observable<UserDetailDto> {
        return new Observable((observer: Observer<any>) => { userId === user.id ? observer.next(user) : observer.error('error'); observer.complete(); });
    }

    public login(username: string, password: string): Observable<any> {
        return new Observable((observer: Observer<any>) => { username && password ? observer.next(UserApiMock.USER) : observer.error('error'); observer.complete(); });
    }

    public logout(token: string): Observable<any> {
        return new Observable((observer: Observer<any>) => { observer.next('logout'); observer.complete(); });
    }

    public getCurrentUser(): Observable<any> {
        const user = UserApiMock.USER;
        return new Observable((observer: Observer<any>) => { observer.next(user); observer.complete(); });
    }
}
