import { Injectable } from '@angular/core';

import { Observable, Observer } from 'rxjs/Rx';

import { UserApiMock } from './';

import { AppUser } from './../../../swagger';

@Injectable()
export class UserEndpoint {
    private basePath: string;

    constructor() { }

    public addUser(token?: string, user?: AppUser, extraHttpRequestParams?: any): Observable<any> {
        /** hack */if (!token) { token = localStorage.getItem('authtoken'); }
        console.log('%cMock:' + `%c getUserById ${user.email}`, 'color: #F44336', 'color: #fefefe');
        const newUser = this._user(user.id);
        return new Observable((observer: Observer<any>) => {
            setTimeout(() => {
                if (!token) {
                    console.error(`No Token!`);
                    observer.error(`No Token!`);
                } else if (newUser) {
                    observer.next(newUser);
                } else {
                    console.error(`No User with ID ${user.email} found`);
                    observer.error(`No User with ID ${user.email} found`);
                }
                observer.complete();
            }, 500);
        });
    }

    public getUserById(userId: string, token?: string, extraHttpRequestParams?: any): Observable<any> {
        /** hack */if (!token) { token = localStorage.getItem('authtoken'); }
        console.log('%cMock:' + `%c getUserById ${userId}`, 'color: #F44336', 'color: #fefefe');
        const user = this._user(userId);
        return new Observable((observer: Observer<any>) => {
            setTimeout(() => {
                if (!token) {
                    console.error(`No Token!`);
                    observer.error(`No Token!`);
                } else if (user) {
                    observer.next(user);
                } else {
                    console.error(`No User with ID ${userId} found`);
                    observer.error(`No User with ID ${userId} found`);
                }
                observer.complete();
            }, 500);
        });
    }

    public getUsers(token?: string, extraHttpRequestParams?: any): Observable<any> {
        /** hack */if (!token) { token = localStorage.getItem('authtoken'); }
        console.log('%cMock:' + `%c getUsers`, 'color: #F44336', 'color: #fefefe');
        const users = this._users();
        return new Observable((observer: Observer<any>) => {
            setTimeout(() => {
                if (!token) {
                    console.error(`No Token!`);
                    observer.error(`No Token!`);
                } else if (users) {
                    observer.next(users);
                } else {
                    console.error(`Error loading Users.`);
                    observer.error(`Error loading Users.`);
                }
                observer.complete();
            }, 500);
        });
    }

    public updateUserById(userId: string, token?: string, user?: AppUser, extraHttpRequestParams?: any): Observable<AppUser> {
        /** hack */if (!token) { token = localStorage.getItem('authtoken'); }
        console.log('%cMock:' + `%c updateUserById`, 'color: #F44336', 'color: #fefefe');
        const updatedUser = this._userUpdate(userId, user);
        return new Observable((observer: Observer<any>) => {
            setTimeout(() => {
                if (!token) {
                    console.error(`No Token!`);
                    observer.error(`No Token!`);
                } else if (updatedUser) {
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
    public login(username: string, password: string, token?: string): Observable<any> {
        if (token) {
            console.log('%cMock:' + `%c login ${token}`, 'color: #F44336', 'color: #fefefe');
            const user = this._user(null, token);
            return new Observable((observer: Observer<any>) => {
                setTimeout(() => {
                    if (user) {
                        observer.next(user);
                    } else {
                        console.error(`No User with Token`);
                        observer.error(`No User with Token`);
                    }
                    observer.complete();
                }, 500);
            });
        } else {
            console.log('%cMock:' + `%c login ${username}`, 'color: #F44336', 'color: #fefefe');
            const user = this._login(username, password);
            return new Observable((observer: Observer<any>) => {
                setTimeout(() => {
                    if (user) {
                        user.token = 'TOKEN';
                        observer.next(user);
                    } else {
                        console.error(`Wrong Credentials.`);
                        observer.error(`Wrong Credentials.`);
                    }
                    observer.complete();
                }, 500);
            });
        }
    }

    public logout(token: string): Observable<any> {
        console.log('%cMock:' + `%c logout ${token}`, 'color: #F44336', 'color: #fefefe');
        return new Observable((observer: Observer<any>) => {
            setTimeout(() => {
                if (!token) {
                    console.error(`No Token!`);
                    observer.error(`No Token!`);
                } else {
                    observer.next(true);
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
            if (list[i].id === id || list[i].token === token) {
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

    private _userUpdate(id: string, user: AppUser) {
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

    private _login(username: string, password: string) {
        const list = this._list;
        for (let i = 0, length = list.length; i < length; i++) {
            if (list[i].email === username && list[i].password === password) {
                return JSON.parse(JSON.stringify(list[i]));
            }
        }
        return null;
    }
}
