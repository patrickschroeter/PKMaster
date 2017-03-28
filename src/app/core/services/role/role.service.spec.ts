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

/* tslint:disable:no-unused-variable */
import { TestBed, async, inject } from '@angular/core/testing';
import { RoleService } from './role.service';

import { RoleApiMock } from './../api';
import { RoleApi } from 'app/swagger';
import { AlertProviderMock } from 'app/modules/alert/alert.module';
import { TranslationProviderMock } from 'app/modules/translation/translation.module';

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
