/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observer, Observable } from 'rxjs/Rx';

import { AuthenticationService } from './authentication.service';

import { UserApiMock, PermissionMock, PermissionService } from './../../../core';
import { AlertProviderMock } from './../../../modules/alert/alert.module';
import { TranslationProviderMock } from './../../../modules/translation/translation.module';

import { UserApi } from './../../../swagger';


describe('Service: Authentication', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AuthenticationService,

                { provide: Router, useClass: class { navigate() { }; } },

                ...AlertProviderMock,
                ...TranslationProviderMock,
                { provide: PermissionService, useClass: PermissionMock },
                { provide: UserApi, useClass: UserApiMock }
            ],
            imports: [
                RouterTestingModule.withRoutes([
                    { path: '', component: class { } }
                ])
            ]
        });
    });

    it('should ...', inject([AuthenticationService], (service: AuthenticationService) => {
        expect(service).toBeTruthy();
    }));

    describe('get token', () => {
        let service: AuthenticationService;
        let token: string;

        beforeEach(inject([AuthenticationService], (authenticationService: AuthenticationService) => {
            service = authenticationService;
            token = 'token-spec';
            localStorage.clear();
        }));

        afterAll(() => {
            localStorage.clear();
        });

        it('should return null if no valid token exists', () => {
            localStorage.removeItem(AuthenticationService.TOKEN_KEY);
            localStorage.removeItem(AuthenticationService.TOKEN_TIME_KEY);
            expect(service.token).toBe(null);

            localStorage.setItem(AuthenticationService.TOKEN_KEY, token);
            expect(service.token).toBe(null);

            localStorage.setItem(AuthenticationService.TOKEN_TIME_KEY, Date.now().toString());
            expect(service.token).toBe(null);
        });

        it('should logout if no token is found', () => {
            spyOn(service, 'logout');
            localStorage.removeItem(AuthenticationService.TOKEN_KEY);
            let obj = service.token;
            expect(service.logout).toHaveBeenCalled();
        });

        it('should logout if no token timestamp is in the storage', () => {
            spyOn(service, 'logout');
            localStorage.setItem(AuthenticationService.TOKEN_KEY, token);
            localStorage.removeItem(AuthenticationService.TOKEN_TIME_KEY);
            let obj = service.token;
            expect(service.logout).toHaveBeenCalled();
        });

        it('should logout if token expired', () => {
            spyOn(service, 'logout');
            localStorage.setItem(AuthenticationService.TOKEN_KEY, token);
            localStorage.setItem(AuthenticationService.TOKEN_TIME_KEY, (Date.now() - 1000).toString());
            let obj = service.token;
            expect(service.logout).toHaveBeenCalled();
        });

        it('should return the token from local storage when valid timestamp', () => {
            localStorage.setItem(AuthenticationService.TOKEN_KEY, token);
            localStorage.setItem(AuthenticationService.TOKEN_TIME_KEY, (Date.now() + 1000).toString());
            expect(service.token).toEqual(token);
        });

        it('should update the token timestamp on local storage', () => {
            let time = Date.now() + 1000;

            localStorage.setItem(AuthenticationService.TOKEN_KEY, token);
            localStorage.setItem(AuthenticationService.TOKEN_TIME_KEY, (time).toString());

            let obj = service.token;

            expect(+localStorage.getItem(AuthenticationService.TOKEN_TIME_KEY)).toBeGreaterThan(time);
        });
    });

    describe('set token', () => {
        let service: AuthenticationService;
        let token: string;

        beforeEach(inject([AuthenticationService], (authenticationService: AuthenticationService) => {
            service = authenticationService;
            token = 'token-spec';
            localStorage.clear();
        }));

        afterAll(() => {
            localStorage.clear();
        });

        it('should save the token in the localStorage', () => {
            localStorage.removeItem(AuthenticationService.TOKEN_KEY);
            service.token = token;
            expect(localStorage.getItem(AuthenticationService.TOKEN_KEY)).toEqual(token);
        });

        it('should set a (new) expiration time for the token', () => {
            localStorage.removeItem(AuthenticationService.TOKEN_TIME_KEY);
            service.token = token;
            expect(localStorage.getItem(AuthenticationService.TOKEN_TIME_KEY)).toBeTruthy();
        });

        it('should remove the token (+ timestamp) if given token is null', () => {
            localStorage.setItem(AuthenticationService.TOKEN_KEY, token);
            localStorage.setItem(AuthenticationService.TOKEN_TIME_KEY, Date.now().toString());
            service.token = null;
            expect(localStorage.getItem(AuthenticationService.TOKEN_KEY)).toBeNull();
            expect(localStorage.getItem(AuthenticationService.TOKEN_TIME_KEY)).toBeNull();
        });

        it('should remove the token (+ timestamp) if given token is undefined', () => {
            localStorage.setItem(AuthenticationService.TOKEN_KEY, token);
            localStorage.setItem(AuthenticationService.TOKEN_TIME_KEY, Date.now().toString());
            service.token = undefined;
            expect(localStorage.getItem(AuthenticationService.TOKEN_KEY)).toBeNull();
            expect(localStorage.getItem(AuthenticationService.TOKEN_TIME_KEY)).toBeNull();
        });

        it('should remove the token (+ timestamp) if given token is \'\'', () => {
            localStorage.setItem(AuthenticationService.TOKEN_KEY, token);
            localStorage.setItem(AuthenticationService.TOKEN_TIME_KEY, Date.now().toString());
            service.token = '';
            expect(localStorage.getItem(AuthenticationService.TOKEN_KEY)).toBeNull();
            expect(localStorage.getItem(AuthenticationService.TOKEN_TIME_KEY)).toBeNull();
        });

    });

    describe('getUser', () => {
        let service: AuthenticationService;

        beforeEach(inject([AuthenticationService], (authenticationService: AuthenticationService) => {
            service = authenticationService;
        }));

        it('should logout if no user is available', () => {
            spyOn(service, 'logout');
            service.getUser();
            expect(service.logout).toHaveBeenCalled();
        });

        it('should throw an error if no user is available', () => {
            let name = 'user';
            let user;
            service.getUser().subscribe(() => {
                user = name;
            }, error => {
                user = error;
            });

            expect(user).not.toBe(name);
        });

        it('shoud return the user if available', () => {
            let name = 'user';
            service['user'] = new Observable((observer: Observer<any>) => {
                observer.next(name);
            });
            let user;
            service.getUser().subscribe(result => {
                user = result;
            });

            expect(user).toEqual(name);
        });

    });

    describe('isLoggedIn', () => {
        let service: AuthenticationService;

        beforeEach(inject([AuthenticationService], (authenticationService: AuthenticationService) => {
            service = authenticationService;
        }));

        it('should return false if no user object available', () => {
            expect(service.isLoggedIn()).toBe(false);
        });

        it('should return true if user object available', () => {
            service['user'] = new Observable();
            expect(service.isLoggedIn()).toBe(true);
        });

    });

    describe('login', () => {
        let service: AuthenticationService;

        beforeEach(inject([AuthenticationService], (authenticationService: AuthenticationService) => {
            service = authenticationService;
            service.logout();
        }));

        afterAll(() => {
            localStorage.clear();
        });

        it('should log the user in using username & password', () => {
            service.login('username', 'password');
            expect(service.isLoggedIn()).toBe(true);
        });

        it('should log the user in when no username or password but token and timestamp', () => {
            localStorage.setItem(AuthenticationService.TOKEN_KEY, 'token');
            localStorage.setItem(AuthenticationService.TOKEN_TIME_KEY, (Date.now() + 1000).toString());
            service.login();
            expect(service.isLoggedIn()).toBe(true);
        });

        it('should save the user on success', () => {
            let user;
            expect(service.getUser()).toEqual(Observable.throw('No User'));

            service.login('username', 'password');
            service.getUser().subscribe(response => {
                user = response;
            });
            expect(user).toBeTruthy();
        });

    });

    describe('logout', () => {
        let service: AuthenticationService;
        let router: Router;

        beforeEach(inject([AuthenticationService, Router], (authenticationService: AuthenticationService, routerService: Router) => {
            service = authenticationService;
            router = routerService;
            service.logout();
        }));

        afterAll(() => {
            localStorage.clear();
        });

        it('should redirect the user to login page', () => {
            spyOn(router, 'navigate');
            service.logout();
            expect(router.navigate).toHaveBeenCalled();
            expect(router.navigate).toHaveBeenCalledWith(['/login']);
        });

        it('should delet token & timestamp', () => {
            localStorage.setItem(AuthenticationService.TOKEN_KEY, 'token');
            localStorage.setItem(AuthenticationService.TOKEN_TIME_KEY, Date.now().toString());
            service.logout();
            expect(localStorage.getItem(AuthenticationService.TOKEN_KEY)).toBeNull();
            expect(localStorage.getItem(AuthenticationService.TOKEN_TIME_KEY)).toBeNull();
        });

        it('should reset the user', () => {
            service.login('username', 'password');
            expect(service.getUser()).toBeTruthy();
            service.logout();
            expect(service.getUser()).toEqual(Observable.throw('No User'));
        });
    });

    describe('changePassword', () => {
        let service: AuthenticationService;
        let api: UserApi;

        beforeEach(inject([AuthenticationService, UserApi], (authenticationService: AuthenticationService, userApi: UserApi) => {
            service = authenticationService;
            api = userApi;
            service.logout();
        }));

        it('should call the UserApi with the user and the password', () => {
            const user = { id: 'user' };
            const password = 'password';
            const newpassword = 'newpassword';
            spyOn(api, 'updateUserById').and.callThrough();
            service.changePassword(user, password, newpassword).subscribe();
            expect(api.updateUserById).toHaveBeenCalled();
        });

    });

    describe('changePassword', () => {
        let service: AuthenticationService;

        beforeEach(inject([AuthenticationService], (authenticationService: AuthenticationService) => {
            service = authenticationService;
            service.logout();
        }));

        it('should update the user', () => {
            expect(service.getUser()).toEqual(Observable.throw('No User'));
            service.updateUser({ id: 'user' });
            expect(service.getUser()).not.toEqual(Observable.throw('No User'));
        });

    });
});
