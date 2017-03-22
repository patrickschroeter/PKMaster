import { Component, OnInit, HostBinding, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as _ from 'lodash';

/** Services */
import {
    ApplicationService,
    AuthenticationService,
    PermissionService,
    ConferenceService,
    UserService
} from 'app/core';
import { AlertService } from 'app/modules/alert';
import { OverlayComponent, ModalService } from 'app/modules/overlay';
import { TranslationService } from 'app/modules/translation';

/** Models */
import {
    ApplicationDetailDto,
    CommentCreateDto,
    UserDetailDto,
    CommentDto,
    Status
} from './../../../swagger';
import { Selectable } from './../../../models';

/** Decorators */
import { Access, OnAccess } from 'app/shared/decorators/access.decorator';

/**
 * The ApplicationsDetailComponent
 *
 * @export
 * @class ApplicationsDetailComponent
 * @implements {OnInit}
 */
@Component({
    selector: 'pk-applications-detail',
    templateUrl: './applications-detail.component.html',
    styleUrls: ['./applications-detail.component.scss']
})
export class ApplicationsDetailComponent implements OnInit, OnAccess {
    @HostBinding('class') classes = 'content--default';

    private _application: ApplicationDetailDto;

    get application() { return this._application; }
    set application(application: ApplicationDetailDto) { this._application = application; }

    public conferences: any[];

    public user: UserDetailDto;
    public users: Selectable[];
    public userLabels: { [id: string]: string } = {};

    public status = Status;

    /**
     * Creates an instance of ApplicationsDetailComponent.
     * @param {Router} router
     * @param {ActivatedRoute} activatedRoute
     * @param {AlertService} alert
     * @param {TranslationService} translationService
     * @param {ModalService} modalService
     * @param {ApplicationService} applicationService
     * @param {AuthenticationService} auth
     * @param {PermissionService} permission
     * @param {ConferenceService} conferenceService
     * @param {UserService} userService
     *
     * @memberOf ApplicationsDetailComponent
     */
    constructor(
        /** Angular */
        private router: Router,
        private activatedRoute: ActivatedRoute,
        /** Modules */
        public alert: AlertService,
        private translationService: TranslationService,
        private modalService: ModalService,
        /** Services */
        private applicationService: ApplicationService,
        private auth: AuthenticationService,
        public permission: PermissionService,
        private conferenceService: ConferenceService,
        private userService: UserService
    ) { }

    /**
     * Implements OnInit
     *
     * @memberOf ApplicationsDetailComponent
     */
    ngOnInit() {

        /** Read Route Param and GET Application with param ID */
        this.getApplicationByRouteParam();

        /** get all conferences */
        this.getConferenceList();

        /** get users for assignment */
        this.getUsers();
    }

    /**
     * Read Route Param and GET Application with param ID
     *
     * @private
     *
     * @memberOf ApplicationsDetailComponent
     */
    private getApplicationByRouteParam(): void {
        this.activatedRoute.params.forEach((params: Params) => {
            this.applicationService.getApplicationById(params['id']).subscribe((application) => {
                if (!application) { return this.router.navigate(['/applications']); }
                this.application = application;

                if (!this.permission.hasPermission('ReadApplications') && !this.isOwner() && !this.isAssigned()) {
                    return this.router.navigate(['/applications']);
                }
                if (this.application.hasStatus(Status.CREATED, Status.RESCINDED) && this.application.form.deprecated) {
                    this.alert.setAlert(
                        this.translationService.translate('updateRequiredHeader'),
                        this.translationService.translate('updateRequiredContent')
                    );
                }


            }, error => {
                console.error(error);
                this.router.navigate(['/applications']);
            });
        });
    }

    /**
     * get all conferences as list
     *
     * @private
     *
     * @memberOf ApplicationsDetailComponent
     */
    private getConferenceList(): void {
        this.conferenceService.getConferences().subscribe(conferences => {
            this.conferences = [];
            for (let i = 0; i < conferences.length; i++) {
                const conference = conferences[i];
                this.conferences.push({
                    label: conference.description,
                    value: conference.id
                });
            }
        });
    }

    /**
     * get users as Selectable[]
     *
     * @private
     *
     * @memberOf ApplicationsDetailComponent
     */
    private getUsers(): void {
        this.userService.getUsers().subscribe(users => {
            this.users = users.map(obj => new Selectable(obj.id, `${obj.lastname}, ${obj.firstname}`));
            users.forEach((value) => {
                this.userLabels[value.id] = `${value.lastname}, ${value.firstname}`;
            });
        });
        this.auth.getUser().subscribe(user => {
            this.user = user;
        });
    }

    /**
     * check if the current user is assigned to the application
     *
     * @returns {Boolean}
     *
     * @memberOf ApplicationsDetailComponent
     */
    public isAssigned(): boolean {
        return this.application &&
            this.application.assignments &&
            this.user &&
            this.application.assignments.map(obj => obj.id).indexOf(this.user.id) !== -1;
    }

    /**
     * check if the current user is owner of the application
     *
     * @returns {boolean}
     *
     * @memberOf ApplicationsDetailComponent
     */
    public isOwner(): boolean {
        return this.user.id === this.application.user.id;
    }

    /**
     * update the application with the given one
     *
     * @param {ApplicationDetailDto} application
     *
     * @memberOf ApplicationsDetailComponent
     */
    public updateApplication(application: ApplicationDetailDto): void {
        this.application.update(application);
    }

    /**
     * Opens the modal to add an application to a conference
     *
     * @memberOf ApplicationsDetailComponent
     */
    public addApplicationToConferenceModal(): void {
        this.modalService.createListModal({
            title: this.translationService.translate('addApplicationToConference'),
            list: this.conferences,
            click: this.addApplicationToConference.bind(this),
            isFluid: true,

            selectedValue: this.application.conference ? this.application.conference.id : null,

            emptyText: this.translationService.translate('noConferencesAvailable'),
            redirect: this.permission.hasPermission('ReadConferences'),
            redirectText: this.translationService.translate('createNewConference'),
            redirectParam: ['conferences']
        });
    }

    /**
     * Add the application to the conference
     *
     * @private
     * @param {Selectable} data
     *
     * @memberOf ApplicationsDetailComponent
     */
    private addApplicationToConference(data: Selectable): void {
        this.applicationService.assignConferenceToApplication(this.application, data.value).subscribe((result: ApplicationDetailDto) => {
            this.application.update(result);
            this.modalService.destroyModal();
        });
    }

    /**
     * Creates a confirmation modal to confirm submitting the selected application
     *
     * @param {ApplicationDetailDto} application
     *
     * @memberOf ApplicationsDetailComponent
     */
    public submitApplicationModal(application: ApplicationDetailDto): void {
        this.modalService.createConfirmationModal({
            title: this.translationService.translate('confirmSubmitApplicationHeader'),
            message: this.translationService.translate('confirmSubmitApplicationContent'),
            confirm: () => {
                this.submitApplication(application);
            }
        });
    }

    /**
     * Submit the selected application
     *
     * @private
     * @param {ApplicationDetailDto} application
     *
     * @memberOf ApplicationsDetailComponent
     */
    private submitApplication(application: ApplicationDetailDto): void {
        this.applicationService.submitApplication(application).subscribe((result: ApplicationDetailDto) => {
            this.alert.setSuccessHint(
                `submitApplication${application.id}`,
                this.translationService.translate('applicationSubmitted')
            );
            this.application.update(result);
            this.modalService.destroyModal();
        });
    }

    /**
     * Creates a confirmation modal to confirm rescinding the selected application
     *
     * @param {ApplicationDetailDto} application
     *
     * @memberOf ApplicationsDetailComponent
     */
    public rescindApplicationModal(application: ApplicationDetailDto): void {
        this.modalService.createConfirmationModal({
            title: this.translationService.translate('confirmRescindApplicationHeader'),
            message: this.translationService.translate('confirmRescindApplicationContent'),
            confirm: () => {
                this.rescindApplication(application);
            }
        });
    }

    /**
     * Rescingd the selected application
     *
     * @private
     * @param {ApplicationDetailDto} application
     *
     * @memberOf ApplicationsDetailComponent
     */
    private rescindApplication(application: ApplicationDetailDto): void {
        this.applicationService.rescindApplication(application).subscribe((result: ApplicationDetailDto) => {
            this.alert.setSuccessHint(
                `rescindApplication${application.id}`,
                this.translationService.translate('applicationRescinded')
            );
            this.application.update(result);
            this.modalService.destroyModal();
        });
    }

    /**
     * Creates a confirmation modal to confirm deactivating the selected application
     *
     * @param {ApplicationDetailDto} application
     *
     * @memberOf ApplicationsDetailComponent
     */
    public deactivateApplicationModal(application: ApplicationDetailDto): void {
        this.modalService.createConfirmationModal({
            title: this.translationService.translate('confirmDeactivateApplicationHeader'),
            message: this.translationService.translate('confirmDeactivateApplicationContent'),
            confirm: () => {
                this.deactivateApplication(application);
            }
        });
    }

    /**
     * Deactivate the selected application
     *
     * @private
     * @param {ApplicationDetailDto} application
     *
     * @memberOf ApplicationsDetailComponent
     */
    private deactivateApplication(application: ApplicationDetailDto): void {
        this.applicationService.deactivateApplication(application).subscribe((result: ApplicationDetailDto) => {
            this.alert.setSuccessHint(
                `deactivateApplication${application.id}`,
                this.translationService.translate('applicationDeactivated')
            );
            this.application.update(result);
            this.modalService.destroyModal();
        });
    }

    /**
     * save the application on server
     *
     * @private
     * @param {ApplicationDetailDto} param
     *
     * @memberOf ApplicationsDetailComponent
     */
    private saveApplication(param: ApplicationDetailDto): void {
        this.applicationService.updateApplication(param).subscribe((result: ApplicationDetailDto) => {
            this.application.update(result);
        });
    }

    /**
     * open the confirm dialog for the validation
     *
     * @memberOf ApplicationsDetailComponent
     */
    public validateApplication(): void {
        this.modalService.createConfirmationModal({
            title: this.translationService.translate('confirmValidateApplicationHeader'),
            message: this.translationService.translate('confirmValidateApplicationHeader'),
            confirm: () => {
                this.applicationService.confirmApplication(true, this.application).subscribe(result => {
                    this.updateApplication(result);
                    this.modalService.destroyModal();
                });
            },
            cancel: () => {
                this.applicationService.confirmApplication(false, this.application).subscribe(result => {
                    this.updateApplication(result);
                    this.modalService.destroyModal();
                });
            },
            confirmText: this.translationService.translate('confirmValidateApplicationSave'),
            cancelText: this.translationService.translate('confirmValidateApplicationCancel')
        });
    }
}
