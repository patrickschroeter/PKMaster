/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthenticationService } from './authentication.service';

import { CoreProviderMock } from './../../../core/core.module';
import { AlertProviderMock } from './../../../modules/alert/alert.module';

import { UserApi } from './../../../swagger';


describe('Service: Authentication', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AuthenticationService,

                { provide: Router, useClass: class { navigate() { }; } },
                ...CoreProviderMock,
                ...AlertProviderMock
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
