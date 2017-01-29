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
                ModalService
            ],
            imports: [
                ...TranslationProviderMock,
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
