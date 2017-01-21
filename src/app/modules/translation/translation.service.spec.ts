/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TranslationService } from './translation.service';

import { TRANSLATE, dictionary } from './dictionary';

describe('TranslationService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                TranslationService,
                { provide: TRANSLATE, useValue: dictionary }
            ]
        });
    });

    it('should ...', inject([TranslationService], (service: TranslationService) => {
        expect(service).toBeTruthy();
    }));
});
