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
import { ApplicationDto, FieldDto, ApplicationCreateDto, CommentDto, UserDto } from './../../../swagger';

/** Decorators */
import { Loading } from './../../../shared/decorators/loading.decorator';


@Injectable()
export class ApplicationService {

    private _application: ApplicationDto;
    get application() { return this._application; }
    set application(application) {
        this._application = application;
        this.setValues();
    }
    private applications: ApplicationDto[];

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
        for (let i = 0; i < application.attributes.length; i++) {
            const field: FieldDto = application.attributes[i];
            const form: any = application.filledForm;
            field.value = form[field.name];
        }
    }

    /**
     * returns the observable to get a applicationn by the given id
     * @param {String} id - the id of the application to get
     */
    @Loading('getApplicationById')
    public getApplicationById(id: string): Observable<ApplicationDto> {
        return this.applicationApi.getApplicationById(id).map(application => {
            return this.application = application;
        });
    }

    /**
     * return the observable to get a list of all applications the user has (sorted)
     * @param {String} [sort]
     */
    @Loading('getApplications')
    public getApplications(sort?: string): Observable<ApplicationDto[]> {
        return this.applicationApi.getApplications().map(applications => {
            if (sort) {
                applications.sort(
                    function (a: { [key: string]: any }, b: { [key: string]: any }) {
                        return (a[sort] > b[sort]) ? 1 : ((b[sort] > a[sort]) ? -1 : 0);
                    }
                );
            }
            return this.applications = applications;
        });
    }

    @Loading('getApplications')
    public getOwnApplications(sort?: string, user?: UserDto): Observable<any> {
        return this.applicationApi.getApplications().map(param => {
            const applications = param.filter(obj => obj.userId === user.id);
            return this.applications = applications;
        });
    }

    @Loading('getApplications')
    public getAssignedApplications(sort?: string, user?: UserDto): Observable<any> {
        return this.applicationApi.getApplications().map(param => {
            const applications = param.filter(obj => {
                const assignment = _.find(obj.assignments, assign => assign.id === user.id);
                return !!assignment;
            });
            return this.applications = applications;
        });
    }

    /**
     * Creates a new application with the given attributes
     * @param {Application} application - the new application to create
     */
    @Loading('createNewApplication')
    public createNewApplication(application: ApplicationDto): Observable<ApplicationDto> {
        /* TODO: wait for token */
        this.auth.getUser().subscribe(user => {
            application.userId = user.id;
        });

        return this.applicationApi.createApplication((application as ApplicationCreateDto)).map(result => {
            return this.application = result;
        });
    }

    /**
     * add a comment to the current application
     * @param {Comment} comment - the comment to add
     */
    @Loading('addCommentToApplication')
    public addCommentToApplication(comment: CommentDto): Observable<ApplicationDto> {
        if (!this.application) { return Observable.throw('No Application'); }
        return this.applicationApi.addCommentToApplication(this.application.id, comment).map(result => {
            return result;
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
    public submitApplication(application: ApplicationDto): Observable<ApplicationDto> {
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
    public rescindApplication(application: ApplicationDto): Observable<ApplicationDto> {
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
    public deactivateApplication(application: ApplicationDto): Observable<ApplicationDto> {
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
    public saveApplication(form: Object): Observable<ApplicationDto> {
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
    public updateApplication(application: ApplicationDto): Observable<ApplicationDto> {
        return this.applicationApi.updateApplicationById(application.id, application).map(result => {
            return this.application = result;
        });
    }

    /**
     * add the conference to the application
     * @param {Application} application
     * @param {String} conferenceId
     */
    public assignConferenceToApplication(application: ApplicationDto, conferenceId: string): Observable<ApplicationDto> {
        const param = _.cloneDeep(application);
        param.conferenceId = conferenceId;
        param.status = { name: 'pending' };

        return this.updateApplication(param).map(result => {
            return this.application = result;
        });
    }

    /**
     * confirm the application by a docent
     * @param {Boolean} confirmation
     * @param {Application} application
     */
    public confirmApplication(confirmation: boolean, application: ApplicationDto): Observable<ApplicationDto> {
        const param = _.cloneDeep(application);
        param.confirmed = confirmation;

        return this.updateApplication(param).map(result => {
            return this.application = result;
        });
    }

}
