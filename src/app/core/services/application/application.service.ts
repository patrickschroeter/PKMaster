import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs/Rx';

import { AlertService } from './../../../modules/alert';
import { FormService } from './../form';
import { AuthenticationService } from './../authentication';

import { ApplicationApi } from './../../../swagger/api/ApplicationApi';

import { Application, Field, ApplicationCreateDto, Comment } from './../../../swagger';

import { TranslationService } from './../../../modules/translation';

@Injectable()
export class ApplicationService {

    private application: Application;
    private applications: Application[];

    constructor(
        private formService: FormService,
        private alert: AlertService,
        private applicationApi: ApplicationApi,
        private auth: AuthenticationService,
        private translationService: TranslationService
    ) { }

    /**
     * @description returns the observable to get a applicationn by the given id
     * @param {number} id
     * @return {Observable}
     */
    public getApplicationById(id: string): Observable<Application> {
        return this.applicationApi.getApplicationById(id).map(application => {
            return this.application = application;
        });
    }

    /**
     * @description return the observable to get a list of all applications the user has (sorted)
     */
    public getApplications(sort?: string): Observable<any> {
        return this.applicationApi.getApplications().map(applications => {
            if (sort) {
                applications.sort(function (a, b) { return (a[sort] > b[sort]) ? 1 : ((b[sort] > a[sort]) ? -1 : 0); });
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
        /* TODO: wait for token */
        this.auth.getUser().subscribe(user => {
            application.userId = user.id;
        });

        application.formId = application.form.id;

        return this.applicationApi.createApplication(17, (application as ApplicationCreateDto)).map(result => {
            return this.application = result;
        });
    }

    public addCommentToApplication(comment: Comment) {
        return this.applicationApi.addCommentToApplication(this.application.id, 0, comment).map(result => {
            return this.application = result;
        });
    }

    /**
     * @description check if the requested Status change is allowed
     */
    private blockedStatusUpdate(name: string, permittedStati: string[]): Observable<any> {
        if (permittedStati.indexOf(name) === -1) {
            this.alert.setAlert(
                this.translationService.translate('headerNotAllowed'),
                this.translationService.translate('operationNotAllowed')
            );
            return new Observable((observer: Observer<any>) => { observer.error('Error'); });
        }
        return null;
    }

    public submitApplication(application: Application): Observable<Application> {
        let blocked = this.blockedStatusUpdate(application.status.name, ['created']);
        if (blocked) { return blocked; }
        /** TODO: move to server */
        application.status = { name: 'submitted' };
        return this.applicationApi.updateApplicationById(application.id, 17, application).map(result => {
            return this.application = result;
        });
    }

    public rescindApplication(application: Application): Observable<Application> {
        let blocked = this.blockedStatusUpdate(application.status.name, ['submitted']);
        if (blocked) { return blocked; }
        /** TODO: move to server */
        application.status = { name: 'rescinded' };
        return this.applicationApi.updateApplicationById(application.id, 17, application).map(result => {
            return this.application = result;
        });
    }

    public deactivateApplication(application: Application): Observable<Application> {
        let blocked = this.blockedStatusUpdate(application.status.name, ['created', 'rescinded']);
        if (blocked) { return blocked; }
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
    public saveApplication(form: Object): Observable<Application> {
        if (this.application && this.application.attributes) {
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

    public updateApplication(application: Application): Observable<Application> {
        return this.applicationApi.updateApplicationById(application.id, 17, application).map(result => {
            return this.application = result;
        });
    }

}
