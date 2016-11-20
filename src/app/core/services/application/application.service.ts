import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs/Rx';

import { AlertService } from './../alert';
import { FormService } from './../form';

import { Application } from './../../../swagger';

@Injectable()
export class ApplicationService {

    private application: Application;

    constructor(
        private formService: FormService,
        private alert: AlertService) {

        // hack
        this.formService.getFormById(1).subscribe(form => {
            for (let i = 0, length = form.elements.length; i < length; i++) {
                form.elements[i].disabled = true;
            }
            this.application.form = form;
        });
        // hack end
        this.application = {
            id: 17
        };
     }

    /**
     * @description returns the observable to get a applicationn by the given id
     * @param {number} id
     * @return {Observable}
     */
    getApplicationById(id: number): Observable<Application> {
        return new Observable(observer => {
            /** http getApplicationById(id) => this.currentApplication = result */
            setTimeout(() => {
                observer.next(this.application);
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
        // hack
        this.formService.getFormById(1).subscribe(form => {
            this.application.form.elements = form.elements;

        });
        // hack end
        this.application = {
            id: 17,
            form: {
                title: application['application-form']
            }
        };

        this.alert.setLoading('createNewApplication', 'Create Application...');
        return new Observable(observer => {
            setTimeout(() => {
                this.alert.removeLoading('createNewApplication');
                observer.next(this.application);
                observer.complete();
            }, 200);
        });
    }


    /**
     * @description Saves the changed application
     * @return {void}
     */
    saveApplication(): Observable<Application> {
        this.alert.setLoading('saveApplication', 'Save Application...')
        return new Observable(observer => {
            setTimeout(() => {
                this.alert.removeLoading('saveApplication');
                observer.next(this.application);
                observer.complete();
            }, 200);
        });
    }

}
