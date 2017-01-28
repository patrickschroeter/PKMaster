import { Injectable } from '@angular/core';

import { Observable, Observer } from 'rxjs/Rx';

import { ConferenceApiMock } from './';

import { Conference, Application } from './../../../swagger';

@Injectable()
export class ConferenceEndpoint {

    constructor() { }


    public addApplicationToConference(conferenceId: number, token?: number, application?: number, extraHttpRequestParams?: any):
        Observable<Conference> {
        return new Observable(observer => { observer.next({ id: conferenceId }); });
    }

    public addConference(token?: number, conference?: Conference, extraHttpRequestParams?: any): Observable<Conference> {
        const value = this._conferenceAdd(conference);
        return new Observable((observer: Observer<any>) => {
            setTimeout(() => {
                if (conference) {
                    observer.next(value);
                } else {
                    console.error(`Error creating the conference`);
                    observer.error(`Error creating the conference`);
                }
                observer.complete();
            }, 500);
        });
    }

    public deleteApplicationOfConference(conferenceId: number, token?: number, application?: number, extraHttpRequestParams?: any):
        Observable<Conference> {
        return new Observable(observer => { observer.next({ id: conferenceId }); });
    }

    public deleteConferenceById(conferenceId: number, token?: number, extraHttpRequestParams?: any): Observable<{}> {
        return new Observable(observer => { observer.next({ id: conferenceId }); });
    }

    public getApplicationsByConference(conferenceId: number, token?: number, extraHttpRequestParams?: any): Observable<Array<Application>> {
        return new Observable(observer => { observer.next({ id: conferenceId }); });
    }

    public getConferenceById(conferenceId: string, token?: number, extraHttpRequestParams?: any): Observable<Conference> {
        const conference = this._conference(conferenceId);
        return new Observable((observer: Observer<any>) => {
            setTimeout(() => {
                if (conference) {
                    observer.next(conference);
                } else {
                    console.error(`No Conferences with Id ${conferenceId} found`);
                    observer.error(`No Conferences with Id ${conferenceId} found`);
                }
                observer.complete();
            }, 500);
        });
    }

    public getConferences(token?: number, filter?: string, sort?: string, extraHttpRequestParams?: any): Observable<Array<Conference>> {
        const conferences = this._conferences();
        return new Observable((observer: Observer<any>) => {
            setTimeout(() => {
                if (conferences) {
                    observer.next(conferences);
                } else {
                    console.error(`No Conferences found`);
                    observer.error(`No Conferences found`);
                }
                observer.complete();
            }, 500);
        });
    }

    public updateConferenceById(conferenceId: number, token?: number, conference?: Conference, extraHttpRequestParams?: any):
        Observable<Conference> {
        return new Observable(observer => { observer.next({ id: conferenceId }); });
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
        let id: string;
        if (!this._list.length) {
            id = 'Q';
        } else {
            id = this._list[this._list.length - 1].id + 'Q';
        }
        conference.id = id;
        this._list.push(conference);
        return JSON.parse(JSON.stringify(this._list[this._list.length - 1]));
    }

    private _conference(id?: string): Conference {
        let result: Conference;
        const list = this._list;
        for (let i = 0, length = list.length; i < length; i++) {
            if (list[i].id === id) {
                result = list[i];
            }
        }
        if (!result) { return null; }
        return JSON.parse(JSON.stringify(result));
    }

    private _conferenceUpdate(id: string, conference: Conference) {
        const list = this._list;
        for (let i = 0, length = list.length; i < length; i++) {
            if (list[i].id === id) {
                list[i] = conference;
                return JSON.parse(JSON.stringify(list[i]));
            }
        }
        return null;
    }

}
