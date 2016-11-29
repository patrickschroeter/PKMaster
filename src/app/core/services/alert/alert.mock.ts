import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';

@Injectable()
export class AlertMock {

    constructor() { }

    /**
     * @description Streams the Loading to the Listening component
     * @param {string} id the id of the calling function
     * @param {string} message the message of the loading
     * @return {void}
     */
    setLoading(id: string, message: string): void { }

    /**
     * @description Removes the loading
     * @param {string} id the id of the loading function
     * @return {void}
     */
    removeHint(id: string): void { }

    getAlert() {
        return new Observable(observer => {
            observer.next('alert');
        });
    }

    /**
     * @description Returns the Hint Message Observer
     * @return {Observable}
     */
    getHintMessages() {

    }
    getHintMessage(): Observable<any> {
        return new Observable(observer => {
            observer.next('hint');
        });
    }

    /**
     * @description Returns the Loading Observer
     * @return {Observable}
     */
    getLoading(): Observable<any> {
        return new Observable(observer => {
            observer.next(['loading']);
        });
    }
}
