import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { AlertService } from './../../../modules/alert';

import { Conference } from './../../../swagger';
import { ConferenceApi } from './../../../swagger/api/ConferenceApi';

@Injectable()
export class ConferenceService {

    private conference: Conference;
    private conferences: Conference[];

    constructor(
        private conferenceApi: ConferenceApi,
        private alert: AlertService
    ) { }

    public getConferenceById(id: string): Observable<Conference> {
        return this.conferenceApi.getConferenceById(id).map(conference => {
            return this.conference = conference;
        });
    }

    public getConferences(): Observable<Conference[]> {
        return this.conferenceApi.getConferences().map(conferences => {
            // TODO: sort
            return this.conferences = conferences;
        });
    }

    public createNewConference(conference: Conference) { }

    public saveConference(conference: Conference) { }

}
