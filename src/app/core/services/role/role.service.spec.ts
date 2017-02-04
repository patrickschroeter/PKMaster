/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RoleService } from './role.service';

import { RoleApiMock } from './../api';
import { RoleApi } from './../../../swagger';
import { AlertProviderMock } from './../../../modules/alert/alert.module';
import { TranslationProviderMock } from './../../../modules/translation/translation.module';

describe('RoleService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                RoleService,

                { provide: RoleApi, useClass: RoleApiMock },

                ...AlertProviderMock,
                ...TranslationProviderMock
            ]
        });
    });

    it('should ...', inject([RoleService], (service: RoleService) => {
        expect(service).toBeTruthy();
    }));
});
