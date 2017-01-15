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

@Component({
    selector: 'pk-applications-detail',
    templateUrl: './applications-detail.component.html',
    styleUrls: ['./applications-detail.component.scss']
})
export class ApplicationsDetailComponent implements OnInit {
    @HostBinding('class') classes = 'content--default';

    @ViewChild('overlay') overlay: OverlayComponent;

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
        private conferenceService: ConferenceService
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
                value: '',
                required: true,
            },
            {
                fieldType: 'checkbox',
                name: 'isPrivate',
                label: 'Privat',
                value: false,
                required: false,
                styles: [
                    'small'
                ]
            },
            {
                fieldType: 'checkbox',
                name: 'requiresChanges',
                label: 'Requires Changes',
                value: false,
                required: false,
                styles: [
                    'small'
                ]
            }
        ];
    }

    /**
     * @description adds the comment to the current application
     */
    public createNewComment(values) {
        let comment: Comment = values;
        comment.created = new Date();
        this.auth.getUser().subscribe(user => {
            comment.user = user;
            // TODO: send to server
            this.savingComment = true;
            if (!this.application.comments) {
                this.application.comments = [];
            }
            this.initAddCommentForm();
            setTimeout(() => {
                this.application.comments.push(comment);
                this.savingComment = false;
            }, 500);
        });
    }

    // @Access('EditConferences')
    // public toggleApplicationConference() {
    //     this.isOpenApplicationConference = !this.isOpenApplicationConference;
    // }

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
            this.alert.setSuccessHint(`submitApplication${application.id}`, 'Application submitted');
        });
    }

    rescindApplication(application: Application) {
        this.applicationService.rescindApplication(application).subscribe(result => {
            this.alert.setSuccessHint(`rescindApplication${application.id}`, 'Application rescinded');
        });
    }

    deactivateApplication(application: Application) {
        this.applicationService.deactivateApplication(application).subscribe(result => {
            this.alert.setSuccessHint(`deactivateApplication${application.id}`, 'Application deactivated');
        });
    }
}
