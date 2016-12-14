import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { AlertService } from './../../../modules/alert';
import { UserApi } from './../../../swagger/api/UserApi';

@Injectable()
export class AuthenticationService {

    private user: Observable<any>;
    private token: string;

    constructor(
        private router: Router,
        private alert: AlertService,
        private userApi: UserApi
    ) { }

    public getUser(): Observable<any> {
        if (this.user) { return this.user; }
        this.router.navigate(['/login']);
    }

    public isLoggedIn() {
        return !!this.user;
    }

    public login(username, password): Observable<any> {
        if (this.token) {
            return this.user = this.userApi.login(null, null, this.token);
        }
        return this.user = this.userApi.login(username, password, this.token).map(user => {
            this.token = user.token;
            return user;
        }).publishReplay(1).refCount();
    }

    public logout(): Observable<any> {
        this.token = null;
        this.user = null;
        return this.userApi.logout(this.token);
    }

    public changePassword(oldpassword: string, newpassword: string): Observable<any> {
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
