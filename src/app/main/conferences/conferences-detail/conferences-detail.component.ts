import { Component, OnInit, HostBinding, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import {
    ConferenceService,
    ApplicationService,
    AuthenticationService,
    PermissionService
} from './../../../core';
import { Conference, Application, Comment } from './../../../swagger';

import { OverlayComponent } from './../../../modules/overlay';

import { Access } from './../../../shared';

@Component({
    selector: 'pk-conferences-detail',
    templateUrl: './conferences-detail.component.html',
    styleUrls: ['./conferences-detail.component.scss']
})
export class ConferencesDetailComponent implements OnInit {
    @HostBinding('class') classes = 'content--default';
    @ViewChild('acceptOverlay') acceptOverlay: OverlayComponent;

    public conference: Conference;

    public agenda: AgendaItem[];

    public application: Application;

    public acceptForm;

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private conferenceService: ConferenceService,
        private applicationService: ApplicationService,
        private auth: AuthenticationService,
        private permission: PermissionService
    ) { }

    ngOnInit() {
        /** Read Route Param and GET Application with param ID */
        this.activatedRoute.params.forEach((params: Params) => {
            this.conferenceService.getConferenceById(params['id']).subscribe(conference => {
                if (!conference) { return this.router.navigate(['/conferences']); };
                this.conference = conference;
                this.getAgendaOfConference(conference);
            }, error => {
                console.error(error);
                this.router.navigate(['/conferences']);
            });
        });

        this.initAcceptForm();
    }

    public initAcceptForm() {
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
        ]
    }

    /**
     * @description creates an agenda of the conference applications
     */
    private getAgendaOfConference(conference: Conference) {
        this.agenda = [];
        if (!conference.applications) { return; }
        /** TODO */ if (conference.application) { conference.applications = conference.application; }
        for (let i = 0, length = conference.applications.length; i < length; i++) {
            let application = conference.applications[i];
            let item = this.getItemOfAgenda(application.formId);
            if (!item) {
                item = {
                    formId: application.formId,
                    applications: []
                };
                this.agenda.push(item);
            }
            item.applications.push(application);
        }
    }

    /**
     * @description returns the item of the agenda with the given pk
     */
    private getItemOfAgenda(formId: string): AgendaItem {
        for (let i = 0, length = this.agenda.length; i < length; i++) {
            let item = this.agenda[i];
            if (item.formId === formId) {
                return item;
            }
        }
        return null;
    }

    public selectApplication(application: Application) {
        this.application = application;
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
            this.initAcceptForm();
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
            this.initAcceptForm();
        });
    }

    /**
     * @description adds the comment to the current application
     */
    public createNewComment(values: Comment) {
        let comment: Comment = values;
        comment.created = new Date();
        this.auth.getUser().subscribe(user => {
            comment.user = user;
            // TODO: send to server
            if (!this.application.comments) {
                this.application.comments = [];
            }
            setTimeout(() => {
                this.application.comments.push(comment);
            }, 500);
        });
    }

}


export interface AgendaItem {
    formId: string,
    applications: Application[];
}
