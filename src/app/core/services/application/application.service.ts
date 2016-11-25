import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { AlertService } from './../alert';
import { FormService } from './../form';

import { Application, FormElement, State } from './../../../swagger';

@Injectable()
export class ApplicationService {

    private application: Application;

    constructor(
        private formService: FormService,
        private alert: AlertService) {

        // hack
        this.formService.getFormById(1).subscribe(form => {
            this.application.form = form;
            this.application.attributes = form.elements;
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
            this.application.attributes = form.elements;
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

    submitApplication(application: Application): Observable<Application> {
        this.alert.setLoading(`submitApplication${application.id}`, 'Submit Application...');
        return new Observable(observer => {
            setTimeout(() => {
                this.alert.removeLoading(`submitApplication${application.id}`);
                application.state = State.NameEnum.submitted;
                observer.next(application);
                observer.complete();
            }, 200);
        });
    }

    rescindApplication(application: Application): Observable<Application> {
        this.alert.setLoading(`rescindApplication${application.id}`, 'Rescind Application...');
        return new Observable(observer => {
            setTimeout(() => {
                this.alert.removeLoading(`rescindApplication${application.id}`);
                application.state = State.NameEnum.rescinded;
                observer.next(application);
                observer.complete();
            }, 200);
        });
    }

    deactivateApplication(application: Application): Observable<Application> {
        this.alert.setLoading(`deactivateApplication${application.id}`, 'Deactivate Application...');
        return new Observable(observer => {
            setTimeout(() => {
                this.alert.removeLoading(`deactivateApplication${application.id}`);
                application.state = State.NameEnum.deactivated;
                console.log(application);
                observer.next(application);
                observer.complete();
            }, 200);
        });
    }

    /**
     * @description Saves the changed application
     * @return {void}
     */
    saveApplication(form): Observable<Application> {
        for (let i = 0, length = this.application.attributes.length; i < length; i++) {
            let element: FormElement = this.application.attributes[i];
            element.value = form[element.name];
        };
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
