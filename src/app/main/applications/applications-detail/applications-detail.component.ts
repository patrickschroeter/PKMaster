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
import { ApplicationDto, CommentDto, UserDto } from './../../../swagger';
import { Selectable } from './../../../models';

/** Decorators */
import { Access } from './../../../shared/decorators/access.decorator';

@Component({
    selector: 'pk-applications-detail',
    templateUrl: './applications-detail.component.html',
    styleUrls: ['./applications-detail.component.scss']
})
export class ApplicationsDetailComponent implements OnInit {
    @HostBinding('class') classes = 'content--default';

    private _application: ApplicationDto;

    get application() { return this._application; }
    set application(application: ApplicationDto) { this._application = application; }

    public addComment: Array<any>;
    public savingComment: Boolean;

    public conferences: any[];

    public user: UserDto;
    public users: Selectable[];
    public userLabels: { [id: string]: string } = {};

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

    ngOnInit() {

        /** Read Route Param and GET Application with param ID */
        this.activatedRoute.params.forEach((params: Params) => {
            this.applicationService.getApplicationById(params['id']).subscribe((application) => {
                if (!application) { return this.router.navigate(['/applications']); }
                this.application = application;
            }, error => {
                console.error(error);
                this.router.navigate(['/applications']);
            });
        });

        /** init the form */
        this.initAddCommentForm();

        /** get all conferences */
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

        this.getUsers();
    }

    /**
     * initializes or resets the add comment form
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
                styles: [
                    'small'
                ]
            },
            {
                fieldType: 'checkbox',
                name: 'requiresChanges',
                label: 'Requires Changes',
                styles: [
                    'small'
                ]
            }
        ];
    }

    /**
     * get users as Selectable[]
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
     * update the application with the given one
     * @param {Application} application
     */
    public updateApplication(application: ApplicationDto): void {
        this.application = application;
    }

    /**
     * Creates and adds a new comment to the application
     * @param {Comment} values
     */
    public createNewComment(values: CommentDto): void {
        const comment: CommentDto = values;
        comment.created = new Date();
        this.auth.getUser().subscribe(user => {
            comment.user = user;
            comment.userId = user.id;
            comment.isPrivate = !!comment.isPrivate;
            comment.requiresChanges = !!comment.requiresChanges;
            // TODO: send to server
            this.savingComment = true;

            this.applicationService.addCommentToApplication(comment).subscribe(result => {
                this.application.comments = this.application.comments || [];
                this.application.comments.push(result);
                this.savingComment = false;
                this.initAddCommentForm();
            });
        });
    }


    /**
     * Opens the modal to add an application to a conference
     */
    public addApplicationToConferenceModal(): void {
        this.modalService.createListModal({
            title: this.translationService.translate('addApplicationToConference'),
            list: this.conferences,
            click: this.addApplicationToConference.bind(this),
            isFluid: true,

            selectedValue: this.application.conferenceId,

            emptyText: this.translationService.translate('noConferencesAvailable'),
            redirect: this.permission.hasPermission('ReadConferences'),
            redirectText: this.translationService.translate('createNewConference'),
            redirectParam: ['conferences']
        });
    }

    /**
     * Add the application to the conference
     * @param {Selectable} data - the selected element
     */
    private addApplicationToConference(data: Selectable): void {
        this.applicationService.assignConferenceToApplication(this.application, data.value).subscribe(application => {
            this.application = application;
            this.modalService.destroyModal();
        });
    }

    /**
     * Creates a confirmation modal to confirm submitting the selected application
     * @param {Application} application - the application to submit
     */
    public submitApplicationModal(application: ApplicationDto): void {
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
     * @param {Application} application - the application to submit
     */
    private submitApplication(application: ApplicationDto): void {
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
     * @param {Application} application - the application to rescind
     */
    public rescindApplicationModal(application: ApplicationDto): void {
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
     * @param {Application} application - the application to rescind
     */
    private rescindApplication(application: ApplicationDto): void {
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
     * @param {Application} application - the application to deactovate
     */
    public deactivateApplicationModal(application: ApplicationDto): void {
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
     * @param {Application} application - the application to deactovate
     */
    private deactivateApplication(application: ApplicationDto): void {
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
     * @param {Selectable} user
     */
    public assignUser(user: Selectable): void {
        const param = _.cloneDeep(this.application);
        if (!param.assignments) { param.assignments = []; }
        const index = _.findIndex(param.assignments, obj => obj.id === user.value);
        if (index === -1) {
            this.userService.getUserById(user.value).subscribe(result => {
                param.assignments.push(result);
                this.saveApplication(param);
            });
        } else {
            param.assignments.splice(index, 1);
            this.saveApplication(param);
        }
    }

    private saveApplication(param: ApplicationDto): void {
        this.applicationService.updateApplication(param).subscribe(result => {
            this.application = result;
            this.modalService.updateSelectedValues(this.application.assignments.map(obj => obj.id));
        });
    }

    /**
     * remove user from the application
     * @param {String} userId
     */
    public unassignUser(userId: string) {
        this.assignUser(new Selectable(userId, userId));
    }

    /**
     * open the confirm dialog for the validation
     * @param {Application} application
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
