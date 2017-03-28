/**
 *
 * @author Patrick Schröter <patrick.schroeter@hotmail.de>
 *
 * @license CreativeCommons BY-NC-SA 4.0 2017
 *
 * This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/.
 *
 */

import { Injectable } from '@angular/core';

import { Observable, Observer } from 'rxjs/Rx';

import { ConferenceDetailDto } from 'app/swagger';

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

