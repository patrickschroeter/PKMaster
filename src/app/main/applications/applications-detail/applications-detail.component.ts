import { Component, OnInit, HostBinding, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import {
    ApplicationService,
    AuthenticationService,
    PermissionService,
    ConferenceService
} from './../../../core';
import { AlertService } from './../../../modules/alert';

import { Application, Comment } from './../../../swagger';

import { OverlayComponent } from './../../../modules/overlay';
import { TranslationService } from './../../../modules/translation';

import { Access } from './../../../shared';

@Component({
    selector: 'pk-applications-detail',
    templateUrl: './applications-detail.component.html',
    styleUrls: ['./applications-detail.component.scss']
})
export class ApplicationsDetailComponent implements OnInit {
    @HostBinding('class') classes = 'content--default';

    @ViewChild('overlay') overlay: OverlayComponent;
    @ViewChild('acceptOverlay') acceptOverlay: OverlayComponent;

    private _application: Application;

    get application() { return this._application; }
    set application(application: Application) { this._application = application; }

    public addComment: Array<any>;
    public savingComment: Boolean;

    public acceptForm: Array<any>;

    public conferences: any[];

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private applicationService: ApplicationService,
        private alert: AlertService,
        private auth: AuthenticationService,
        private permission: PermissionService,
        private conferenceService: ConferenceService,
        private translationService: TranslationService
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

        this.initAddCommentForm();
        this.acceptForm = [
            {
                fieldType: 'textarea',
                name: 'accept_message',
                label: 'Add Comment:',
                required: true
            },
            {
                fieldType: 'checkbox',
                name: 'accept_requiresChanges',
                label: 'Requires Changes',
                styles: [
                    'small'
                ]
            }
        ];

        this.conferenceService.getConferences().subscribe(conferences => {
            this.conferences = [];
            for (let i = 0, length = conferences.length; i < length; i++) {
                let conference = conferences[i];
                this.conferences.push({
                    label: conference.description,
                    value: conference.id
                });
            }
        });
    }

    /**
     * @description initializes or resets the add comment form
     */
    private initAddCommentForm() {
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
     * @description adds the comment to the current application
     */
    public createNewComment(values: Comment) {
        let comment: Comment = values;
        comment.created = new Date();
        /** TODO */ comment.text = comment.message;
        this.auth.getUser().subscribe(user => {
            comment.userId = user.id;
            comment.isPrivate = !! comment.isPrivate;
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
     * @description accepts the application (with condition)
     */
    @Access('EditApplications')
    public acceptApplication(form) {
        /** TODO */ this.createNewComment({ message: form.accept_message, requiresChanges: form.accept_requiredChanges, isPrivate: false });
        /** TODO */ this.application.status = { name: 'accepted' };
        this.applicationService.updateApplication(this.application).subscribe(application => {
            this.application = application;
            this.acceptOverlay.toggle();
        });
    }

    /**
     * @description declines the application with reasons
     */
    @Access('EditApplications')
    public declineApplication(form) {
        /** TODO */ this.createNewComment({ message: form.accept_message, requiresChanges: form.accept_requiredChanges, isPrivate: false });
        /** TODO */ this.application.status = { name: 'denied' };
        this.applicationService.updateApplication(this.application).subscribe(application => {
            this.application = application;
            this.acceptOverlay.toggle();
        });
    }

    public addApplicationToConference(data) {
        this.application.conferenceId = data.value;

        /* TODO */ this.application.status = { name: 'pending' };

        this.applicationService.updateApplication(this.application).subscribe(application => {
            this.application = application;
            this.overlay.toggle();
        });
    }

    submitApplication(application: Application) {
        this.applicationService.submitApplication(application).subscribe(result => {
            this.alert.setSuccessHint(`submitApplication${application.id}`, this.translationService.translate('applicationSubmitted'));
        });
    }

    rescindApplication(application: Application) {
        this.applicationService.rescindApplication(application).subscribe(result => {
            this.alert.setSuccessHint(`rescindApplication${application.id}`, this.translationService.translate('applicationRescinded'));
        });
    }

    deactivateApplication(application: Application) {
        this.applicationService.deactivateApplication(application).subscribe(result => {
            this.alert.setSuccessHint(`deactivateApplication${application.id}`,
            this.translationService.translate('applicationDeactivated'));
        });
    }
}
