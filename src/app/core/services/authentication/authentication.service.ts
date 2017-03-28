/**
 *
 * @author Patrick Schröter <patrick.schroeter@hotmail.de>
 *
 * @license CreativeCommons BY-NC-SA 4.0 2017
 *
 * This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/.
 *
 */

import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Observer, Subject } from 'rxjs/Rx';

/** Services */
import { PermissionService } from './../permission/permission.service';
import { AlertService } from 'app/modules/alert';
import { TranslationService } from 'app/modules/translation';
import { UserApi } from 'app/swagger/api/UserApi';
import { ConfigurationService } from './../';

/** TODO */
import { UserApiMock } from 'app/core';

/** Models */
import { UserDetailDto, UserCreateDto } from 'app/swagger';

/** Decorators */
import { Loading } from 'app/shared/decorators/loading.decorator';

/**
 * A Service taking care of the user beeing logged in
 *
 * @export
 * @class AuthenticationService
 */
@Injectable()
export class AuthenticationService {

    static TOKEN_KEY = 'authtoken';
    static TOKEN_TIME_KEY = 'authtokentime';

    private expiration = 0;

    private user: Observable<UserDetailDto>;

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
        private configurationService: ConfigurationService
    ) {
        if (this.token) {
            this.login().subscribe(() => { }, error => {
                this.logout();
            });
            // console.log(this.login());
        }
    }

    /**
     * getter method for token, handling local storage
     *
     * @readonly
     * @type {String}
     * @memberOf AuthenticationService
     */
    get token(): string {
        const time = +localStorage.getItem(AuthenticationService.TOKEN_TIME_KEY);
        const token = localStorage.getItem(AuthenticationService.TOKEN_KEY);
        if (!token) {
            this.logout();
            return null;
        } else if (time >= Date.now()) {
            // TODO refresh token
            // localStorage.setItem(AuthenticationService.TOKEN_TIME_KEY, (Date.now() + 120000000).toString());
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
     * @memberOf AuthenticationService
     */
    set token(token: string) {
        if (!token) {
            localStorage.removeItem(AuthenticationService.TOKEN_KEY);
            localStorage.removeItem(AuthenticationService.TOKEN_TIME_KEY);
            return;
        }
        localStorage.setItem(AuthenticationService.TOKEN_TIME_KEY, (Date.now() + this.expiration).toString());
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
        return new Observable((observer: Observer<any>) => {
            observer.complete();
        });
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
     * @param {String} [username]
     * @param {String} [password]
     * @returns {Observable<AppUser>}
     *
     * @memberOf AuthenticationService
     */
    @Loading('login')
    public login(username?: string, password?: string): Observable<UserDetailDto> {
        if (username && password) {
            this.user = this.userApi.login(username, password).flatMap(bearer => {
                this.expiration = (bearer.expires_in / 3) * 60 * 1000;
                this.token = `${bearer.token_type} ${bearer.access_token}`;

                return this.setUser();
            });

            return this.user;
        } else {
            // the returned user observable
            return this.setUser();
        }
    }

    /**
     * set the user observable using cache
     *
     * @private
     * @returns {Observable<UserDetailDto>}
     *
     * @memberOf AuthenticationService
     */
    private setUser(): Observable<UserDetailDto> {
        this.user = this.userApi.getCurrentUser()
            .map((result: UserDetailDto) => {
                if (!result) { return null; }
                const user = result;
                user.permissions = user.permissions.length ? user.permissions : UserApiMock.getUserByEmail(user.email).permissions;
                return this.permission.updateUserPermissions(user);
            })
            .publishReplay(1).refCount();
        return this.user;
    }


    /**
     * logout the user
     *
     * @memberOf AuthenticationService
     */
    public logout(): void {
        this.token = null;
        if (this.user) {
            this.user.subscribe((result: UserDetailDto) => {
                this.permission.updateUserPermissions(result);
                this.user = null;
            }, error => {
                console.error(error);
            });
        }
        this.router.navigate(['/login']);
    }

    /**
     * change the users password
     *
     * @param {AppUser} user
     * @param {String} oldpassword
     * @param {String} newpassword
     * @returns {Observable<AppUser>}
     *
     * @memberOf AuthenticationService
     */
    @Loading('changePassword')
    public changePassword(user: UserDetailDto, oldpassword: string, newpassword: string): Observable<UserDetailDto> {
        /** TODO */
        (user as UserCreateDto).password = newpassword;
        return this.userApi.updateUserById(user.id, user);
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
    public updateUser(user: UserDetailDto): Observable<UserDetailDto> {
        this.user = this.userApi.updateUserById(user.id, user).map(result => {
            return this.permission.updateUserPermissions(result);
        }).publishReplay(1).refCount();
        return this.user;
    }

}
