import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { AlertService } from './../alert';
import { FormService } from './../form';
import { ApplicationApiMock } from './../api';

import { Application, Field, Status } from './../../../swagger';

@Injectable()
export class ApplicationService {

    private application: Application;
    private applications: Application[];

    constructor(
        private formService: FormService,
        private alert: AlertService,
        private applicationApi: ApplicationApiMock) {
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
        this.alert.setLoading('createNewApplication', 'Create Application...');
        console.log(application);
        return this.applicationApi.createApplication(17, application).map(application => {
            this.alert.removeHint('createNewApplication');
            return this.application = application;
        })
    }

    public submitApplication(application: Application): Observable<Application> {
        if (['created'].indexOf(application.status.name) === -1) {
            this.alert.setAlert('Not Allowed', 'This operation is not allowed.');
            return new Observable(observer => { observer.error('Error'); });
        }
        this.alert.setLoading(`submitApplication${application.id}`, 'Submit Application...');
        application.status = { name: 'submitted' };
        return this.applicationApi.updateApplicationById(application.id, 17, application).map(application => {
            this.alert.removeHint(`submitApplication${application.id}`);
            return this.application = application;
        });
    }

    public rescindApplication(application: Application): Observable<Application> {
        if (['submitted'].indexOf(application.status.name) === -1) {
            this.alert.setAlert('Not Allowed', 'This operation is not allowed.');
            return new Observable(observer => { observer.error('Error'); });
        }
        this.alert.setLoading(`rescindApplication${application.id}`, 'Rescind Application...');
        application.status = { name: 'rescinded' };
        return this.applicationApi.updateApplicationById(application.id, 17, application).map(application => {
            this.alert.removeHint(`rescindApplication${application.id}`);
            return this.application = application;
        });
    }

    public deactivateApplication(application: Application): Observable<Application> {
        if (['created', 'rescinded'].indexOf(application.status.name) === -1) {
            this.alert.setAlert('Not Allowed', 'This operation is not allowed.');
            return new Observable(observer => { observer.error('Error'); });
        }
        this.alert.setLoading(`deactivateApplication${application.id}`, 'Deactivate Application...');
        application.status = { name: 'deactivated' };
        return this.applicationApi.updateApplicationById(application.id, 17, application).map(application => {
            this.alert.removeHint(`deactivateApplication${application.id}`);
            return this.application = application;
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
        this.alert.setLoading('saveApplication', 'Save Application...');
        return this.applicationApi.updateApplicationById(this.application.id, 17, this.application).map(application => {
            this.alert.removeHint('saveApplication');
            /** hack */
            application.status = { name: 'created' };
            this.applicationApi.updateApplicationById(application.id, 17, application);
            /** hack end */
            return this.application = application;
        });
    }

}
