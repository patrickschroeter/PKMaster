/**
 *
 * @author Patrick Schröter <patrick.schroeter@hotmail.de>
 *
 * @license CreativeCommons BY-NC-SA 4.0 2017
 *
 * This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/.
 *
 */

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Observer } from 'rxjs/Rx';
import * as _ from 'lodash';

/** Services */
import { AlertService } from 'app/modules/alert';
import { FormService } from './../form';
import { ConfigurationService } from './../configuration';
import { AuthenticationService } from './../authentication';
import { ApplicationApi } from 'app/swagger/api/ApplicationApi';
import { TranslationService } from 'app/modules/translation';
import { ConferenceService } from './../conference';

/** Models */
import {
    ApplicationDetailDto,
    ApplicationListDto,
    FieldDto,
    ApplicationCreateDto,
    CommentDto,
    CommentCreateDto,
    UserDetailDto,
    StatusDto,
    AssignmentCreateDto,
    ConferenceDetailDto,
    Status
} from 'app/swagger';

/** Decorators */
import { Loading } from 'app/shared/decorators/loading.decorator';

/**
 * A Service taking care of applications
 *
 * @export
 * @class ApplicationService
 */
@Injectable()
export class ApplicationService {

    private application: ApplicationDetailDto;
    private applications: ApplicationListDto[];

    /**
     * Creates an instance of ApplicationService.
     * @param {AlertService} alert
     * @param {TranslationService} translationService
     * @param {AuthenticationService} auth
     * @param {FormService} formService
     * @param {ApplicationApi} applicationApi
     * @param {ConferenceService} conferenceService
     *
     * @memberOf ApplicationService
     */
    constructor(
        /** Angular */
        private router: Router,
        /** Modules */
        private alert: AlertService,
        private translationService: TranslationService,
        /** Services */
        private auth: AuthenticationService,
        private formService: FormService,
        private applicationApi: ApplicationApi,
        private conferenceService: ConferenceService,
        private configurationService: ConfigurationService
    ) { }

    public setApplication(application: ApplicationDetailDto): void {
        this.application = application;
        console.log(this.application);

    }

    /**
     * returns the observable to get a applicationn by the given id
     *
     * @param {String} id
     * @returns {Observable<ApplicationDetailDto>}
     *
     * @memberOf ApplicationService
     */
    @Loading('getApplicationById')
    public getApplicationById(id: string): Observable<ApplicationDetailDto> {
        return this.applicationApi.getApplicationById(id)
            .catch((error, cought) => {
                this.router.navigate(['/applications']);
                this.alert.setErrorHint(
                    'no-application-found',
                    this.translationService.translate('errorNoApplicationWithId', [id]),
                    2000
                );
                return Observable.throw(this.translationService.translate('errorNoApplicationWithId', [id]));
            })
            .map((application: ApplicationDetailDto) => {
                return this.application = application;
            });
    }

    /**
     * return the observable to get a list of all applications the user has (sorted)
     *
     * @param {String} [sort]
     * @returns {Observable<ApplicationListDto[]>}
     *
     * @memberOf ApplicationService
     */
    @Loading('getApplications')
    public getApplications(sort?: string): Observable<ApplicationListDto[]> {
        return this.applicationApi.getApplicationsOfUser().map((applications: ApplicationListDto[]) => {
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

    /**
     * get all owned applications
     *
     * @param {String} [sort]
     * @param {UserDetailDto} [user]
     * @returns {Observable<ApplicationListDto[]>}
     *
     * @memberOf ApplicationService
     */
    @Loading('getApplications')
    public getOwnApplications(sort?: string, user?: UserDetailDto): Observable<ApplicationListDto[]> {
        return this.applicationApi.getApplicationsOfUser(user.id).map((result: ApplicationListDto[]) => {
            const applications = result.filter((obj: ApplicationListDto) => obj.user.id === user.id);
            return this.applications = applications;
        });
    }

    /**
     * get all assignes applications
     *
     * @param {String} [sort]
     * @param {UserDetailDto} [user]
     * @returns {Observable<ApplicationListDto[]>}
     *
     * @memberOf ApplicationService
     */
    @Loading('getApplications')
    public getAssignedApplications(sort?: string, user?: UserDetailDto): Observable<ApplicationListDto[]> {
        return this.applicationApi.getApplicationsOfUser().map((result: ApplicationListDto[]) => {
            // TODO filter on server, missing assignment in ApplicationListDto
            // const applications = result.filter((obj: ApplicationListDto) => {
            //     const assignment = _.find(obj.assignments, (assign: UserDetailDto) => assign.id === user.id);
            //     return !!assignment;
            // });
            return this.applications = result;
        });
    }

    /**
     * Creates a new application with the given attributes
     *
     * @param {ApplicationCreateDto} application
     * @returns {Observable<ApplicationDetailDto>}
     *
     * @memberOf ApplicationService
     */
    @Loading('createNewApplication')
    public createNewApplication(application: ApplicationCreateDto): Observable<ApplicationDetailDto> {
        /* TODO: wait for token */
        this.auth.getUser().subscribe((user: UserDetailDto) => {
            application.userId = user.id;
        }, error => { console.error(error); });

        application.statusId = Status.CREATED;

        return this.applicationApi.createApplication((application as ApplicationCreateDto))
            .map((result: ApplicationDetailDto) => {
                return this.application = result;
            });
    }

    /**
     * add a comment to the current application
     *
     * @param {CommentDto} comment
     * @returns {Observable<CommentDto[]>}
     *
     * @memberOf ApplicationService
     */
    @Loading('addCommentToApplication')
    public addCommentToApplication(comment: CommentDto): Observable<CommentDto> {
        if (!this.application) { return Observable.throw('No Application'); }
        const param: CommentCreateDto = new CommentCreateDto(comment);
        this.auth.getUser().subscribe(user => {
            param.userId = user.id;
        }, error => { console.error(error); });
        return this.applicationApi.addCommentToApplication(this.application.id, param).map((result: CommentDto) => {
            return result;
        });
    }

    /**
     * check if the requested Status change is allowed
     *
     * @private
     * @param {String} name
     * @param {String[]} permittedStati
     * @returns {Observable<any>}
     *
     * @memberOf ApplicationService
     */
    private blockedStatusUpdate(name: Status, permittedStati: Status[]): Observable<any> {
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
     *
     * @param {ApplicationDetailDto} application
     * @returns {Observable<ApplicationDetailDto>}
     *
     * @memberOf ApplicationService
     */
    @Loading('submitApplication')
    public submitApplication(application: ApplicationDetailDto): Observable<ApplicationDetailDto> {
        const blocked = this.blockedStatusUpdate(application.statusId, [Status.CREATED]);
        if (blocked) { return blocked; }

        return this.applicationApi.updateStatusOfApplication(application.id, Status.SUBMITTED).map((result: ApplicationDetailDto) => {
            return this.application = result;
        });
    }

    /**
     * rescind the selected application
     *
     * @param {ApplicationDetailDto} application
     * @returns {Observable<ApplicationDetailDto>}
     *
     * @memberOf ApplicationService
     */
    @Loading('rescindApplication')
    public rescindApplication(application: ApplicationDetailDto): Observable<ApplicationDetailDto> {
        const blocked = this.blockedStatusUpdate(application.statusId, [Status.SUBMITTED]);
        if (blocked) { return blocked; }

        return this.applicationApi.updateStatusOfApplication(application.id, Status.RESCINDED).map((result: ApplicationDetailDto) => {
            return this.application = result;
        });
    }

    /**
     * deactivate the selected application
     *
     * @param {ApplicationDetailDto} application
     * @returns {Observable<ApplicationDetailDto>}
     *
     * @memberOf ApplicationService
     */
    @Loading('deactivateApplication')
    public deactivateApplication(application: ApplicationDetailDto): Observable<ApplicationDetailDto> {
        const blocked = this.blockedStatusUpdate(application.statusId, [Status.CREATED, Status.RESCINDED]);
        if (blocked) { return blocked; }

        return this.applicationApi.updateStatusOfApplication(application.id, Status.DEACTIVATED).map((result: ApplicationDetailDto) => {
            return this.application = result;
        });
    }

    /**
     * Saves the changed application
     *
     * @param {Object} form
     * @returns {Observable<ApplicationDetailDto>}
     *
     * @memberOf ApplicationService
     */
    public saveApplication(form: Object): Observable<ApplicationDetailDto> {
        if (!this.application) { return; }
        const param: ApplicationDetailDto = _.cloneDeep(this.application);
        param.filledForm = JSON.stringify(form);
        param.statusId = Status.CREATED;
        console.log(JSON.stringify(param.filledForm));
        return this.updateApplication(param).map((result: ApplicationDetailDto) => {
            return this.application = result;
        });
    }

    /**
     * update the application
     *
     * @param {ApplicationDetailDto} application
     * @returns {Observable<ApplicationDetailDto>}
     *
     * @memberOf ApplicationService
     */
    @Loading('updateApplication')
    public updateApplication(application: ApplicationDetailDto): Observable<ApplicationDetailDto> {
        const param: ApplicationCreateDto = new ApplicationCreateDto(application);
        return this.applicationApi.updateApplicationById(application.id, param).map((result: ApplicationDetailDto) => {
            return this.application = result;
        });
    }

    /**
     * updaet status of the application by status name
     *
     * @param {String} [name]
     * @param {*} [extraHttpRequestParams]
     * @returns {Observable<ApplicationDetailDto>}
     *
     * @memberOf ApplicationService
     */
    @Loading('updateStatusOfApplication')
    public updateStatusOfApplication(status: Status, extraHttpRequestParams?: any): Observable<ApplicationDetailDto> {
        return this.applicationApi.updateStatusOfApplication(this.application.id, status, extraHttpRequestParams);
    }

    /**
     * add the conference to the application
     *
     * @param {ApplicationDetailDto} application
     * @param {String} conferenceId
     * @returns {Observable<ApplicationDetailDto>}
     *
     * @memberOf ApplicationService
     */
    public assignConferenceToApplication(application: ApplicationDetailDto, conferenceId: string): Observable<ApplicationDetailDto> {
        this.application = application;
        return this.conferenceService.addApplicationToConference(application, conferenceId).map((result: ConferenceDetailDto) => {
            this.application.statusId = Status.PENDING;
            this.application.conference = result;
            return this.application;
        });
    }

    /**
     * confirm the application by a docent
     *
     * @param {Boolean} confirmation
     * @param {ApplicationDetailDto} application
     * @returns {Observable<ApplicationDetailDto>}
     *
     * @memberOf ApplicationService
     */
    public confirmApplication(confirmation: boolean, application: ApplicationDetailDto): Observable<ApplicationDetailDto> {
        const param: ApplicationDetailDto = new ApplicationDetailDto(application);
        param.confirmed = confirmation;

        return this.updateApplication(param).map((result: ApplicationDetailDto) => {
            return this.application = result;
        });
    }

    /**
     * Assign a user to the Application
     *
     * @param {ApplicationDetailDto} application
     * @param {String} userId
     * @param {*} [extraHttpRequestParams]
     * @returns {Observable<UserDetailDto[]>}
     *
     * @memberOf ApplicationService
     */
    public assignUserToApplication(
        application: ApplicationDetailDto,
        userId: string,
        extraHttpRequestParams?: any
    ): Observable<ApplicationDetailDto> {
        const applicationId = application.id;
        this.application = application;
        return this.applicationApi.assignUserToApplication(
            applicationId,
            new AssignmentCreateDto({ userId: userId }),
            extraHttpRequestParams
        ).map((result: ApplicationDetailDto) => {
            this.application = result;
            return result;
        });
    }

    /**
     * Unassign the user to the Application
     *
     * @param {ApplicationDetailDto} application
     * @param {String} userId
     * @param {*} [extraHttpRequestParams]
     * @returns {Observable<{}>}
     *
     * @memberOf ApplicationService
     */
    public removeAssignmentFromApplication(
        application: ApplicationDetailDto,
        userId: string,
        extraHttpRequestParams?: any
    ): Observable<string> {
        const applicationId = application.id;
        this.application = application;
        return this.applicationApi.removeAssignmentFromApplication(applicationId, userId, extraHttpRequestParams).map(result => {
            const index = _.findIndex(this.application.assignments, obj => obj.id === userId);
            if (index !== -1) {
                this.application.assignments.splice(index, 1);
            }
            return result;
        });
    }

}
