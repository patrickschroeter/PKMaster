import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';

import { UserApiMock } from './../';

import { AppUser } from './../../../swagger';

@Injectable()
export class AuthenticationMock {

    public user = {};

    constructor() {}

    getUser(): Observable<any> {
        return new Observable(observer => {
            observer.next(this.user);
        });
    }

    isLoggedIn() {
        return true;
    }

    login(): Observable<any> {
        return new Observable(observer => {
            observer.next(this.user);
        });
    }

}
