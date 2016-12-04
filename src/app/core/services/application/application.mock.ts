import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { Application } from './../../../swagger';

@Injectable()
export class ApplicationMock {

    static APPLICATION: Application = { id: '1', status: 'created', created: new Date(1991, 5, 17), form: { title: 'Titel der Form', id: 13, elements: [ { fieldType: 'h3', name: 'header01', value: 'Hochschule für Angewandte Wissenschaften Augsburg', styles: ['small'] }, { fieldType: 'input', name: 'date', contentType: 'date', label: 'Augsburg, den', styles: ['small'] }]}};

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

    getApplications(sort?: string): Observable<any> {
        return new Observable(observer => {
            setTimeout(() => {
                observer.next('applications');
            }, 200);
        });
    }

}
