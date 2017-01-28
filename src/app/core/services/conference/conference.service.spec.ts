/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

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

    describe('getConferenceById', () => {
        let service: ConferenceService;
        let api: ConferenceApi;

        beforeEach(inject([ConferenceService, ConferenceApi], (conferenceService: ConferenceService, conferenceApi: ConferenceApi) => {
            service = conferenceService;
            api = conferenceApi;
        }));

        it('should call the api', () => {
            spyOn(api, 'getConferenceById').and.returnValue(new Observable(obs => obs.next('id')));
            service.getConferenceById('1').subscribe();
            expect(api.getConferenceById).toHaveBeenCalled();
        });

        it('should return the conference with the given id', () => {
            service.getConferenceById('1').subscribe(conference => {
                expect(conference).toBeDefined();
                expect(conference.id).toEqual('1');
            });
        });

    });

    describe('getConferences', () => {
        let service: ConferenceService;
        let api: ConferenceApi;

        beforeEach(inject([ConferenceService, ConferenceApi], (conferenceService: ConferenceService, conferenceApi: ConferenceApi) => {
            service = conferenceService;
            api = conferenceApi;
        }));

        it('should call the api', () => {
            spyOn(api, 'getConferences').and.returnValue(new Observable(obs => obs.next('id')));
            service.getConferences().subscribe();
            expect(api.getConferences).toHaveBeenCalled();
        });

        it('should return a list of conferences', () => {
            service.getConferences().subscribe(conferences => {
                expect(conferences).toBeDefined();
                expect(conferences.length).toBeGreaterThan(0);
            });
        });

    });

    describe('createNewConference', () => {
        let service: ConferenceService;
        let api: ConferenceApi;

        beforeEach(inject([ConferenceService, ConferenceApi], (conferenceService: ConferenceService, conferenceApi: ConferenceApi) => {
            service = conferenceService;
            api = conferenceApi;
        }));

        it('should call the api', () => {
            spyOn(api, 'addConference').and.returnValue(new Observable(obs => obs.next('id')));
            service.createNewConference('id').subscribe();
            expect(api.addConference).toHaveBeenCalled();
        });

        it('should create a new conference', () => {
            service.createNewConference({ id: 'newid' }).subscribe(conference => {
                expect(conference).toBeDefined();
                expect(conference.id).toEqual('newid');
            });
        });

    });

    describe('saveConference', () => {
        let service: ConferenceService;

        beforeEach(inject([ConferenceService], (conferenceService: ConferenceService) => {
            service = conferenceService;
        }));

        it('should ...', () => {
            service.saveConference({ id: 'id' });
        });

    });
});
