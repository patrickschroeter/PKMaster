// tslint:disable:max-line-length

import { Injectable } from '@angular/core';

import { Observable, Observer } from 'rxjs/Rx';

import { AppUser } from './../../../swagger';

@Injectable()
export class UserApiMock {

    static PERMISSION = {
        Permission: {
            Read: 'ReadPermissions',
            Edit: 'EditPermissions'
        },
        Roles: {
            Read: 'ReadRoles',
            Edit: 'EditRoles',
            Delete: 'DeleteRoles'
        },
        Users: {
            Read: 'ReadUsers',
            Edit: 'EditUsers',
            EditPassword: 'EditUsersPassword'
        },
        Application: {
            Create: 'CreateApplications',
            Read: 'ReadApplications',
            Edit: 'EditApplications',
            Comment: 'CommentApplications',
            Delete: 'DeleteApplications',
            Accept: 'AcceptApplications'
        },
        Conference: {
            Read: 'ReadConferences',
            Edit: 'EditConferences'
        },
        Forms: {
            Read: 'ReadForms',
            Edit: 'EditForms'
        }
    }

    static PERMISSIONS = {
        All: [
            /** Permissions */
            UserApiMock.PERMISSION.Permission.Read,
            UserApiMock.PERMISSION.Permission.Edit,
            /** Roles */
            UserApiMock.PERMISSION.Roles.Read,
            UserApiMock.PERMISSION.Roles.Edit,
            UserApiMock.PERMISSION.Roles.Delete,
            /** Users */
            UserApiMock.PERMISSION.Users.Read,
            UserApiMock.PERMISSION.Users.Edit,
            UserApiMock.PERMISSION.Users.EditPassword,
            /** Applications */
            UserApiMock.PERMISSION.Application.Create,
            UserApiMock.PERMISSION.Application.Read,
            UserApiMock.PERMISSION.Application.Edit,
            UserApiMock.PERMISSION.Application.Delete,
            UserApiMock.PERMISSION.Application.Comment,
            UserApiMock.PERMISSION.Application.Accept,
            /** Conference */
            UserApiMock.PERMISSION.Conference.Read,
            UserApiMock.PERMISSION.Conference.Edit,
            /** Forms */
            UserApiMock.PERMISSION.Forms.Read,
            UserApiMock.PERMISSION.Forms.Edit,
        ],
        Admin: [
            UserApiMock.PERMISSION.Permission.Read,
            UserApiMock.PERMISSION.Permission.Edit,
            UserApiMock.PERMISSION.Roles.Read,
            UserApiMock.PERMISSION.Roles.Edit,
            UserApiMock.PERMISSION.Roles.Delete,
            UserApiMock.PERMISSION.Users.Read,
            UserApiMock.PERMISSION.Users.Edit,
            UserApiMock.PERMISSION.Users.EditPassword,
        ],
        Principal: [
            UserApiMock.PERMISSION.Application.Create,
            UserApiMock.PERMISSION.Application.Read,
            UserApiMock.PERMISSION.Application.Edit,
            UserApiMock.PERMISSION.Application.Delete,
            UserApiMock.PERMISSION.Application.Comment,
            UserApiMock.PERMISSION.Application.Accept,
            UserApiMock.PERMISSION.Conference.Read,
            UserApiMock.PERMISSION.Conference.Edit,
            UserApiMock.PERMISSION.Forms.Read,
            UserApiMock.PERMISSION.Forms.Edit,
        ],
        Member: [
            UserApiMock.PERMISSION.Application.Create,
            UserApiMock.PERMISSION.Application.Read,
            UserApiMock.PERMISSION.Application.Comment,
            UserApiMock.PERMISSION.Conference.Read,
            UserApiMock.PERMISSION.Forms.Read,
        ],
        Docent: [
            UserApiMock.PERMISSION.Application.Create,
            UserApiMock.PERMISSION.Conference.Read,
            UserApiMock.PERMISSION.Forms.Read,
        ],
        Student: [
            UserApiMock.PERMISSION.Application.Create,
            UserApiMock.PERMISSION.Forms.Read,
        ],

        Observer: [
            UserApiMock.PERMISSION.Application.Read,
        ],
        Secreteriat: [
            UserApiMock.PERMISSION.Application.Create,
            UserApiMock.PERMISSION.Application.Read,
            UserApiMock.PERMISSION.Application.Edit,
        ]
    };

    static USERS: AppUser[] = [
        { id: 'b904cc6e-b3a6-42a9-8880-3096be1b6c61', email: 'patrick.schroeter@hotmail.de', password: 'password', token: 'TOKEN', firstname: 'Patrick', lastname: 'Schroeter', matNr: 949225, permissions: UserApiMock.PERMISSIONS.All },
        { id: 'ee632373-432e-40f0-9f33-8cc6b684e673', email: 'stephan.reichinger@gmail.de', password: 'password', firstname: 'Stephan', lastname: 'Reichinger', permissions: UserApiMock.PERMISSIONS.Student },
        { id: '1', email: 'admin@pk.de', password: 'password', firstname: 'Admin', lastname: 'PK', permissions: UserApiMock.PERMISSIONS.Admin },
        { id: '2', email: 'principal@pk.de', password: 'password', firstname: 'Principal', lastname: 'PK', permissions: UserApiMock.PERMISSIONS.Principal },
        { id: '3', email: 'member@pk.de', password: 'password', firstname: 'Member', lastname: 'PK', permissions: UserApiMock.PERMISSIONS.Member },
        { id: '4', email: 'docent@pk.de', password: 'password', firstname: 'Docent', lastname: 'PK', permissions: UserApiMock.PERMISSIONS.Docent },
        { id: '5', email: 'student@pk.de', password: 'password', firstname: 'Student', lastname: 'PK', permissions: UserApiMock.PERMISSIONS.Student },
        { id: '6', email: 'observer@pk.de', password: 'password', firstname: 'Observer', lastname: 'PK', permissions: UserApiMock.PERMISSIONS.Observer },
        { id: '7', email: 'secreteriat@pk.de', password: 'password', firstname: 'Secreteriat', lastname: 'PK', permissions: UserApiMock.PERMISSIONS.Secreteriat },
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
