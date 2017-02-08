import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Observable, Observer } from 'rxjs/Rx';

import { UserApiMock, AuthenticationService } from './../';

import { AppUser, RoleApi } from './../../../swagger';

@Injectable()
export class UserEndpoint {
    private basePath: string;

    constructor(
        private roleApi: RoleApi
    ) { }

    public addUser(user?: AppUser, extraHttpRequestParams?: any): Observable<any> {
        console.log('%cMock:' + `%c getUserById ${user.email}`, 'color: #F44336', 'color: #fefefe');
        const newUser = this._user(user.id);
        return new Observable((observer: Observer<any>) => {
            setTimeout(() => {
                if (newUser) {
                    observer.next(newUser);
                } else {
                    console.error(`No User with ID ${user.email} found`);
                    observer.error(`No User with ID ${user.email} found`);
                }
                observer.complete();
            }, 500);
        });
    }

    public getUserById(userId: string, extraHttpRequestParams?: any): Observable<any> {
        console.log('%cMock:' + `%c getUserById ${userId}`, 'color: #F44336', 'color: #fefefe');
        const user = this._user(userId);
        return new Observable((observer: Observer<any>) => {
            setTimeout(() => {
                if (user) {
                    observer.next(user);
                } else {
                    console.error(`No User with ID ${userId} found`);
                    observer.error(`No User with ID ${userId} found`);
                }
                observer.complete();
            }, 500);
        });
    }

    public getUsers(extraHttpRequestParams?: any): Observable<any> {
        console.log('%cMock:' + `%c getUsers`, 'color: #F44336', 'color: #fefefe');
        const users = this._users();
        return new Observable((observer: Observer<any>) => {
            setTimeout(() => {
                if (users) {
                    observer.next(users);
                } else {
                    console.error(`Error loading Users.`);
                    observer.error(`Error loading Users.`);
                }
                observer.complete();
            }, 500);
        });
    }

    public updateUserById(userId: string, user?: AppUser, extraHttpRequestParams?: any): Observable<AppUser> {
        console.log('%cMock:' + `%c updateUserById`, 'color: #F44336', 'color: #fefefe');
        const updatedUser = this._userUpdate(userId, user);
        return new Observable((observer: Observer<any>) => {
            setTimeout(() => {
                if (updatedUser) {
                    observer.next(updatedUser);
                } else {
                    console.error(`Error loading User with ID ${userId}`);
                    observer.error(`Error loading User with ID ${userId}`);
                }
                observer.complete();
            }, 500);
        });
    }

    /** TODO */
    public login(username: string, password: string): Observable<any> {
        console.log('%cMock:' + `%c login ${username}`, 'color: #F44336', 'color: #fefefe');
        const bearer = this._login(username, password);
        return new Observable((observer: Observer<any>) => {
            setTimeout(() => {
                if (bearer) {
                    observer.next(bearer);
                } else {
                    console.error(`Wrong Credentials.`);
                    observer.error(`Wrong Credentials.`);
                }
                observer.complete();
            }, 500);
        });
    }

    public logout(): Observable<any> {
        return new Observable((observer: Observer<any>) => {
            setTimeout(() => {
                observer.next(true);
                observer.complete();
            }, 500);
        });
    }

    public removeUserRole(userId: string, roleId?: string, extraHttpRequestParams?: any): Observable<{}> {
        const user: AppUser = this._user(userId);
        let index = -1;
        for (let i = 0, length = user.roles.length; i < length; i++) {
            const element = user.roles[i];
            if (element.id === roleId) {
                index = i;
            }
        }
        if (index !== -1) {
            user.roles.splice(index, 1);
        }
        return this.observe(this._userUpdate(user.id, this._updatePermissions(user)));
    }

    public updateUserRole(userId: string, roleId?: string, extraHttpRequestParams?: any): Observable<{}> {
        const user: AppUser = this._user(userId);
        const role = this.roleApi['_role'](roleId);
        if (_.findIndex(user.roles, obj => obj.id === roleId) === -1) {
            user.roles.push(role);
        }
        return this.observe(this._userUpdate(user.id, this._updatePermissions(user)));
    }

    public getCurrentUser(): Observable<any> {
        const user = this._user('null', AuthenticationService.getStaticToken());
        return this.observe(user);
    }

    /**
     * Helper observer
     */
    private observe<T>(obj: T): Observable<T> {
        return new Observable<T>((observer: Observer<T>) => {
            setTimeout(() => {
                if (obj) {
                    observer.next(obj);
                } else {
                    observer.error('No obj found');
                }
                observer.complete();
            }, 500);
        });
    }

    // tslint:disable-next-line:member-ordering
    private _list: AppUser[] = UserApiMock.USERS;

    private _users() {
        return JSON.parse(JSON.stringify(this._list));
    }

    private _user(id?: string, token?: string) {
        const list = this._list;
        for (let i = 0, length = list.length; i < length; i++) {
            if (list[i].id === id || 'local ' + list[i].token === token) {
                return JSON.parse(JSON.stringify(list[i]));
            }
        }
        return null;
    }

    // tslint:disable-next-line:no-unused-variable
    private _userAdd(user: AppUser): AppUser {
        const id = this._list.length === 0 ? 'W' : this._list[this._list.length - 1].id + 'W';
        user.id = id;
        user.created = new Date();
        this._list.push(user);
        return JSON.parse(JSON.stringify(this._list[this._list.length - 1]));
    }

    private _userUpdate(id: string, user: AppUser): AppUser {
        const list = this._list;
        for (let i = 0, length = list.length; i < length; i++) {
            if (list[i].id === id) {
                for (let key in user) {
                    if (!user.hasOwnProperty(key)) { continue; }
                    list[i][key] = user[key];
                }
                return JSON.parse(JSON.stringify(list[i]));
            }
        }
        return null;
    }

    private _updatePermissions(user: AppUser): AppUser {
        const permissions: string[] = [];
        for (let i = 0, length = user.roles.length; i < length; i++) {
            user.roles[i] = this.roleApi['_role'](user.roles[i].id);
            const role = user.roles[i];
            for (let j = 0, l = role.rolePermissions.length; j < l; j++) {
                const perm = role.rolePermissions[j];
                if (permissions.indexOf(perm.name) === -1) {
                    permissions.push(perm.name);
                }
            }
        }
        user.permissions = permissions;
        return user;
    }

    private _login(username: string, password: string) {
        const list = this._list;
        for (let i = 0, length = list.length; i < length; i++) {
            if (list[i].email === username && list[i].password === password) {

                return {
                    token_type: 'local',
                    access_token: list[i].token
                }
                // return JSON.parse(JSON.stringify(list[i]));
            }
        }
        return null;
    }
}
