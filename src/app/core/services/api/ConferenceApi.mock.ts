// tslint:disable:max-line-length
// tslint:disable:no-unused-variable

import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs/Rx';

import { Conference } from './../../../swagger';

import { ApplicationApiMock } from './';

@Injectable()
export class ConferenceApiMock {

    static CONFERENCE: Conference = { id: '1', description: 'Abschlusssitzung Winter 2016/2017', dateOfEvent: new Date(), applications: [ ], numberOfConference: 111 };

    private list: Conference[] = [];

    constructor() { }

    public addApplicationToConference(conferenceId: string, applicationId: string, token?: number, extraHttpRequestParams?: any): Observable<{}> {
        return new Observable(observer => { observer.next({ id: conferenceId }); });
    }

    public addConference(token?: number, conference?: any, extraHttpRequestParams?: any): Observable<any> {
        return new Observable(observer => { observer.next(conference); });
    }

    public deleteApplicationOfConference(conferenceId: string, applicationId: string, token?: number, extraHttpRequestParams?: any): Observable<{}> {
        return new Observable(observer => { observer.next({ id: conferenceId }); });
    }

    public deleteConferenceById(conferenceId: string, token?: number, extraHttpRequestParams?: any): Observable<{}> {
        return new Observable(observer => { observer.next({ id: conferenceId }); });
    }

    public getApplicationsByConference(conferenceId: string, token?: number, extraHttpRequestParams?: any): Observable<Array<any>> {
        return new Observable(observer => { observer.next({ id: conferenceId }); });
    }

    public getConferenceById(conferenceId: string, token?: number, extraHttpRequestParams?: any): Observable<any> {
        return new Observable(observer => { observer.next({ id: conferenceId }); });
    }

    public getConferences(token?: number, filter?: string, sort?: string, extraHttpRequestParams?: any): Observable<Array<any>> {
        return new Observable(observer => { observer.next([{ id: 'id' }]); });
    }

    public updateConferenceById(conferenceId: string, token?: number, conference?: any, extraHttpRequestParams?: any): Observable<any> {
        return new Observable(observer => { observer.next(conference); });
    }

}
