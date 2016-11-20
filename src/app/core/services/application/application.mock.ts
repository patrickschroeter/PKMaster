import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { Application } from './../../../swagger';

@Injectable()
export class ApplicationMock {

    constructor() { }

    /**
     * @description returns the observable to get a applicationn by the given id
     * @param {number} id
     * @return {Observable}
     */
    getApplicationById(id: number): Observable<Application> {
        return new Observable(observer => {
            setTimeout(() => {
                observer.next();
                observer.complete();
            }, 200);
        });
    }

    /**
     * @description returns the observable to get the new created application
     * @param {Application} application
     * @return {Observable}
     */
    createNewApplication(application: Application): Observable<Application> {

        return new Observable(observer => {
            setTimeout(() => {
                observer.next();
                observer.complete();
            }, 200);
        });
    }


    /**
     * @description Saves the changed application
     * @return {void}
     */
    saveApplication(): Observable<Application> {
        return new Observable(observer => {
            setTimeout(() => {
                observer.next();
                observer.complete();
            }, 200);
        });
    }

}