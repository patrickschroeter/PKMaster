import { Injectable } from '@angular/core';

import { Observable, Observer } from 'rxjs/Rx';

@Injectable()
export class AuthenticationMock {

    public user = {};

    constructor() {}

    getUser(): Observable<any> {
        return new Observable((observer: Observer<any>) => {
            observer.next(this.user);
        });
    }

    isLoggedIn() {
        return true;
    }

    login(): Observable<any> {
        return new Observable((observer: Observer<any>) => {
            observer.next(this.user);
        });
    }

    logout(): Observable<any> {
        return new Observable((observer: Observer<any>) => {
            observer.next(this.user);
        });
    }

}
