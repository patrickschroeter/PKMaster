import { Component, OnInit, HostBinding, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

/** Services */
import {
    ConferenceService,
    ApplicationService,
    PermissionService
} from './../../../core';
import { ModalService } from './../../../modules/overlay';
import { TranslationService } from './../../../modules/translation';

/** Models */
import { ConferenceConfig } from './../../../models';
import { Conference, Application, Comment } from './../../../swagger';
import { OverlayComponent } from './../../../modules/overlay';

/** Decorators */
import { Access } from './../../../shared/decorators/access.decorator';

@Component({
    selector: 'pk-conferences-detail',
    templateUrl: './conferences-detail.component.html',
    styleUrls: ['./conferences-detail.component.scss']
})
export class ConferencesDetailComponent implements OnInit {
    @HostBinding('class') classes = 'content--default';

    public conference: Conference;

    public agenda: string[];

    public application: Application;

    constructor(
        /** Angular */
        private activatedRoute: ActivatedRoute,
        private router: Router,
        /** Modules */
        private modalService: ModalService,
        private translationService: TranslationService,
        /** Services */
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
                this.populateConfigWithApplications();
            }, error => {
                console.error(error);
                this.router.navigate(['/conferences']);
            });
        });
    }

    /**
     * get all applications for the config
     */
    public populateConfigWithApplications() {
        if (!this.conference.applications) { return; }

        const applicationsByForm = {};
        for (let i = 0, length = this.conference.applications.length; i < length; i++) {
            const application = this.conference.applications[i];
            if (typeof application.filledForm === 'string') { application.filledForm = JSON.parse(application.filledForm); }
            applicationsByForm[application.formId] = applicationsByForm[application.formId] || [];
            applicationsByForm[application.formId].push(application);
        }

        for (let i = 0, length = this.conference.config.length; i < length; i++) {
            this.setApplication(this.conference.config[i], applicationsByForm);
        }
    }

    /**
     * insert the applications into the config with formId
     * @param {ConferenceConfig} config
     * @param {Object} applications
     */
    private setApplication(config: ConferenceConfig<any>, applications: Object) {
        if (config.formId) {
            config.entries = applications[config.formId];
        } else if (config.type === 'config') {
            for (let i = 0, length = config.entries.length; i < length; i++) {
                this.setApplication(config.entries[i], applications);
            }
        }
    }

    /**
     * Delete the conference
     */
    public deleteConference() {
        this.modalService.createConfirmationModal({
            title: this.translationService.translate('confirmDeleteConferenceHeader'),
            message: this.translationService.translate('confirmDeleteConferenceContent'),
            confirm: () => {
                this.conferenceService.removeConference(this.conference.id).subscribe(result => {
                    this.router.navigate(['conferences']);
                    this.modalService.destroyModal();
                });
            }
        });
    }

}
