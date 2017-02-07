import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Observer } from 'rxjs/Rx';

/** Services */
import { PermissionService } from './../permission/permission.service';
import { AlertService } from './../../../modules/alert';
import { TranslationService } from './../../../modules/translation';
import { UserApi } from './../../../swagger/api/UserApi';

/** TODO */
import { UserApiMock } from './../../../core';

/** Models */
import { AppUser } from './../../../swagger';

/** Decorators */
import { Loading } from './../../../shared/decorators/loading.decorator';

/**
 *
 *
 * @export
 * @class AuthenticationService
 */
@Injectable()
export class AuthenticationService {

    /**
     * localStorage key for token
     *
     * @static
     *
     * @memberOf AuthenticationService
     */
    static TOKEN_KEY = 'authtoken';

    /**
     * localStorage key for token expiration time
     *
     * @static
     *
     * @memberOf AuthenticationService
     */
    static TOKEN_TIME_KEY = 'authtokentime';

    /**
     * time the token is valid
     *
     * @static
     * @type {number}
     * @memberOf AuthenticationService
     */
    static TOKEN_TIME: number = 1000 * 60 * 60 * 24;

    /**
     * the user observable
     *
     * @private
     * @type {Observable<AppUser>}
     * @memberOf AuthenticationService
     */
    private user: Observable<AppUser>;

    /**
     * static function to get the token from localStorage
     *
     * @static
     * @returns
     *
     * @memberOf AuthenticationService
     */
    static getStaticToken() {
        return localStorage.getItem(AuthenticationService.TOKEN_KEY);
    }

    /**
     * Creates an instance of AuthenticationService.
     *
     * @param {Router} router
     * @param {AlertService} alert
     * @param {TranslationService} translationService
     * @param {UserApi} userApi
     * @param {PermissionService} permission
     *
     * @memberOf AuthenticationService
     */
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
     *
     * @readonly
     * @type {string}
     * @memberOf AuthenticationService
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
     *
     *
     * @memberOf AuthenticationService
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
     *
     * @returns {Observable<any>}
     *
     * @memberOf AuthenticationService
     */
    @Loading('getUser')
    public getUser(): Observable<any> {
        if (this.user) { return this.user; }
        this.logout();
        return Observable.throw('No User');
    }

    /**
     * checks if the current user is logged in
     *
     * @returns {Boolean}
     *
     * @memberOf AuthenticationService
     */
    public isLoggedIn(): Boolean {
        return !!this.user;
    }

    /**
     * gets the user with username & password, or token. updates the users permission on success
     *
     * @param {string} [username]
     * @param {string} [password]
     * @returns {Observable<AppUser>}
     *
     * @memberOf AuthenticationService
     */
    @Loading('login')
    public login(username?: string, password?: string): Observable<AppUser> {
        if (username && password) {
            let observer;
            this.user = new Observable((obs: Observer<any>) => {
                observer = obs;
            }).map(result => {
              return this.permission.updateUserPermissions(UserApiMock.USERS[0]);
            }).publishReplay(1).refCount();

            this.userApi.login(username, password).subscribe(bearer => {
                this.token = `${bearer.token_type} ${bearer.access_token}`;

                this.publishCurrentUser(observer);

            }, error => {
                observer.error(error);
            });

            return this.user;
        } else {
            this.user = new Observable((observer: Observer<any>) => {
                this.publishCurrentUser(observer);
            }).map(result => {
              return this.permission.updateUserPermissions(UserApiMock.USERS[0]);
            }).publishReplay(1).refCount();

            return this.user;
        }
    }

    /**
     * publishes the current user to the given observer
     *
     * @private
     * @param {Observer<any>} observer
     *
     * @memberOf AuthenticationService
     */
    private publishCurrentUser(observer: Observer<any>) {
        this.userApi.getCurrentUser().subscribe(result => {
            observer.next(result);
            observer.complete();
        }, error => {
            observer.error(error);
            observer.complete();
        });
    }

    /**
     * logout the user
     *
     *
     * @memberOf AuthenticationService
     */
    public logout(): void {
        this.token = null;
        this.user = null;
        this.permission.updateUserPermissions(this.user);
        this.router.navigate(['/login']);
    }

    /**
     * change the users password
     *
     * @param {AppUser} user
     * @param {string} oldpassword
     * @param {string} newpassword
     * @returns {Observable<AppUser>}
     *
     * @memberOf AuthenticationService
     */
    @Loading('changePassword')
    public changePassword(user: AppUser, oldpassword: string, newpassword: string): Observable<AppUser> {
        /** TODO */
        user.password = newpassword;
        return this.userApi.updateUserById(user.id, null, user);
    }

    /**
     * updates the users attributes
     *
     * @param {AppUser} user
     * @returns {Observable<AppUser>}
     *
     * @memberOf AuthenticationService
     */
    @Loading('updateUser')
    public updateUser(user: AppUser): Observable<AppUser> {
        this.user = this.userApi.updateUserById(user.id, null, user).map(result => {
            return this.permission.updateUserPermissions(result);
        }).publishReplay(1).refCount();
        return this.user;
    }

}
