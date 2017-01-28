// tslint:disable:max-line-length

import { Injectable } from '@angular/core';

import { Observable, Observer } from 'rxjs/Rx';

import { AppUser } from './../../../swagger';

@Injectable()
export class UserApiMock {

    static PERMISSION = {
        READAPPLICATIONS: 'ReadApplications',
        EDITAPPLICATIONS: 'EditApplications',
        READCONFERENCES: 'ReadConferences',
        EDITCONFERENCES: 'EditConferences',
        READFORMS: 'ReadForms',
        EDITFORMS: 'EditForms',
        READPERMISSIONS: 'ReadPermissions',
        EDITPERMISSIONS: 'EditPermissions'
    };

    static PERMISSIONS = {
        ALL: [
            UserApiMock.PERMISSION.READAPPLICATIONS,
            UserApiMock.PERMISSION.EDITAPPLICATIONS,
            UserApiMock.PERMISSION.READCONFERENCES,
            UserApiMock.PERMISSION.EDITCONFERENCES,
            UserApiMock.PERMISSION.READFORMS,
            UserApiMock.PERMISSION.EDITFORMS,
            UserApiMock.PERMISSION.READPERMISSIONS,
            UserApiMock.PERMISSION.EDITPERMISSIONS
        ],
        PARTIAL: [
            UserApiMock.PERMISSION.READAPPLICATIONS,
            UserApiMock.PERMISSION.READPERMISSIONS
        ]
    };

    static USERS: AppUser[] = [{ id: 'b904cc6e-b3a6-42a9-8880-3096be1b6c61', email: 'patrick.schroeter@hotmail.de', password: 'password', token: 'TOKEN', firstname: 'Patrick', lastname: 'Schroeter', matNr: 949225, permissions: UserApiMock.PERMISSIONS.ALL }, { id: 'ee632373-432e-40f0-9f33-8cc6b684e673', email: 'stephan.reichinger@gmail.de', password: 'password', firstname: 'Stephan', lastname: 'Reichinger', permissions: UserApiMock.PERMISSIONS.PARTIAL }];

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
