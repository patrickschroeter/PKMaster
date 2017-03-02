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
} from './../../../core';
import { AlertService } from './../../../modules/alert';
import { OverlayComponent, ModalService } from './../../../modules/overlay';
import { TranslationService } from './../../../modules/translation';

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
import { Access } from './../../../shared/decorators/access.decorator';

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
export class ApplicationsDetailComponent implements OnInit {
    @HostBinding('class') classes = 'content--default';

    private _application: ApplicationDetailDto;

    get application() { return this._application; }
    set application(application: ApplicationDetailDto) { this._application = application; }

    public addComment: Array<any>;
    public savingComment: Boolean;

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
        private alert: AlertService,
        private translationService: TranslationService,
        private modalService: ModalService,
        /** Services */
        private applicationService: ApplicationService,
        private auth: AuthenticationService,
        private permission: PermissionService,
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

        /** init the form */
        this.initAddCommentForm();

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

                if (this.application.form.deprecated) {
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
     * initializes or resets the add comment form
     *
     * @private
     *
     * @memberOf ApplicationsDetailComponent
     */
    private initAddCommentForm(): void {
        this.addComment = [
            {
                fieldType: 'textarea',
                name: 'message',
                label: 'Add Comment:',
                required: true,
            },
            {
                fieldType: 'checkbox',
                name: 'isPrivate',
                label: 'Privat',
                styleIds: [
                    'small'
                ]
            },
            {
                fieldType: 'checkbox',
                name: 'requiresChanges',
                label: 'Requires Changes',
                styleIds: [
                    'small'
                ]
            }
        ];
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
     * update the application with the given one
     *
     * @param {ApplicationDetailDto} application
     *
     * @memberOf ApplicationsDetailComponent
     */
    public updateApplication(application: ApplicationDetailDto): void {
        this.application = application;
    }

    /**
     * Creates and adds a new comment to the application
     *
     * @param {CommentDto} values
     *
     * @memberOf ApplicationsDetailComponent
     */
    public createNewComment(values: CommentCreateDto): void {
        const comment: CommentCreateDto = new CommentCreateDto(values);

        this.savingComment = true;
        this.applicationService.addCommentToApplication(comment).subscribe((result: CommentDto[]) => {
            this.application.comments = result || [];
            this.savingComment = false;
            this.initAddCommentForm();
        });
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
        this.applicationService.assignConferenceToApplication(this.application, data.value).subscribe(application => {
            this.application = application;
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
        this.applicationService.submitApplication(application).subscribe(result => {
            this.alert.setSuccessHint(
                `submitApplication${application.id}`,
                this.translationService.translate('applicationSubmitted')
            );
            this.application = result;
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
        this.applicationService.rescindApplication(application).subscribe(result => {
            this.alert.setSuccessHint(
                `rescindApplication${application.id}`,
                this.translationService.translate('applicationRescinded')
            );
            this.application = result;
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
        this.applicationService.deactivateApplication(application).subscribe(result => {
            this.alert.setSuccessHint(
                `deactivateApplication${application.id}`,
                this.translationService.translate('applicationDeactivated')
            );
            this.application = result;
            this.modalService.destroyModal();
        });
    }

    /**
     * opens the assignment modal for users
     *
     * @memberOf ApplicationsDetailComponent
     */
    public assignUserModal() {
        this.modalService.createListModal({
            title: this.translationService.translate('assignUserHeader'),
            list: this.users,
            click: this.assignUser.bind(this),

            selectedValues: this.application.assignments ? this.application.assignments.map(obj => obj.id) : [],

            emptyText: this.translationService.translate('noUsersAvailable')
        });
    }

    /**
     * add/remove a user from the application
     *
     * @param {Selectable} user
     *
     * @memberOf ApplicationsDetailComponent
     */
    public assignUser(user: Selectable): void {
        const index = _.findIndex(this.application.assignments, (obj: UserDetailDto) => obj.id === user.value);
        if (index === -1) {
            this.applicationService.assignUserToApplication(this.application, user.value).subscribe((result: ApplicationDetailDto) => {
                this.application = result;
                this.modalService.updateSelectedValues(this.application.assignments.map(obj => obj.id));
            });
        } else {
            this.applicationService.removeAssignmentFromApplication(this.application, user.value).subscribe(result => {
                this.modalService.updateSelectedValues(this.application.assignments.map(obj => obj.id));
            });
        }
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
        this.applicationService.updateApplication(param).subscribe(result => {
            this.application = result;
        });
    }

    /**
     * remove user from the application
     *
     * @param {UserDetailDto} user
     *
     * @memberOf ApplicationsDetailComponent
     */
    public unassignUser(user: UserDetailDto) {
        this.assignUser(new Selectable(user.id, user.id));
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
