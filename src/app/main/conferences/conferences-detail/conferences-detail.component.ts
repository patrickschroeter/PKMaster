import { Component, OnInit, HostBinding, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import * as _ from 'lodash';

/** Services */
import {
    ConferenceService,
    ApplicationService,
    PermissionService,
    UserService
} from './../../../core';
import { ModalService } from './../../../modules/overlay';
import { TranslationService } from './../../../modules/translation';

/** Models */
import { ConferenceConfig, Selectable } from './../../../models';
import { ConferenceDto, ApplicationDto, CommentDto, UserDto } from './../../../swagger';
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

    public conference: ConferenceDto;

    public agenda: string[];

    public application: ApplicationDto;
    public users: Selectable[];
    public userLabels: { [id: string]: string } = {};

    constructor(
        /** Angular */
        private activatedRoute: ActivatedRoute,
        private router: Router,
        /** Modules */
        private modalService: ModalService,
        private translationService: TranslationService,
        /** Services */
        private conferenceService: ConferenceService,
        private applicationService: ApplicationService,
        private userService: UserService
    ) { }

    ngOnInit() {
        this.getConference();
        this.getUsers();
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
     * get users as Selectable[]
     */
    private getUsers(): void {
        this.userService.getUsers().subscribe(users => {
            this.users = users.map(obj => new Selectable(obj.id, `${obj.lastname}, ${obj.firstname}`));
            users.forEach((value) => {
                this.userLabels[value.id] = `${value.lastname}, ${value.firstname}`;
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
    private setApplication(config: ConferenceConfig, applications: Object) {
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

    /**
     * opens the assignment modal for users
     */
    public assignUserModal() {
        this.modalService.createListModal({
            title: this.translationService.translate('assignUserHeader'),
            list: this.users,
            click: this.assignUser.bind(this),

            selectedValues: this.conference.attendants.map(obj => obj.id),

            emptyText: this.translationService.translate('noUsersAvailable')
        });
    }

    /**
     * add/remove a user from the conference
     * @param {Selectable} user
     */
    private assignUser(user: Selectable): void {
        const param: ConferenceDto = _.cloneDeep(this.conference);
        if (!param.attendants) { param.attendants = []; }
        const index = _.findIndex(param.attendants, obj => obj.id === user.value);
        if (index === -1) {
            this.userService.getUserById(user.value).subscribe(retult => {
                param.attendants.push(retult);
                this.saveConference(param);
            });
        } else {
            param.attendants.splice(index, 1);
            this.saveConference(param);
        }
    }

    private saveConference(param: ConferenceDto): void {
        this.conferenceService.saveConference(param).subscribe(result => {
            this.conference = result;
            this.modalService.updateSelectedValues(this.conference.attendants.map(obj => obj.id));
        });
    }

    /**
     * remove user from the conference
     * @param {String} userId
     */
    public unassignUser(userId: string) {
        this.assignUser(new Selectable(userId, userId));
    }

}
