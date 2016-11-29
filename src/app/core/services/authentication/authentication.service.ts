import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { AlertService } from './../alert';

@Injectable()
export class AuthenticationService {

    private user: Observable<any>;

    constructor(private router: Router, private alert: AlertService) { }

    getUser(): Observable<any> {
        if (this.user) { return this.user; }
        this.router.navigate(['/login']);
    }

    isLoggedIn() {
        return !!this.user;
    }

    login(): Observable<any> {
        this.user = new Observable(observer => {
            setTimeout(() => {
                observer.next({
                    isAdmin: false,
                    isPK: true
                });
                observer.complete();
            }, 200);
        });
        return this.user;
    }

    changePassword(oldpassword: string, newpassword: string): Observable<any> {
        this.alert.setLoading('changePassword', `Changing Password...`);
        return new Observable(observer => {
            setTimeout(() => {
                observer.next();
                // observer.error();
                this.alert.removeHint('changePassword');
                observer.complete();
            }, 200);
        });
    }

}
