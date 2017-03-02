import { Injectable } from '@angular/core';

import { Observable, Observer } from 'rxjs/Rx';

import { ConferenceDetailDto } from './../../../swagger';

@Injectable()
export class ConferenceMock {

    constructor() {}

    public getConferenceById(id: string): Observable<ConferenceDetailDto> {
        return new Observable((observer: Observer<any>) => {
            setTimeout(() => {
                observer.next('');
                observer.complete();
            }, 200);
        });
    }

    public getConferences(): Observable<ConferenceDetailDto[]> {
        return new Observable((observer: Observer<any>) => {
            setTimeout(() => {
                observer.next('');
                observer.complete();
            }, 200);
        });
    }

    public createNewConference(conference: ConferenceDetailDto) { }

    public saveConference(conference: ConferenceDetailDto) { }

    public getConferenceForm(): any { return []; }
}

