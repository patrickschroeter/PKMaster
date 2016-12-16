/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PermissionService } from './permission.service';

import { UserApiMock as API } from './../api/UserApi.mock';

describe('PermissionService', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                PermissionService
            ]
        });
    });

    it('should ...', inject([PermissionService], (service: PermissionService) => {
        expect(service).toBeTruthy();
    }));

    describe('updateUserPermissions', () => {
        let service: PermissionService;

        beforeEach(inject( [PermissionService], (permissionService: PermissionService) => {
            service = permissionService;
        }));

        it('should return the input user', () => {
            expect(service.updateUserPermissions(API.USER)).toEqual(API.USER);
            expect(service.updateUserPermissions(API.USER)).toBe(API.USER);

            expect(service.updateUserPermissions({})).toEqual({});
            expect(service.updateUserPermissions(null)).toEqual(null);
            expect(service.updateUserPermissions(undefined)).toEqual(undefined);
        });

        it('should update the permission with the users one', () => {
            expect(service.permissions).toBeUndefined();
            service.updateUserPermissions(API.USER);
            expect(service.permissions).toEqual(API.USER.permissions);
        });

        it('should set the permission to [] if no user given', () => {
            service.updateUserPermissions(null);
            expect(service.permissions).toEqual([]);

            service.updateUserPermissions(undefined);
            expect(service.permissions).toEqual([]);

            service.updateUserPermissions();
            expect(service.permissions).toEqual([]);
        });

        it('should set the permission to [] if the user has no rights', () => {
            service.updateUserPermissions({});
            expect(service.permissions).toEqual([]);
        });
    });

    describe('hasPermission', () => {
        let service: PermissionService;

        beforeEach(inject( [PermissionService], (permissionService: PermissionService) => {
            service = permissionService;
        }));

        it('should return true if the permission is in permissions', () => {
            service.permissions = API.PERMISSIONS.PARTIAL;
            expect(service.hasPermission(API.PERMISSION.READAPPLICATIONS)).toBe(true);
            expect(service.hasPermission(API.PERMISSION.READPERMISSIONS)).toBe(true);
        });

        it('should return false if the permission is not in permissions', () => {
            service.permissions = API.PERMISSIONS.PARTIAL;
            expect(service.hasPermission(API.PERMISSION.READFORMS)).toBe(false);
        });

        it('should return false if no permission is given', () => {
            service.permissions = API.PERMISSIONS.PARTIAL;
            expect(service.hasPermission(null)).toBe(false);
            expect(service.hasPermission(undefined)).toBe(false);
            expect(service.hasPermission('')).toBe(false);
        });

        it('should return false if no permissions are set', () => {
            service.permissions = undefined;
            expect(service.hasPermission(API.PERMISSION.READAPPLICATIONS)).toBe(false);

            service.permissions = null;
            expect(service.hasPermission(API.PERMISSION.READPERMISSIONS)).toBe(false);

            service.permissions = [];
            expect(service.hasPermission(API.PERMISSION.READPERMISSIONS)).toBe(false);
        });
    });

    describe('hasAllPermissions', () => {
        let service: PermissionService;

        beforeEach(inject([PermissionService], (permissionService: PermissionService) => {
            service = permissionService;
        }));

        describe('should return true if the permissions are in permissions', () => {

            beforeEach(() => {
                service.permissions = API.PERMISSIONS.ALL;
            });

            it('(all elements in the same order)', () => {
                expect(service.hasAllPermissions([
                    API.PERMISSION.CREATEAPPLICATIONS,
                    API.PERMISSION.CREATEFORMS,
                    API.PERMISSION.EDITPERMISSIONS,
                    API.PERMISSION.READAPPLICATIONS,
                    API.PERMISSION.READFORMS,
                    API.PERMISSION.READPERMISSIONS
                ])).toBe(true);
            });

            it('(all elements in different order)', () => {
                expect(service.hasAllPermissions([
                    API.PERMISSION.READAPPLICATIONS,
                    API.PERMISSION.CREATEFORMS,
                    API.PERMISSION.READFORMS,
                    API.PERMISSION.EDITPERMISSIONS,
                    API.PERMISSION.CREATEAPPLICATIONS,
                    API.PERMISSION.READPERMISSIONS
                ])).toBe(true);
            });

            it('(some elements)', () => {
                expect(service.hasAllPermissions([
                    API.PERMISSION.EDITPERMISSIONS,
                    API.PERMISSION.READFORMS
                ])).toBe(true);
            });

            it('(doubled elements)', () => {
                expect(service.hasAllPermissions([
                    API.PERMISSION.CREATEAPPLICATIONS, API.PERMISSION.CREATEAPPLICATIONS
                ])).toBe(true);
            });
        });

        describe('should return false if the permissions are not in permissions', () => {

            beforeEach(() => {
                service.permissions = API.PERMISSIONS.ALL;
            });

            it('(all elements plus extra)', () => {
                expect(service.hasAllPermissions([
                    API.PERMISSION.READAPPLICATIONS,
                    API.PERMISSION.CREATEFORMS,
                    API.PERMISSION.READFORMS,
                    API.PERMISSION.EDITPERMISSIONS,
                    API.PERMISSION.CREATEAPPLICATIONS,
                    API.PERMISSION.READPERMISSIONS,
                    'extra'
                ])).toBe(false);
            });

            it('(some elements plus extra)', () => {
                expect(service.hasAllPermissions([
                    API.PERMISSION.EDITPERMISSIONS,
                    API.PERMISSION.READFORMS,
                    'extra'
                ])).toBe(false);
            });

            it('(only one extra)', () => {
                expect(service.hasAllPermissions([
                    'extra'
                ])).toBe(false);
            });

            it('(doubled elements)', () => {
                expect(service.hasAllPermissions([
                    API.PERMISSION.CREATEAPPLICATIONS, API.PERMISSION.CREATEAPPLICATIONS,
                    'extra',
                    'extra'
                ])).toBe(false);
            });
        });
        it('should return false if no permissions are given', () => {
            expect(service.hasAllPermissions(null)).toBe(false);
            expect(service.hasAllPermissions(undefined)).toBe(false);
            expect(service.hasAllPermissions([])).toBe(false);
        });
        it('should return false if no permissions are set', () => {
            service.permissions = undefined;
            expect(service.hasAllPermissions([
                API.PERMISSION.EDITPERMISSIONS,
                API.PERMISSION.READFORMS
            ])).toBe(false);

            service.permissions = null;
            expect(service.hasAllPermissions([
                API.PERMISSION.EDITPERMISSIONS,
                API.PERMISSION.READFORMS
            ])).toBe(false);

            service.permissions = [];
            expect(service.hasAllPermissions([
                API.PERMISSION.EDITPERMISSIONS,
                API.PERMISSION.READFORMS
            ])).toBe(false);
        });
    });
});
