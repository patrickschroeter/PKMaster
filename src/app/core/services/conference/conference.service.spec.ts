/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ConferenceService } from './conference.service';

import { ConferenceApiMock } from './../../../core';
import { ConferenceApi } from './../../../swagger';

import { AlertModule } from './../../../modules/alert/alert.module';

describe('ConferenceService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ConferenceService,

                { provide: ConferenceApi, useClass: ConferenceApiMock }
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
