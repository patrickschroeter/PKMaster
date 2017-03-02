import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs/Rx';

import { ApplicationDetailDto } from './../../../swagger';

@Injectable()
export class ApplicationMock {

    constructor() { }

    /**
     * @description returns the observable to get a applicationn by the given id
     * @param {number} id
     * @return {Observable}
     */
    getApplicationById(id: number): Observable<ApplicationDetailDto> {
        return new Observable((observer: Observer<any>) => {
            setTimeout(() => {
                observer.next('');
                observer.complete();
            }, 200);
        });
    }

    /**
     * @description returns the observable to get the new created application
     * @param {Application} application
     * @return {Observable}
     */
    createNewApplication(application: ApplicationDetailDto): Observable<ApplicationDetailDto> {

        return new Observable((observer: Observer<any>) => {
            setTimeout(() => {
                observer.next('');
                observer.complete();
            }, 200);
        });
    }


    /**
     * @description Saves the changed application
     * @return {void}
     */
    saveApplication(): Observable<ApplicationDetailDto> {
        return new Observable((observer: Observer<any>) => {
            setTimeout(() => {
                observer.next('');
                observer.complete();
            }, 200);
        });
    }

    getApplications(sort?: string): Observable<any> {
        return new Observable((observer: Observer<any>) => {
            setTimeout(() => {
                observer.next('applications');
                observer.complete();
            }, 200);
        });
    }
    getOwnApplications(sort?: string): Observable<any> {
        return new Observable((observer: Observer<any>) => {
            setTimeout(() => {
                observer.next('applications');
                observer.complete();
            }, 200);
        });
    }
    getAssignedApplications(sort?: string): Observable<any> {
        return new Observable((observer: Observer<any>) => {
            setTimeout(() => {
                observer.next('applications');
                observer.complete();
            }, 200);
        });
    }

}
