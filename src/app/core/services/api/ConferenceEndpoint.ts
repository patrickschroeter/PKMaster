import { Injectable } from '@angular/core';

import { Observable, Observer } from 'rxjs/Rx';

import { ConferenceApiMock } from './';

import { ConferenceDto, ApplicationDto } from './../../../swagger';

@Injectable()
export class ConferenceEndpoint {

    constructor() { }


    public addApplicationToConference(conferenceId: string, application?: ApplicationDto, extraHttpRequestParams?: any):
        Observable<ConferenceDto> {
        return this.observe(this._addApplication(conferenceId, application));
    }

    public addConference(conference?: ConferenceDto, extraHttpRequestParams?: any): Observable<ConferenceDto> {
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

    public deleteApplicationOfConference(conferenceId: number, application?: number, extraHttpRequestParams?: any):
        Observable<ConferenceDto> {
        return new Observable((observer: Observer<any>) => { observer.next({ id: conferenceId }); });
    }

    public deleteConferenceById(conferenceId: string, extraHttpRequestParams?: any): Observable<{}> {
        return this.observe(this._delete(conferenceId));
    }

    public getApplicationsByConference(conferenceId: number, extraHttpRequestParams?: any): Observable<Array<ApplicationDto>> {
        return new Observable((observer: Observer<any>) => { observer.next({ id: conferenceId }); });
    }

    public getConferenceById(conferenceId: string, extraHttpRequestParams?: any): Observable<ConferenceDto> {
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

    public getConferences(filter?: string, sort?: string, extraHttpRequestParams?: any): Observable<Array<ConferenceDto>> {
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

    public updateConferenceById(conferenceId: string, conference?: ConferenceDto, extraHttpRequestParams?: any):
        Observable<ConferenceDto> {
        const param = this._conferenceUpdate(conferenceId, conference);
        return this.observe(param);
    }

    /**
     * Helper observer
     */
    private observe<T>(obj: T): Observable<T> {
        return new Observable<T>((observer: Observer<T>) => {
            setTimeout(() => {
                observer.next(obj);
                observer.complete();
            }, 500);
        });
    }

    /**
     * Mock Server
     */

    // tslint:disable-next-line:member-ordering
    private _list: ConferenceDto[] = [
        ConferenceApiMock.CONFERENCE
    ];

    private _conferences(): ConferenceDto[] {
        return JSON.parse(JSON.stringify(this._list));
    }

    private _conferenceAdd(conference: ConferenceDto): ConferenceDto {
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

    private _conference(id?: string): ConferenceDto {
        let result: ConferenceDto;
        const list = this._list;
        for (let i = 0; i < list.length; i++) {
            if (list[i].id === id) {
                result = list[i];
            }
        }
        if (!result) { return null; }
        return JSON.parse(JSON.stringify(result));
    }

    private _conferenceUpdate(id: string, conference: ConferenceDto): ConferenceDto {
        const list = this._list;
        for (let i = 0; i < list.length; i++) {
            if (list[i].id === id) {
                list[i] = conference;
                return JSON.parse(JSON.stringify(list[i]));
            }
        }
        return null;
    }

    private _delete(id: string): boolean {
        let index = -1;
        for (let i = 0; i < this._list.length; i++) {
            const element = this._list[i];
            if (element.id === id) {
                index = i;
            }
        }
        if (index === -1) {
            return false;
        } else {
            this._list.splice(index, 1);
            return true;
        }
    }

    private _addApplication(id: string, application: ApplicationDto): ConferenceDto {
        const conference: ConferenceDto = this._conference(id);
        conference.applications = conference.applications || [];
        let index = -1;
        for (let i = 0; i < conference.applications.length; i++) {
            const element = conference.applications[i];
            if (element.id === application.id) {
                index = i;
            }
        }
        if (index === -1) {
            conference.applications.push(application);
        }
        return this._conferenceUpdate(conference.id, conference);
    }

}
