import { Injectable } from '@angular/core';

import { Observable, Observer } from 'rxjs/Rx';

import { Conference } from './../../../swagger';

@Injectable()
export class ConferenceMock {

    constructor() {}

    public getConferenceById(id: string): Observable<Conference> {
        return new Observable((observer: Observer<any>) => {
            setTimeout(() => {
                observer.next('');
                observer.complete();
            }, 200);
        });
    }

    public getConferences(): Observable<Conference[]> {
        return new Observable((observer: Observer<any>) => {
            setTimeout(() => {
                observer.next('');
                observer.complete();
            }, 200);
        });
    }

    public createNewConference(conference: Conference) { }

    public saveConference(conference: Conference) { }

    public getConferenceForm() { return [] }
}

