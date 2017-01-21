/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ConferenceService } from './conference.service';

import { CoreProviderMock } from './../../../core/core.module';

import { AlertModule } from './../../../modules/alert/alert.module';

describe('ConferenceService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ConferenceService,

                ...CoreProviderMock
            ],
            imports: [
                AlertModule
            ]
        });
    });

    it('should ...', inject([ConferenceService], (service: ConferenceService) => {
        expect(service).toBeTruthy();
    }));
});
