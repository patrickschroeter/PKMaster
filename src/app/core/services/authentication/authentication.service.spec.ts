/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthenticationService } from './authentication.service';

import { UserApiMock } from './../../../core';
import { UserApi } from './../../../swagger';
import { AlertService, AlertMock } from './../../../modules/alert';


describe('Service: Authentication', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AuthenticationService,

                { provide: Router, useClass: class { navigate() { }; } },
                { provide: UserApi, useClass: UserApiMock },
                { provide: AlertService, useClass: AlertMock }
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

    it('should provide the user object', () => { });
    it('should navigate to login if no user is stored', () => { });
    it('should return the user observable', () => { });
    it('should change the password', () => { });
});
