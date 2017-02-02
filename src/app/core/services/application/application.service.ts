import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs/Rx';
import * as _ from 'lodash';

import { AlertService } from './../../../modules/alert';
import { FormService } from './../form';
import { AuthenticationService } from './../authentication';

import { ApplicationApi } from './../../../swagger/api/ApplicationApi';

import { Application, Field, ApplicationCreateDto, Comment } from './../../../swagger';

import { TranslationService } from './../../../modules/translation';

@Injectable()
export class ApplicationService {

    static DEFAULT_TOKEN = 17;

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
     * returns the observable to get a applicationn by the given id
     * @param {String} id - the id of the application to get
     * @return {Observable}
     */
    public getApplicationById(id: string): Observable<Application> {
        return this.applicationApi.getApplicationById(id).map(application => {
            return this.application = application;
        });
    }

    /**
     * return the observable to get a list of all applications the user has (sorted)
     * @param {String} [sort]
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
     * Creates a new application with the given attributes
     * @param {Application} application - the new application to create
     * @return {Observable}
     */
    public createNewApplication(application: Application): Observable<Application> {
        /* TODO: wait for token */
        this.auth.getUser().subscribe(user => {
            application.userId = user.id;
        });

        application.formId = application.form.id;

        return this.applicationApi.createApplication(ApplicationService.DEFAULT_TOKEN, (application as ApplicationCreateDto)).map(result => {
            return this.application = result;
        });
    }

    /**
     * add a comment to the current application
     * @param {Comment} comment - the comment to add
     */
    public addCommentToApplication(comment: Comment): Observable<Application> {
        if (!this.application) { return Observable.throw('No Application'); }
        return this.applicationApi.addCommentToApplication(this.application.id, ApplicationService.DEFAULT_TOKEN, comment).map(result => {
            return this.application = result;
        });
    }

    /**
     * check if the requested Status change is allowed
     * @param {String} name - the permission name to check
     * @param {Array} permittedStati - a list of all states to block the request
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

    /**
     * submit the selected application
     * @param {Application} application
     */
    public submitApplication(application: Application): Observable<Application> {
        const blocked = this.blockedStatusUpdate(application.status.name, ['created']);
        if (blocked) { return blocked; }
        /** TODO: move to server */
        const param = _.cloneDeep(application);
        param.status = { name: 'submitted' };
        return this.updateApplication(param).map(result => {
            return this.application = result;
        });
    }

    /**
     * rescind the selected application
     * @param {Application} application
     */
    public rescindApplication(application: Application): Observable<Application> {
        const blocked = this.blockedStatusUpdate(application.status.name, ['submitted']);
        if (blocked) { return blocked; }
        /** TODO: move to server */
        const param = _.cloneDeep(application);
        param.status = { name: 'rescinded' };
        return this.updateApplication(param).map(result => {
            return this.application = result;
        });
    }

    /**
     * deactivate the selected application
     * @param {Application} application
     */
    public deactivateApplication(application: Application): Observable<Application> {
        const blocked = this.blockedStatusUpdate(application.status.name, ['created', 'rescinded']);
        if (blocked) { return blocked; }
        /** TODO: move to server */
        const param = _.cloneDeep(application);
        param.status = { name: 'deactivated' };
        return this.updateApplication(param).map(result => {
            return this.application = result;
        });
    }

    /**
     * Saves the changed application
     * @param {Object} form - the form of the application
     * @return {void}
     */
    public saveApplication(form: Object): Observable<Application> {
        if (!this.application) { return; }
        if (this.application.attributes) {
            for (let i = 0, length = this.application.attributes.length; i < length; i++) {
                const element: Field = this.application.attributes[i];
                element.value = form[element.name];
            };
        }
        return this.updateApplication(this.application).map(application => {
            /** TODO: hack */
            application.status = { name: 'created' };
            this.applicationApi.updateApplicationById(application.id, ApplicationService.DEFAULT_TOKEN, application);
            /** hack end */
            return this.application = application;
        });
    }

    /**
     * update the application
     * @param {Application} application
     */
    public updateApplication(application: Application): Observable<Application> {
        this.alert.setLoading(
            'updateApplication',
            this.translationService.translate('loadingUpdateApplication')
        );
        return this.applicationApi.updateApplicationById(application.id, 17, application).map(result => {
            this.alert.removeHint('updateApplication');
            return this.application = result;
        });
    }

    /**
     * add the conference to the application
     * @param {Application} application
     * @param {String} conferenceId
     */
    public assignConferenceToApplication(application: Application, conferenceId: string): Observable<Application> {
        const param = _.cloneDeep(application);

        param.conferenceId = conferenceId;

        /* TODO */ param.status = { name: 'pending' };

        return this.updateApplication(param).map(result => {
            return this.application = result;
        });
    }

}
