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

import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import {
    AccessMain,
    AccessAdmin,
    AccessForms,
    AccessRoles,
    AccessUsers,
    AccessFormsEdit,
    AccessRolesEdit,
    AccessUsersEdit,
    AccessPermissions,
    AccessApplications,
    AccessConferencesEdit,
    AccessApplicationsEdit,
    AccessConferencesDetail
} from './access.service';

import { AuthenticationService, AuthenticationMock, PermissionService, PermissionMock } from './../';

describe('AuthGuard: ', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AccessMain,
                AccessAdmin,
                AccessForms,
                AccessRoles,
                AccessUsers,
                AccessFormsEdit,
                AccessRolesEdit,
                AccessUsersEdit,
                AccessPermissions,
                AccessApplications,
                AccessConferencesEdit,
                AccessApplicationsEdit,
                AccessConferencesDetail,

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

    describe('AccessMain', () => {
        it('should exist to protect a route', inject([AccessMain], (service: AccessMain) => {
            expect(service).toBeTruthy();
        }));
    });

    describe('AccessAdmin', () => {
        it('should exist to protect a route', inject([AccessAdmin], (service: AccessAdmin) => {
            expect(service).toBeTruthy();
        }));
    });

    describe('AccessForms', () => {
        it('should exist to protect a route', inject([AccessForms], (service: AccessForms) => {
            expect(service).toBeTruthy();
        }));
    });

    describe('AccessRoles', () => {
        it('should exist to protect a route', inject([AccessRoles], (service: AccessRoles) => {
            expect(service).toBeTruthy();
        }));
    });

    describe('AccessUsers', () => {
        it('should exist to protect a route', inject([AccessUsers], (service: AccessUsers) => {
            expect(service).toBeTruthy();
        }));
    });

    describe('AccessFormsEdit', () => {
        it('should exist to protect a route', inject([AccessFormsEdit], (service: AccessFormsEdit) => {
            expect(service).toBeTruthy();
        }));
    });

    describe('AccessRolesEdit', () => {
        it('should exist to protect a route', inject([AccessRolesEdit], (service: AccessRolesEdit) => {
            expect(service).toBeTruthy();
        }));
    });

    describe('AccessUsersEdit', () => {
        it('should exist to protect a route', inject([AccessUsersEdit], (service: AccessUsersEdit) => {
            expect(service).toBeTruthy();
        }));
    });

    describe('AccessPermissions', () => {
        it('should exist to protect a route', inject([AccessPermissions], (service: AccessPermissions) => {
            expect(service).toBeTruthy();
        }));
    });

    describe('AccessApplications', () => {
        it('should exist to protect a route', inject([AccessApplications], (service: AccessApplications) => {
            expect(service).toBeTruthy();
        }));
    });

    describe('AccessConferencesEdit', () => {
        it('should exist to protect a route', inject([AccessConferencesEdit], (service: AccessConferencesEdit) => {
            expect(service).toBeTruthy();
        }));
    });

    describe('AccessApplicationsEdit', () => {
        it('should exist to protect a route', inject([AccessApplicationsEdit], (service: AccessApplicationsEdit) => {
            expect(service).toBeTruthy();
        }));
    });

    describe('AccessConferencesDetail', () => {
        it('should exist to protect a route', inject([AccessConferencesDetail], (service: AccessConferencesDetail) => {
            expect(service).toBeTruthy();
        }));
    });
});
