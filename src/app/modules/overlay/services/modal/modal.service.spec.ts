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
import { RouterTestingModule } from '@angular/router/testing';

/** Services */
import { ModalService } from './modal.service';
import { TranslationProviderMock } from './../../../translation/translation.module';

describe('ModalService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ModalService,

                ...TranslationProviderMock
            ],
            imports: [
                RouterTestingModule.withRoutes([
                    { path: '', component: class { } },
                ])
            ]
        });
    });

    it('should ...', inject([ModalService], (service: ModalService) => {
        expect(service).toBeTruthy();
    }));
});
