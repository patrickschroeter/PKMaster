/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserService } from './user.service';

import { UserApi } from './../../../swagger';
import { UserApiMock } from './../';

import { AlertProviderMock } from 'app/modules/alert/alert.module';
import { TranslationProviderMock } from 'app/modules/translation/translation.module';

describe('UserService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                UserService,

                { provide: UserApi, useClass: UserApiMock },

                ...AlertProviderMock,
                ...TranslationProviderMock
            ]
        });
    });

    it('should ...', inject([UserService], (service: UserService) => {
        expect(service).toBeTruthy();
    }));
});
