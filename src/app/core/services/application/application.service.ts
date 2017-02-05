import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs/Rx';
import * as _ from 'lodash';

/** Services */
import { AlertService } from './../../../modules/alert';
import { FormService } from './../form';
import { AuthenticationService } from './../authentication';
import { ApplicationApi } from './../../../swagger/api/ApplicationApi';
import { TranslationService } from './../../../modules/translation';

/** Models */
import { Application, Field, ApplicationCreateDto, Comment } from './../../../swagger';

/** Decorators */
import { Loading } from './../../../shared/decorators/loading.decorator';


@Injectable()
export class ApplicationService {

    static DEFAULT_TOKEN = 17;

    private _application: Application;
    get application() { return this._application; }
    set application(application) {
        this._application = application;
        this.setValues();
    }
    private applications: Application[];

    constructor(
        /** Modules */
        private alert: AlertService,
        private translationService: TranslationService,
        /** Services */
        private auth: AuthenticationService,
        private formService: FormService,
        private applicationApi: ApplicationApi
    ) { }

    /**
     * set the attributes property with filled values
     */
    private setValues() {
        const application = this.application;
        if (application.form && !application.attributes) {
            application.attributes = application.form.formHasField;
        }
        if (!application.filledForm || typeof application.filledForm !== 'string') { return; }
        application.filledForm = JSON.parse(application.filledForm);
        /** TODO */
        for (let i = 0, length = application.attributes.length; i < length; i++) {
            const field = application.attributes[i];
            field.value = application.filledForm[field.name];
        }
    }

    /**
     * returns the observable to get a applicationn by the given id
     * @param {String} id - the id of the application to get
     */
    @Loading('getApplicationById')
    public getApplicationById(id: string): Observable<Application> {
        return this.applicationApi.getApplicationById(id).map(application => {
            return this.application = application;
        });
    }

    /**
     * return the observable to get a list of all applications the user has (sorted)
     * @param {String} [sort]
     */
    @Loading('getApplications')
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
     */
    @Loading('createNewApplication')
    public createNewApplication(application: Application): Observable<Application> {
        /* TODO: wait for token */
        this.auth.getUser().subscribe(user => {
            application.userId = user.id;
        });

        return this.applicationApi.createApplication(
            ApplicationService.DEFAULT_TOKEN,
            (application as ApplicationCreateDto)).map(result => {
                return this.application = result;
            });
    }

    /**
     * add a comment to the current application
     * @param {Comment} comment - the comment to add
     */
    @Loading('addCommentToApplication')
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
     */
    public saveApplication(form: Object): Observable<Application> {
        if (!this.application) { return; }
        const param = _.cloneDeep(this.application);
        param.filledForm = JSON.stringify(form);
        param.status = { name: 'created' };
        console.log(JSON.stringify(param.filledForm));
        return this.updateApplication(param).map(application => {
            return this.application = application;
        });
    }

    /**
     * update the application
     * @param {Application} application
     */
    @Loading('updateApplication')
    public updateApplication(application: Application): Observable<Application> {
        return this.applicationApi.updateApplicationById(application.id, 17, application).map(result => {
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
        param.status = { name: 'pending' };

        return this.updateApplication(param).map(result => {
            return this.application = result;
        });
    }

}
