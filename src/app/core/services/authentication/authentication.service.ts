import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Observer } from 'rxjs/Rx';

/** Services */
import { PermissionService } from './../permission/permission.service';
import { AlertService } from './../../../modules/alert';
import { TranslationService } from './../../../modules/translation';
import { UserApi } from './../../../swagger/api/UserApi';

/** Models */
import { AppUser } from './../../../swagger';

/** Decorators */
import { Loading } from './../../../shared/decorators/loading.decorator';

@Injectable()
export class AuthenticationService {

    static TOKEN_KEY = 'authtoken';
    static TOKEN_TIME_KEY = 'authtokentime';
    static TOKEN_TIME: number = 1000 * 60 * 60 * 24;

    private user: Observable<AppUser>;

    constructor(
        /** Angular */
        private router: Router,
        /** Modules */
        private alert: AlertService,
        private translationService: TranslationService,
        /** Services */
        private userApi: UserApi,
        private permission: PermissionService,
    ) {
        if (this.token) {
            this.login().subscribe(() => { }, error => {
                this.logout();
            });
        }
    }

    /**
     * getter method for token, handling local storage
     */
    get token(): string {
        const time = +localStorage.getItem(AuthenticationService.TOKEN_TIME_KEY);
        const token = localStorage.getItem(AuthenticationService.TOKEN_KEY);
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
     * setter method for token, handling local storage
     * @param {String} token
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
     * returns the observable for the user object
     */
    @Loading('getUser')
    public getUser(): Observable<any> {
        if (this.user) { return this.user; }
        this.logout();
        return Observable.throw('No User');
    }

    /**
     * checks if the current user is logged in
     */
    public isLoggedIn(): boolean {
        return !!this.user;
    }

    /**
     * gets the user with username & password, or token. updates the users permission on success
     * @param {String} [username]
     * @param {String} [password]
     */
    @Loading('login')
    public login(username?: string, password?: string): Observable<AppUser> {
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
     * logout the user
     */
    public logout(): void {
        this.token = null;
        this.user = null;
        this.permission.updateUserPermissions(this.user);
        this.router.navigate(['/login']);
    }

    /**
     * change the users password
     * @param {AppUser} user
     * @param {String} oldpassword
     * @param {String} newpassword
     */
    @Loading('changePassword')
    public changePassword(user: AppUser, oldpassword: string, newpassword: string): Observable<AppUser> {
        /** TODO */
        user.password = newpassword;
        return this.userApi.updateUserById(user.id, null, user);
    }

    /**
     * updates the users attributes
     * @param {AppUser} user
     */
    @Loading('updateUser')
    public updateUser(user: AppUser): Observable<AppUser> {
        this.user = this.userApi.updateUserById(user.id, null, user).map(result => {
            return this.permission.updateUserPermissions(result);
        }).publishReplay(1).refCount();
        return this.user;
    }

}
