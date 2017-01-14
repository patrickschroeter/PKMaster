import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';

import { FormApiMock } from './';

import { Conference, Application } from './../../../swagger';

@Injectable()
export class ConferenceEndpoint {

    constructor() { }


    public addApplicationToConference (conferenceId: number, token?: number, application?: number, extraHttpRequestParams?: any ) : Observable<Conference> {
        return null;
    }

    public addConference (token?: number, conference?: Conference, extraHttpRequestParams?: any ) : Observable<Conference> {
        return null
    }

    public deleteApplicationOfConference (conferenceId: number, token?: number, application?: number, extraHttpRequestParams?: any ) : Observable<Conference> {
        return null;
    }

    public deleteConferenceById (conferenceId: number, token?: number, extraHttpRequestParams?: any ) : Observable<{}> {
        return null;
    }

    public getApplicationsByConference (conferenceId: number, token?: number, extraHttpRequestParams?: any ) : Observable<Array<Application>> {
        return null;
    }

    public getConferenceById (conferenceId: string, token?: number, extraHttpRequestParams?: any ) : Observable<Conference> {
        return null;
    }

    public getConferences (token?: number, filter?: string, sort?: string, extraHttpRequestParams?: any ) : Observable<Array<Conference>> {
        return null;
    }

    public updateConferenceById (conferenceId: number, token?: number, conference?: Conference, extraHttpRequestParams?: any ) : Observable<Conference> {
        return null;
    }

    /**
     * Mock Server
     */

    // tslint:disable-next-line:member-ordering
    private _list: Conference[] = [
        ConferenceApiMock.CONFERENCE
    ];

    private _conferences(): Conference[] {
        return JSON.parse(JSON.stringify(this._list));
    }

    private _conferenceAdd(conference: Conference): Conference {
        let id;
        if (!this._list.length) {
            id = 'Q';
        } else {
            id = this._list[this._list.length - 1].id + 'Q';
        }
        conference.id = id;
        conference.created = Date.now();
        this._list.push(conference);
        return JSON.parse(JSON.stringify(this._list[this._list.length - 1]));
    }

    private _conference(id?: string): Conference {
        let result;
        let list = this._list;
        for (let i = 0, length = list.length; i < length; i++) {
            if (list[i].id === id) {
                result = list[i];
            }
        }
        if (!result) { return null; }
        return JSON.parse(JSON.stringify(result));
    }

    private _conferenceUpdate(id: string, conference: Conference) {
        let list = this._list;
        for (let i = 0, length = list.length; i < length; i++) {
            if (list[i].id === id) {
                list[i] = conference;
                return JSON.parse(JSON.stringify(list[i]));
            }
        }
        return null;
    }

}
