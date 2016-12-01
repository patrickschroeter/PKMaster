import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';

import { Message } from './';

@Injectable()
export class AlertMock {

    constructor() { }

    setLoading(id: string, message: string): void { }

    removeHint(id: string): void { }

    setAlert() {

    }

    getAlert(): Observable<any> {
        return new Observable(observer => {
            observer.next('alert');
        });
    }

    getHintMessages(): Observable<any> {
        return new Observable(observer => {
            observer.next([]);
        });
    }

    getHintMessage(): Observable<any> {
        return new Observable(observer => {
            observer.next('hint');
        });
    }

    getLoading(): Observable<any> {
        return new Observable(observer => {
            observer.next(['loading']);
        });
    }
}
