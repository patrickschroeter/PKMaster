import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { AlertService } from './../../../modules/alert';
import { AppUser } from './../../../swagger';
import { UserApi } from './../../../swagger/api/UserApi';

@Injectable()
export class AuthenticationService {

    private user: Observable<any>;

    private tokenKey = 'authtoken';
    private tokenTimeKey = 'authtokentime';
    private tokenTime = 1000 * 60 * 60 * 24;

    constructor(
        private router: Router,
        private alert: AlertService,
        private userApi: UserApi
    ) {
        if (this.token) {
            this.login().subscribe(() => { }, error => {
                this.logout();
            });
        }
    }

    get token(): string {
        let time = +localStorage.getItem(this.tokenTimeKey);
        let token = localStorage.getItem(this.tokenKey);
        if (time >= Date.now() && token) {
            localStorage.setItem(this.tokenTimeKey, (Date.now() + this.tokenTime).toString() );
            return token;
        } else {
            this.logout();
            /** TODO: hint: no token, no time */
            return null;
        }
    }
    set token(token: string) {
        if (!token) {
            localStorage.removeItem(this.tokenKey);
            localStorage.removeItem(this.tokenTimeKey);
            return;
        }
        localStorage.setItem(this.tokenTimeKey, (Date.now() + this.tokenTime).toString() );
        localStorage.setItem(this.tokenKey, token);
    }

    public getUser(): Observable<any> {
        if (this.user) { return this.user; }
        this.logout();
        return Observable.throw('No User');
    }

    public isLoggedIn() {
        return !!this.user;
    }

    public login(username?: string, password?: string): Observable<any> {
        if (username && password) {
            return this.user = this.userApi.login(username, password, this.token).map(user => {
                this.token = user.token;
                return user;
            }).publishReplay(1).refCount();
        } else {
            return this.user = this.userApi.login(null, null, this.token).publishReplay(1).refCount();
        }
    }

    public logout(): void {
        this.token = null;
        this.user = null;
        this.router.navigate(['/login']);
    }

    public changePassword(user: AppUser, oldpassword: string, newpassword: string): Observable<any> {
        /** TODO */
        user.password = newpassword;
        return this.userApi.updateUserById(user.id, null, user);
    }

    public updateUser(user: AppUser): Observable<any> {
        this.user = this.userApi.updateUserById(user.id, null, user).publishReplay(1).refCount();
        return this.user;
    }

}
