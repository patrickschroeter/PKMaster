import { Component, OnInit, HostBinding, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

/** Services */
import {
    ApplicationService,
    AuthenticationService,
    PermissionService,
    ConferenceService
} from './../../../core';
import { AlertService } from './../../../modules/alert';
import { OverlayComponent, ModalService } from './../../../modules/overlay';
import { TranslationService } from './../../../modules/translation';

/** Models */
import { Application, Comment } from './../../../swagger';
import { Selectable } from './../../../models';

/** Decorators */
import { Access } from './../../../shared';

@Component({
    selector: 'pk-applications-detail',
    templateUrl: './applications-detail.component.html',
    styleUrls: ['./applications-detail.component.scss']
})
export class ApplicationsDetailComponent implements OnInit {
    @HostBinding('class') classes = 'content--default';

    private _application: Application;

    get application() { return this._application; }
    set application(application: Application) { this._application = application; }

    public addComment: Array<any>;
    public savingComment: Boolean;

    public conferences: any[];

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private applicationService: ApplicationService,
        private alert: AlertService,
        private auth: AuthenticationService,
        private permission: PermissionService,
        private conferenceService: ConferenceService,
        private translationService: TranslationService,
        private modalService: ModalService
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
            for (let i = 0, length = conferences.length; i < length; i++) {
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
     * update the application with the given one
     * @param {Application} application
     */
    public updateApplication(application: Application): void {
        this.application = application;
    }

    /**
     * Creates and adds a new comment to the application
     * @param {Comment} values
     */
    public createNewComment(values: Comment): void {
        const comment: Comment = values;
        comment.created = new Date();
        /** TODO */ comment.text = comment.message;
        this.auth.getUser().subscribe(user => {
            comment.user = user;
            comment.userId = user.id;
            comment.isPrivate = !!comment.isPrivate;
            comment.requiresChanges = !!comment.requiresChanges;
            // TODO: send to server
            this.savingComment = true;

            this.applicationService.addCommentToApplication(comment).subscribe(result => {
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
    public submitApplicationModal(application: Application): void {
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
    private submitApplication(application: Application): void {
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
    public rescindApplicationModal(application: Application): void {
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
    private rescindApplication(application: Application): void {
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
    public deactivateApplicationModal(application: Application): void {
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
    private deactivateApplication(application: Application): void {
        this.applicationService.deactivateApplication(application).subscribe(result => {
            this.alert.setSuccessHint(
                `deactivateApplication${application.id}`,
                this.translationService.translate('applicationDeactivated')
            );
            this.application = result;
            this.modalService.destroyModal();
        });
    }
}
