/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import {
    AccessService,
    AccessAdmin,
    AccessEditForms,
    AccessEditRoles,
    AccessEditUsers,
    AccessEditConferences,
    AccessEditPermissions,
    AccessEditApplications,
    AccessReadUsers,
    AccessReadForms,
    AccessReadRoles,
    AccessReadConferences,
    AccessReadPermissions,
    AccessReadApplications
} from './access.service';

import { AuthenticationService, AuthenticationMock, PermissionService, PermissionMock } from './../';

describe('AuthGuard: ', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AccessService,
                AccessAdmin,
                AccessEditForms,
                AccessEditRoles,
                AccessEditUsers,
                AccessEditConferences,
                AccessEditPermissions,
                AccessEditApplications,
                AccessReadUsers,
                AccessReadForms,
                AccessReadRoles,
                AccessReadConferences,
                AccessReadPermissions,
                AccessReadApplications,

                { provide: AuthenticationService, useClass: AuthenticationMock },
                { provide: PermissionService, useClass: PermissionMock }
            ],
            imports: [
                RouterTestingModule.withRoutes([
                    { path: '', component: class { } },
                ])
            ]
        });
    });

    describe('AccessService', () => {
        it('should exist to protect a route', inject([AccessService], (service: AccessService) => {
            expect(service).toBeTruthy();
        }));
    });

    describe('AccessAdmin', () => {
        it('should exist to protect a route', inject([AccessAdmin], (service: AccessAdmin) => {
            expect(service).toBeTruthy();
        }));
    });

    describe('AccessEditForms', () => {
        it('should exist to protect a route', inject([AccessEditForms], (service: AccessEditForms) => {
            expect(service).toBeTruthy();
        }));
    });

    describe('AccessEditRoles', () => {
        it('should exist to protect a route', inject([AccessEditRoles], (service: AccessEditRoles) => {
            expect(service).toBeTruthy();
        }));
    });

    describe('AccessEditUsers', () => {
        it('should exist to protect a route', inject([AccessEditUsers], (service: AccessEditUsers) => {
            expect(service).toBeTruthy();
        }));
    });

    describe('AccessEditConferences', () => {
        it('should exist to protect a route', inject([AccessEditConferences], (service: AccessEditConferences) => {
            expect(service).toBeTruthy();
        }));
    });

    describe('AccessEditPermissions', () => {
        it('should exist to protect a route', inject([AccessEditPermissions], (service: AccessEditPermissions) => {
            expect(service).toBeTruthy();
        }));
    });

    describe('AccessEditApplications', () => {
        it('should exist to protect a route', inject([AccessEditApplications], (service: AccessEditApplications) => {
            expect(service).toBeTruthy();
        }));
    });

    describe('AccessReadUsers', () => {
        it('should exist to protect a route', inject([AccessReadUsers], (service: AccessReadUsers) => {
            expect(service).toBeTruthy();
        }));
    });

    describe('AccessReadForms', () => {
        it('should exist to protect a route', inject([AccessReadForms], (service: AccessReadForms) => {
            expect(service).toBeTruthy();
        }));
    });

    describe('AccessReadRoles', () => {
        it('should exist to protect a route', inject([AccessReadRoles], (service: AccessReadRoles) => {
            expect(service).toBeTruthy();
        }));
    });

    describe('AccessReadConferences', () => {
        it('should exist to protect a route', inject([AccessReadConferences], (service: AccessReadConferences) => {
            expect(service).toBeTruthy();
        }));
    });

    describe('AccessReadPermissions', () => {
        it('should exist to protect a route', inject([AccessReadPermissions], (service: AccessReadPermissions) => {
            expect(service).toBeTruthy();
        }));
    });

    describe('AccessReadApplications', () => {
        it('should exist to protect a route', inject([AccessReadApplications], (service: AccessReadApplications) => {
            expect(service).toBeTruthy();
        }));
    });
});
