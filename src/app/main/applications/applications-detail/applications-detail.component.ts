import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ApplicationService, AuthenticationService } from './../../../core';
import { AlertService } from './../../../modules/alert';

import { Application, Comment } from './../../../swagger';

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

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private applicationService: ApplicationService,
        private alert: AlertService,
        private auth: AuthenticationService
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
        console.log(this.addComment);
    }

    /**
     * @description adds the comment to the current application
     */
    public createNewComment(values) {
        let comment: Comment = values;
        comment.created = new Date();
        this.auth.getUser().subscribe(user => {
            comment.author = user;
            // TODO: send to server
            this.savingComment = true;
            if (!this.application.comments) {
                this.application.comments = [];
            }
            this.application.comments.push(comment);
            this.initAddCommentForm();
            setTimeout(() => {
                this.savingComment = false;
            }, 500);
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
