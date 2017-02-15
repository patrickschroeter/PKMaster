/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Injectable } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { Access } from './access.decorator';

import { TranslationProviderMock } from './../../modules/translation/translation.module';
import { AlertService } from './../../modules/alert';
import { PermissionService, PermissionMock } from './../../core';

import { PermissionEndpoint } from './../../core/services/api/PermissionEndpoint';
import { PermissionApiMock } from './../../core/services/api/PermissionApi.mock';

@Injectable()
class TestService {
    constructor(private permission: PermissionService, private alert: AlertService) {}

    @Access('ReadPermissions') public denied(param: any) { return param; }
    @Access('') public granted(param: any) { return param; }
}

describe('Decorator: Access', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                TestService,
                PermissionService,
                AlertService,

                { provide: PermissionEndpoint, useClass: PermissionApiMock },

                ...TranslationProviderMock
            ]
        });
    }));

    it('should create', inject([TestService], (service: TestService) => {
        expect(service).toBeTruthy();
    }));

    it('should call the function if the user has the given permissions', inject([TestService], (service: TestService) => {
        const param = 'test';
        expect(service.granted(param)).toEqual(param);
    }));

    it('should block the function if the user has not the given permissions',
        inject([TestService, AlertService], (service: TestService, alert: AlertService) => {
            const param = 'test';
            spyOn(console, 'error');
            spyOn(alert, 'setErrorHint');
            expect(service.denied(param)).toBeUndefined();
            expect(console.error).toHaveBeenCalledWith('Permission Denied');
            expect(alert.setErrorHint).toHaveBeenCalled();
        }
    ));

    it('should log an error if no PermissionService is available', inject([TestService], (service: TestService) => {
        service['permission'] = (new PermissionMock() as any);
        spyOn(console, 'error');
        expect(service.denied('')).toBeUndefined();
        expect(console.error).toHaveBeenCalledWith('Required Permissions couldn\'t be determined. PermissionService missing');
    }));
});
