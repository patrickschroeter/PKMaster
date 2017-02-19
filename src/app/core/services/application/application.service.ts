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
import {
    ApplicationDetailDto,
    ApplicationListDto,
    FieldDto,
    ApplicationCreateDto,
    CommentDetailDto,
    CommentCreateDto,
    UserDetailDto
} from './../../../swagger';

/** Decorators */
import { Loading } from './../../../shared/decorators/loading.decorator';


@Injectable()
export class ApplicationService {

    private _application: ApplicationDetailDto;
    get application() { return this._application; }
    set application(application) {
        this._application = application;
        this.setValues();
    }
    private applications: ApplicationListDto[];

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
        const application: ApplicationDetailDto = this.application;
        if (application.form && !application.attributes) {
            application.attributes = application.form.formHasField;
        }
        if (!application.filledForm || typeof application.filledForm !== 'string') { return; }
        application.filledForm = JSON.parse(application.filledForm);
        /** TODO */
        for (let i = 0; i < application.attributes.length; i++) {
            const field: FieldDto = application.attributes[i];
            const form: { [key: string]: string } = <any>application.filledForm;
            field.value = form[field.name];
        }
    }

    /**
     * returns the observable to get a applicationn by the given id
     * @param {String} id - the id of the application to get
     */
    @Loading('getApplicationById')
    public getApplicationById(id: string): Observable<ApplicationDetailDto> {
        return this.applicationApi.getApplicationById(id).map((application: ApplicationDetailDto) => {
            return this.application = application;
        });
    }

    /**
     * return the observable to get a list of all applications the user has (sorted)
     * @param {String} [sort]
     */
    @Loading('getApplications')
    public getApplications(sort?: string): Observable<ApplicationListDto[]> {
        return this.applicationApi.getApplications().map((applications: ApplicationListDto[]) => {
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
    public getOwnApplications(sort?: string, user?: UserDetailDto): Observable<ApplicationListDto[]> {
        return this.applicationApi.getApplications().map((result: ApplicationListDto[]) => {
            const applications = result.filter((obj: ApplicationListDto) => obj.user.id === user.id);
            return this.applications = applications;
        });
    }

    @Loading('getApplications')
    public getAssignedApplications(sort?: string, user?: UserDetailDto): Observable<ApplicationListDto[]> {
        return this.applicationApi.getApplications().map((result: ApplicationListDto[]) => {
            // TODO filter on server
            // const applications = result.filter((obj: ApplicationListDto) => {
            //     const assignment = _.find(obj.assignments, (assign: UserDetailDto) => assign.id === user.id);
            //     return !!assignment;
            // });
            return this.applications = result;
        });
    }

    /**
     * Creates a new application with the given attributes
     * @param {Application} application - the new application to create
     */
    @Loading('createNewApplication')
    public createNewApplication(application: ApplicationCreateDto): Observable<ApplicationDetailDto> {
        /* TODO: wait for token */
        this.auth.getUser().subscribe((user: UserDetailDto) => {
            application.userId = user.id;
        });

        return this.applicationApi.createApplication((application as ApplicationCreateDto)).map((result: ApplicationDetailDto) => {
            return this.application = result;
        });
    }

    /**
     * add a comment to the current application
     * @param {Comment} comment - the comment to add
     */
    @Loading('addCommentToApplication')
    public addCommentToApplication(comment: CommentDetailDto): Observable<CommentDetailDto[]> {
        if (!this.application) { return Observable.throw('No Application'); }
        const param: CommentCreateDto = new CommentCreateDto(comment);
        return this.applicationApi.addCommentToApplication(this.application.id, param).map((result: CommentDetailDto[]) => {
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
    public submitApplication(application: ApplicationDetailDto): Observable<ApplicationDetailDto> {
        const blocked = this.blockedStatusUpdate(application.status.name, ['created']);
        if (blocked) { return blocked; }
        /** TODO: move to server */
        const param = _.cloneDeep(application);
        param.status = { name: 'submitted' };
        return this.updateApplication(param).map((result: ApplicationDetailDto) => {
            return this.application = result;
        });
    }

    /**
     * rescind the selected application
     * @param {Application} application
     */
    public rescindApplication(application: ApplicationDetailDto): Observable<ApplicationDetailDto> {
        const blocked = this.blockedStatusUpdate(application.status.name, ['submitted']);
        if (blocked) { return blocked; }
        /** TODO: move to server */
        const param = _.cloneDeep(application);
        param.status = { name: 'rescinded' };
        return this.updateApplication(param).map((result: ApplicationDetailDto) => {
            return this.application = result;
        });
    }

    /**
     * deactivate the selected application
     * @param {Application} application
     */
    public deactivateApplication(application: ApplicationDetailDto): Observable<ApplicationDetailDto> {
        const blocked = this.blockedStatusUpdate(application.status.name, ['created', 'rescinded']);
        if (blocked) { return blocked; }
        /** TODO: move to server */
        const param = _.cloneDeep(application);
        param.status = { name: 'deactivated' };
        return this.updateApplication(param).map((result: ApplicationDetailDto) => {
            return this.application = result;
        });
    }

    /**
     * Saves the changed application
     * @param {Object} form - the form of the application
     */
    public saveApplication(form: Object): Observable<ApplicationDetailDto> {
        if (!this.application) { return; }
        const param = _.cloneDeep(this.application);
        param.filledForm = JSON.stringify(form);
        param.status = { name: 'created' };
        console.log(JSON.stringify(param.filledForm));
        return this.updateApplication(param).map((result: ApplicationDetailDto) => {
            return this.application = result;
        });
    }

    /**
     * update the application
     * @param {Application} application
     */
    @Loading('updateApplication')
    public updateApplication(application: ApplicationDetailDto): Observable<ApplicationDetailDto> {
        // TODO; mapping
        const param: ApplicationCreateDto = new ApplicationCreateDto(application);

        return this.applicationApi.updateApplicationById(application.id, param).map((result: ApplicationDetailDto) => {
            return this.application = result;
        });
    }

    /**
     * add the conference to the application
     * @param {Application} application
     * @param {String} conferenceId
     */
    public assignConferenceToApplication(application: ApplicationDetailDto, conferenceId: string): Observable<ApplicationDetailDto> {
        const param = _.cloneDeep(application);
        param.conference = {
            id: conferenceId
        }
        param.status = { name: 'pending' };

        return this.updateApplication(param).map((result: ApplicationDetailDto) => {
            return this.application = result;
        });
    }

    /**
     * confirm the application by a docent
     * @param {Boolean} confirmation
     * @param {Application} application
     */
    public confirmApplication(confirmation: boolean, application: ApplicationDetailDto): Observable<ApplicationDetailDto> {
        const param = _.cloneDeep(application);
        param.confirmed = confirmation;

        return this.updateApplication(param).map((result: ApplicationDetailDto) => {
            return this.application = result;
        });
    }


    public assignUserToApplication (applicationId: string, userId: string, extraHttpRequestParams?: any ) : Observable<CommentDetailDto[]> {
        // TODO
        return null;
    }


    public removeAssignmentFromApplication (applicationId: string, userId: string, extraHttpRequestParams?: any ) : Observable<{}> {
        // TODO
        return null;
    }

}
