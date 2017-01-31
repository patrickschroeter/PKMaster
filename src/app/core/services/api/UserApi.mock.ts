// tslint:disable:max-line-length

import { Injectable } from '@angular/core';

import { Observable, Observer } from 'rxjs/Rx';

import { RoleApiMock } from './RoleApi.mock';
import { AppUser } from './../../../swagger';

@Injectable()
export class UserApiMock {

    static USERS: AppUser[] = [
        { id: 'b904cc6e-b3a6-42a9-8880-3096be1b6c61', email: 'patrick.schroeter@hotmail.de', password: 'password', token: 'TOKEN', firstname: 'Patrick', lastname: 'Schroeter', matNr: 949225, permissions: RoleApiMock.ROLE.All, roles: [RoleApiMock.ROLES_OBJECTS.All] },
        { id: 'ee632373-432e-40f0-9f33-8cc6b684e673', email: 'stephan.reichinger@gmail.de', password: 'password', firstname: 'Stephan', lastname: 'Reichinger', permissions: RoleApiMock.ROLE.Student, roles: [RoleApiMock.ROLES_OBJECTS.Student] },
        { id: '1', email: 'admin@pk.de', password: 'password', firstname: 'Admin', lastname: 'PK', permissions: RoleApiMock.ROLE.Admin, roles: [RoleApiMock.ROLES_OBJECTS.Admin] },
        { id: '2', email: 'principal@pk.de', password: 'password', firstname: 'Principal', lastname: 'PK', permissions: RoleApiMock.ROLE.Principal, roles: [RoleApiMock.ROLES_OBJECTS.Principal] },
        { id: '3', email: 'member@pk.de', password: 'password', firstname: 'Member', lastname: 'PK', permissions: RoleApiMock.ROLE.Member, roles: [RoleApiMock.ROLES_OBJECTS.Member] },
        { id: '4', email: 'docent@pk.de', password: 'password', firstname: 'Docent', lastname: 'PK', permissions: RoleApiMock.ROLE.Docent, roles: [RoleApiMock.ROLES_OBJECTS.Docent] },
        { id: '5', email: 'student@pk.de', password: 'password', firstname: 'Student', lastname: 'PK', permissions: RoleApiMock.ROLE.Student, roles: [RoleApiMock.ROLES_OBJECTS.Student] },
        { id: '6', email: 'observer@pk.de', password: 'password', firstname: 'Observer', lastname: 'PK', permissions: RoleApiMock.ROLE.Observer, roles: [RoleApiMock.ROLES_OBJECTS.Observer] },
        { id: '7', email: 'secreteriat@pk.de', password: 'password', firstname: 'Secreteriat', lastname: 'PK', permissions: RoleApiMock.ROLE.Secreteriat, roles: [RoleApiMock.ROLES_OBJECTS.Secreteriat] },
    ];

    static USER: AppUser = UserApiMock.USERS[1];


    private list: AppUser[] = [];

    constructor() { }

    public addUser(token?: number, user?: AppUser, extraHttpRequestParams?: any): Observable<any> {
        if (user) {
            user.id = '1';
            this.list.push(user);
        };
        return new Observable((observer: Observer<any>) => { user ? observer.next(user) : observer.error('error'); observer.complete(); });
    }

    public getUserById(userId: string, token?: number, extraHttpRequestParams?: any): Observable<any> {
        const user = UserApiMock.USER; user.id = userId;
        return new Observable((observer: Observer<any>) => { userId ? observer.next(user) : observer.error('error'); observer.complete(); });
    }

    public getUsers(token?: number, extraHttpRequestParams?: any): Observable<any> {
        return new Observable((observer: Observer<any>) => { observer.next(this.list); observer.complete(); });
    }

    public updateUserById(userId: string, token?: number, user?: AppUser, extraHttpRequestParams?: any): Observable<AppUser> {
        return new Observable((observer: Observer<any>) => { userId === user.id ? observer.next(user) : observer.error('error'); observer.complete(); });
    }

    public login(username: string, password: string, token?: string): Observable<any> {
        return new Observable((observer: Observer<any>) => { (username && password) || token ? observer.next(UserApiMock.USER) : observer.error('error'); observer.complete(); });
    }

    public logout(token: string): Observable<any> {
        return new Observable((observer: Observer<any>) => { observer.next('logout'); observer.complete(); });
    }
}
