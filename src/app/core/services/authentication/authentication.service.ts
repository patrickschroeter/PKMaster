import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, Observer } from 'rxjs/Rx';

import { PermissionService } from './../permission/permission.service';

import { AlertService } from './../../../modules/alert';
import { TranslationService } from './../../../modules/translation';
import { AppUser } from './../../../swagger';
import { UserApi } from './../../../swagger/api/UserApi';

@Injectable()
export class AuthenticationService {

    static TOKEN_KEY: string = 'authtoken';
    static TOKEN_TIME_KEY: string = 'authtokentime';
    static TOKEN_TIME: number = 1000 * 60 * 60 * 24;

    private user: Observable<any>;

    constructor(
        private router: Router,
        private alert: AlertService,
        private userApi: UserApi,
        private permission: PermissionService,
        private translationService: TranslationService
    ) {
        if (this.token) {
            this.login().subscribe(() => { }, error => {
                this.logout();
            });
        }
    }

    /**
     * @description getter method for token, handling local storage
     */
    get token(): string {
        let time = +localStorage.getItem(AuthenticationService.TOKEN_TIME_KEY);
        let token = localStorage.getItem(AuthenticationService.TOKEN_KEY);
        if (time >= Date.now() && token) {
            localStorage.setItem(AuthenticationService.TOKEN_TIME_KEY, (Date.now() + AuthenticationService.TOKEN_TIME).toString());
            return token;
        } else {
            this.logout();
            this.alert.setErrorHint('token-expired', this.translationService.translate('expiredToken'));
            return null;
        }
    }

    /**
     * @description setter method for token, handling local storage
     */
    set token(token: string) {
        if (!token) {
            localStorage.removeItem(AuthenticationService.TOKEN_KEY);
            localStorage.removeItem(AuthenticationService.TOKEN_TIME_KEY);
            return;
        }
        localStorage.setItem(AuthenticationService.TOKEN_TIME_KEY, (Date.now() + AuthenticationService.TOKEN_TIME).toString());
        localStorage.setItem(AuthenticationService.TOKEN_KEY, token);
    }

    /**
     * @description returns the observable for the user object
     */
    public getUser(): Observable<any> {
        if (this.user) { return this.user; }
        this.logout();
        return Observable.throw('No User');
    }

    /**
     * @description checks if the current user is logged in
     */
    public isLoggedIn(): boolean {
        return !!this.user;
    }

    /**
     * @description gets the user with username & password, or token. updates the users permission on success
     */
    public login(username?: string, password?: string): Observable<any> {
        if (username && password) {
            return this.user = this.userApi.login(username, password, this.token).map(user => {
                this.token = user.token;
                return this.permission.updateUserPermissions(user);
            }).publishReplay(1).refCount();
        } else {
            return this.user = this.userApi.login(null, null, this.token).map(user => {
                return this.permission.updateUserPermissions(user);
            }).publishReplay(1).refCount();
        }
    }

    /**
     * @description logout the user
     */
    public logout(): void {
        this.token = null;
        this.user = null;
        this.permission.updateUserPermissions(this.user);
        this.router.navigate(['/login']);
    }

    /**
     * @description change the users password
     */
    public changePassword(user: AppUser, oldpassword: string, newpassword: string): Observable<any> {
        /** TODO */
        user.password = newpassword;
        return this.userApi.updateUserById(user.id, null, user);
    }

    /**
     * @description updates the users attributes
     */
    public updateUser(user: AppUser): Observable<any> {
        this.user = this.userApi.updateUserById(user.id, null, user).map(result => {
            return this.permission.updateUserPermissions(result);
        }).publishReplay(1).refCount();
        return this.user;
    }

}
