import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';

import { AppUser } from './../../../swagger';

@Injectable()
export class UserApiMock {

    constructor() { }

    public addUser (token?: number, user?: AppUser, extraHttpRequestParams?: any ) : Observable<any> {
        console.log('%cMock:' + `%c getUserById ${user.email}`, 'color: #F44336', 'color: #fefefe');
        let user = this._user(userId);
        return new Observable(observer => {
            setTimeout(() => {
                if (user) {
                    observer.next(user);
                } else {
                    console.error(`No User with ID ${user.email} found`);
                    observer.error(`No User with ID ${user.email} found`);
                }
                observer.complete();
            }, 500);
        });
    }

    public getUserById (userId: string, token?: number, extraHttpRequestParams?: any ) : Observable<any> {
        console.log('%cMock:' + `%c getUserById ${userId}`, 'color: #F44336', 'color: #fefefe');
        let user = this._user(userId);
        return new Observable(observer => {
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

    public getUsers (token?: number, extraHttpRequestParams?: any ) : Observable<any> {
        console.log('%cMock:' + `%c getUsers`, 'color: #F44336', 'color: #fefefe');
        let users = this._users();
        return new Observable(observer => {
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

    /** TODO */
    public login(username: string, password: string, token?: string): Observable<any> {
        if (token) {
            console.log('%cMock:' + `%c login ${token}`, 'color: #F44336', 'color: #fefefe');
            let user = this._user(null, token)
            return new Observable(observer => {
                setTimeout(() => {
                    if (user) {
                        observer.next(user);
                    } else {
                        observer.next(false)
                    }
                    observer.complete();
                }, 500);
            });
        } else {
            console.log('%cMock:' + `%c login ${username}`, 'color: #F44336', 'color: #fefefe');
            let user = this._login(username, password);
            return new Observable(observer => {
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
        return new Observable(observer => {
            setTimeout(() => {
                observer.next(true);
                observer.complete();
            }, 500);
        });
    }

    private _list: AppUser[] = [
        {
            id: '17',
            email: 'patrick.schroeter@hotmail.de',
            password: 'password'
        }
    ]

    private _users() {
        // this._list = [];
        return JSON.parse(JSON.stringify(this._list));
    }

    private _user(id?: string, token?: string) {
        let result;
        let list = this._list;
        for (let i = 0, length = list.length; i < length; i++) {
            if (list[i].id === id || list[i].token === token) {
                result = list[i];
            }
        }
        if (!result) { return null; }
        return JSON.parse(JSON.stringify(result));
    }

    private _userAdd(user: AppUser): AppUser {
        let id = this._list.length === 0 ? 'W' : this._list[this._list.length - 1].id + 'W';
        user.id = id;
        user.created = new Date();
        this._list.push(user);
        return JSON.parse(JSON.stringify(this._list[this._list.length - 1]));
    }

    private _userUpdate(id: string, user: AppUser) {
        let list = this._list;
        for (let i = 0, length = list.length; i < length; i++) {
            if (list[i].id === id) {
                list[i] = user;
                return JSON.parse(JSON.stringify(list[i]));
            }
        }
        return null;
    }

    private _login(username: string, password: string) {
        let list = this._list;
        for (let i = 0, length = list.length; i < length; i++) {
            if (list[i].email === username && list[i].password === password) {
                return JSON.parse(JSON.stringify(list[i]));
            }
        }
        return null;
    }
}
