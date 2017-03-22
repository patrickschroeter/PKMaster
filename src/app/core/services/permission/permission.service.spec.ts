/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PermissionService } from './permission.service';

import { PermissionEndpoint } from './../api/PermissionEndpoint';

import { PermissionApiMock as PERM } from './../api/PermissionApi.mock';
import { RoleApiMock as ROLE } from './../api/RoleApi.mock';
import { UserApiMock as USER } from './../api/UserApi.mock';

import { AlertProviderMock } from 'app/modules/alert/alert.module';
import { TranslationProviderMock } from 'app/modules/translation/translation.module';

describe('PermissionService', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                PermissionService,

                { provide: PermissionEndpoint, useClass: PERM },

                ...AlertProviderMock,
                ...TranslationProviderMock
            ]
        });
    });

    it('should ...', inject([PermissionService], (service: PermissionService) => {
        expect(service).toBeTruthy();
    }));

    describe('updateUserPermissions', () => {
        let service: PermissionService;

        beforeEach(inject([PermissionService], (permissionService: PermissionService) => {
            service = permissionService;
        }));

        it('should return the input user', () => {
            expect(service.updateUserPermissions(USER.USER)).toEqual(USER.USER);
            expect(service.updateUserPermissions(USER.USER)).toBe(USER.USER);

            expect(service.updateUserPermissions({} as any)).toEqual({});
            expect(service.updateUserPermissions(null)).toEqual(null);
            expect(service.updateUserPermissions(undefined)).toEqual(undefined);
        });

        it('should update the permission with the users one', () => {
            expect(service.permissions).toBeUndefined();
            service.updateUserPermissions(USER.USER);
            expect(service.permissions).toEqual(USER.USER.permissions);
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
            service.updateUserPermissions({} as any);
            expect(service.permissions).toEqual([]);
        });
    });

    describe('hasPermission', () => {
        let service: PermissionService;

        beforeEach(inject([PermissionService], (permissionService: PermissionService) => {
            service = permissionService;
        }));

        /**
         * No Permissions
         */

        describe('(no permission input)', () => {
            beforeEach(() => { service.permissions = ROLE.ROLE.Admin; });
            it('should return true if input is null', () => {
                expect(service.hasPermission(null)).toBe(true);
            });
            it('should return true if input is undefined', () => {
                expect(service.hasPermission(undefined)).toBe(true);
            });
            it('should return true if input is empty string', () => {
                expect(service.hasPermission('')).toBe(true);
            });
            it('should return true if input is empty array (and)', () => {
                expect(service.hasPermission([])).toBe(true);
            });
            it('should return true if input is empty array (or)', () => {
                expect(service.hasPermission([], true)).toBe(true);
            });
        });

        describe('(no user permission)', () => {
            it('should return false if permissions is null', () => {
                service.permissions = undefined;
                expect(service.hasPermission(PERM.PERMISSION.Application.Read)).toBe(false);
                expect(service.hasPermission([PERM.PERMISSION.Permission.Edit, PERM.PERMISSION.Forms.Read])).toBe(false);
                expect(service.hasPermission([PERM.PERMISSION.Permission.Edit, PERM.PERMISSION.Forms.Read], true)).toBe(false);
            });
            it('should return false if permissions is undefined', () => {
                service.permissions = null;
                expect(service.hasPermission(PERM.PERMISSION.Permission.Read)).toBe(false);
                expect(service.hasPermission([PERM.PERMISSION.Permission.Read, PERM.PERMISSION.Forms.Read])).toBe(false);
                expect(service.hasPermission([PERM.PERMISSION.Permission.Read, PERM.PERMISSION.Forms.Read], true)).toBe(false);

            });
            it('should return false if permissions is empty array', () => {
                service.permissions = [];
                expect(service.hasPermission(PERM.PERMISSION.Permission.Read)).toBe(false);
                expect(service.hasPermission([PERM.PERMISSION.Permission.Read, PERM.PERMISSION.Forms.Read])).toBe(false);
                expect(service.hasPermission([PERM.PERMISSION.Permission.Read, PERM.PERMISSION.Forms.Read], true)).toBe(false);
            });
        });

        /**
         * One Permission
         */

        it('should return true if the permission is in permissions', () => {
            service.permissions = ROLE.ROLE.Admin;
            expect(service.hasPermission(PERM.PERMISSION.Roles.Read)).toBe(true);
            expect(service.hasPermission(PERM.PERMISSION.Permission.Read)).toBe(true);
        });

        it('should return false if the permission is not in permissions', () => {
            service.permissions = ROLE.ROLE.Admin;
            expect(service.hasPermission(PERM.PERMISSION.Forms.Read)).toBe(false);
        });

        /**
         * Many Permissions (and)
         */

        describe('should return true if the permissions are in permissions', () => {

            beforeEach(() => {
                service.permissions = ROLE.ROLE.All;
            });

            it('(all elements in the same order)', () => {
                expect(service.hasPermission([
                    PERM.PERMISSION.Application.Edit,
                    PERM.PERMISSION.Forms.Read,
                    PERM.PERMISSION.Permission.Read,
                    PERM.PERMISSION.Application.Read,
                    PERM.PERMISSION.Forms.Read,
                    PERM.PERMISSION.Permission.Read
                ])).toBe(true);
            });

            it('(all elements in different order)', () => {
                expect(service.hasPermission([
                    PERM.PERMISSION.Application.Read,
                    PERM.PERMISSION.Forms.Read,
                    PERM.PERMISSION.Forms.Read,
                    PERM.PERMISSION.Permission.Read,
                    PERM.PERMISSION.Application.Edit,
                    PERM.PERMISSION.Permission.Read
                ])).toBe(true);
            });

            it('(some elements)', () => {
                expect(service.hasPermission([
                    PERM.PERMISSION.Permission.Read,
                    PERM.PERMISSION.Forms.Read
                ])).toBe(true);
            });

            it('(doubled elements)', () => {
                expect(service.hasPermission([
                    PERM.PERMISSION.Application.Edit, PERM.PERMISSION.Application.Edit
                ])).toBe(true);
            });
        });

        describe('should return false if the permissions are not in permissions', () => {

            beforeEach(() => {
                service.permissions = ROLE.ROLE.All;
            });

            it('(all elements plus extra)', () => {
                expect(service.hasPermission([
                    PERM.PERMISSION.Application.Read,
                    PERM.PERMISSION.Forms.Read,
                    PERM.PERMISSION.Forms.Read,
                    PERM.PERMISSION.Permission.Read,
                    PERM.PERMISSION.Application.Edit,
                    PERM.PERMISSION.Permission.Read,
                    'extra'
                ])).toBe(false);
            });

            it('(some elements plus extra)', () => {
                expect(service.hasPermission([
                    PERM.PERMISSION.Permission.Read,
                    PERM.PERMISSION.Forms.Read,
                    'extra'
                ])).toBe(false);
            });

            it('(only one extra)', () => {
                expect(service.hasPermission([
                    'extra'
                ])).toBe(false);
            });

            it('(doubled elements)', () => {
                expect(service.hasPermission([
                    PERM.PERMISSION.Application.Edit, PERM.PERMISSION.Application.Edit,
                    'extra',
                    'extra'
                ])).toBe(false);
            });
        });

        /**
         * Many Permissions (or)
         */

        describe('(or)', () => {

            beforeEach(() => {
                service.permissions = ROLE.ROLE.Admin;
            });

            it('should return true if the input string is in the permissions', () => {
                expect(service.hasPermission(PERM.PERMISSION.Permission.Read, true)).toBe(true);
            });

            it('should return true if one of the input strings is in the permissions', () => {
                expect(service.hasPermission([PERM.PERMISSION.Permission.Read], true)).toBe(true);
                expect(service.hasPermission([PERM.PERMISSION.Roles.Edit, PERM.PERMISSION.Permission.Read], true)).toBe(true);
            });

            it('should return false if the input string is not in the permissions', () => {
                expect(service.hasPermission(PERM.PERMISSION.Application.Edit, true)).toBe(false);
            });

            it('should return false if none of the input strings is in the permissios', () => {
                expect(service.hasPermission([PERM.PERMISSION.Application.Edit, PERM.PERMISSION.Forms.Read], true)).toBe(false);
            });
        });
    });
});
