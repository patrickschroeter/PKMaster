import { Component, OnInit, HostBinding, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import {
    ConferenceService,
    ApplicationService,
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

    public conference: Conference;

    public agenda: AgendaItem[];

    public application: Application;

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private conferenceService: ConferenceService,
        private applicationService: ApplicationService
    ) { }

    ngOnInit() {
        this.getConference();
    }

    /**
     * Read Route Param and GET Application with param ID
     */
    private getConference(): void {
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
    }

    /**
     * creates an agenda of the conference applications
     * @param {Conference} conference
     */
    private getAgendaOfConference(conference: Conference): void {
        this.agenda = [];
        if (!conference.applications) { return; }
        /** TODO */ if (conference.application) { conference.applications = conference.application; }
        for (let i = 0, length = conference.applications.length; i < length; i++) {
            const application = conference.applications[i];
            let item = this.getItemOfAgenda(application.formId || application.form.id);
            if (!item) {
                item = {
                    formId: application.formId || application.form.id,
                    title: application.form.title,
                    applications: []
                };
                this.agenda.push(item);
            }
            item.applications.push(application);
        }
    }

    /**
     * returns the item of the agenda with the given pk
     * @param {String} formId
     */
    private getItemOfAgenda(formId: string): AgendaItem {
        for (let i = 0, length = this.agenda.length; i < length; i++) {
            const item = this.agenda[i];
            if (item.formId === formId) {
                return item;
            }
        }
        return null;
    }

    public selectApplication(application: Application) {
        this.application = application;
    }

}


export interface AgendaItem {
    formId: string;
    title: string;
    applications: Application[];
}
