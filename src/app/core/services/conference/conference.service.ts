import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs/Rx';

import { AlertService } from './../../../modules/alert';

import { Conference } from './../../../swagger';
import { ConferenceApi } from './../../../swagger/api/ConferenceApi';

@Injectable()
export class ConferenceService {

    static DEFAULT_TOKEN = 17;

    private conference: Conference;
    private conferences: Conference[];

    constructor(
        private conferenceApi: ConferenceApi,
        private alert: AlertService
    ) { }

    /**
     * request the conference by the given id
     * @param {String} id
     */
    public getConferenceById(id: string): Observable<Conference> {
        return this.conferenceApi.getConferenceById(id).map(conference => {
            return this.conference = conference;
        });
    }

    /**
     * request all conferences
     */
    public getConferences(): Observable<Conference[]> {
        return this.conferenceApi.getConferences().map(conferences => {
            // TODO: sort
            return this.conferences = conferences;
        });
    }

    /**
     * create a new conference with the given values
     * @param {Conference} conference
     */
    public createNewConference(conference: Conference): Observable<Conference> {
        return this.conferenceApi.addConference(ConferenceService.DEFAULT_TOKEN, conference).map(result => {
            return this.conference = result;
        });
    }

    /**
     * save the given conference
     * @param {Conference} conference
     */
    public saveConference(conference: Conference) { }

}
