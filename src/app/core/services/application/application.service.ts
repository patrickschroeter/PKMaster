import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { AlertService } from './../../../modules/alert';
import { FormService } from './../form';

import { ApplicationApi } from './../../../swagger/api/ApplicationApi';

import { Application, Field, Status } from './../../../swagger';

@Injectable()
export class ApplicationService {

    private application: Application;
    private applications: Application[];

    constructor(
        private formService: FormService,
        private alert: AlertService,
        private applicationApi: ApplicationApi) {
     }

    /**
     * @description returns the observable to get a applicationn by the given id
     * @param {number} id
     * @return {Observable}
     */
    public getApplicationById(id: number): Observable<Application> {
        return this.applicationApi.getApplicationById(id).map(application => {
            return this.application = application;
        })
    }

    public getApplications(sort?: string): Observable<any> {
        return this.applicationApi.getApplications().map(applications => {
            if (sort) {
                applications.sort(function(a, b) {return (a[sort] > b[sort]) ? 1 : ((b[sort] > a[sort]) ? -1 : 0); });
            }
            return this.applications = applications;
        });
    }

    /**
     * @description returns the observable to get the new created application
     * @param {Application} application
     * @return {Observable}
     */
    public createNewApplication(application: Application): Observable<Application> {
        return this.applicationApi.createApplication(17, application).map(result => {
            return this.application = result;
        })
    }

    public submitApplication(application: Application): Observable<Application> {
        if (['created'].indexOf(application.status.name) === -1) {
            this.alert.setAlert('Not Allowed', 'This operation is not allowed.');
            return new Observable(observer => { observer.error('Error'); });
        }
        /** TODO: move to server */
        application.status = { name: 'submitted' };
        return this.applicationApi.updateApplicationById(application.id, 17, application).map(result => {
            return this.application = result;
        });
    }

    public rescindApplication(application: Application): Observable<Application> {
        if (['submitted'].indexOf(application.status.name) === -1) {
            this.alert.setAlert('Not Allowed', 'This operation is not allowed.');
            return new Observable(observer => { observer.error('Error'); });
        }
        /** TODO: move to server */
        application.status = { name: 'rescinded' };
        return this.applicationApi.updateApplicationById(application.id, 17, application).map(result => {
            return this.application = result;
        });
    }

    public deactivateApplication(application: Application): Observable<Application> {
        if (['created', 'rescinded'].indexOf(application.status.name) === -1) {
            this.alert.setAlert('Not Allowed', 'This operation is not allowed.');
            return new Observable(observer => { observer.error('Error'); });
        }
        /** TODO: move to server */
        application.status = { name: 'deactivated' };
        return this.applicationApi.updateApplicationById(application.id, 17, application).map(result => {
            return this.application = result;
        });
    }

    /**
     * @description Saves the changed application
     * @return {void}
     */
    public saveApplication(form): Observable<Application> {
        if (this.application.attributes) {
            for (let i = 0, length = this.application.attributes.length; i < length; i++) {
                let element: Field = this.application.attributes[i];
                element.value = form[element.name];
            };
        }
        return this.applicationApi.updateApplicationById(this.application.id, 17, this.application).map(application => {
            /** hack */
            application.status = { name: 'created' };
            this.applicationApi.updateApplicationById(application.id, 17, application);
            /** hack end */
            return this.application = application;
        });
    }

}
