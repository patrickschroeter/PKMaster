import { Injectable } from '@angular/core';

import { Observable, Observer } from 'rxjs/Rx';

import { ConferenceDto } from './../../../swagger';

@Injectable()
export class ConferenceMock {

    constructor() {}

    public getConferenceById(id: string): Observable<ConferenceDto> {
        return new Observable((observer: Observer<any>) => {
            setTimeout(() => {
                observer.next('');
                observer.complete();
            }, 200);
        });
    }

    public getConferences(): Observable<ConferenceDto[]> {
        return new Observable((observer: Observer<any>) => {
            setTimeout(() => {
                observer.next('');
                observer.complete();
            }, 200);
        });
    }

    public createNewConference(conference: ConferenceDto) { }

    public saveConference(conference: ConferenceDto) { }

    public getConferenceForm(): any { return []; }
}

