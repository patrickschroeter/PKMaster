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
import { ConferenceConfig, Selectable, ApplicationsByFormId } from './../../../models';
import { ConferenceDto, ApplicationDto, CommentDto, UserDto } from './../../../swagger';
import { OverlayComponent } from './../../../modules/overlay';

/** Decorators */
import { Access } from './../../../shared/decorators/access.decorator';

/**
 * Component to display the details of a conference
 *
 * @export
 * @class ConferencesDetailComponent
 * @implements {OnInit}
 */
@Component({
    selector: 'pk-conferences-detail',
    templateUrl: './conferences-detail.component.html',
    styleUrls: ['./conferences-detail.component.scss']
})
export class ConferencesDetailComponent implements OnInit {

    /**
     * Default Layout Class
     *
     * @memberOf ConferencesDetailComponent
     */
    @HostBinding('class') classes = 'content--default';

    /**
     * the current conference
     *
     * @type {ConferenceDto}
     * @memberOf ConferencesDetailComponent
     */
    public conference: ConferenceDto;

    /**
     * the agenda of the conference, calculated from config
     *
     * @type {String[]}
     * @memberOf ConferencesDetailComponent
     */
    public agenda: string[];

    /**
     * a list of all possible members of the conference
     *
     * @type {UserDto[]}
     * @memberOf ConferencesDetailComponent
     */
    public members: UserDto[];

    /**
     * a list of all possible guests of the conference
     *
     * @type {UserDto[]}
     * @memberOf ConferencesDetailComponent
     */
    public guests: UserDto[];

    /**
     * Creates an instance of ConferencesDetailComponent.
     *
     * @param {ActivatedRoute} activatedRoute
     * @param {Router} router
     * @param {ModalService} modalService
     * @param {TranslationService} translationService
     * @param {ConferenceService} conferenceService
     * @param {ApplicationService} applicationService
     * @param {UserService} userService
     *
     * @memberOf ConferencesDetailComponent
     */
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

    /**
     * implements OnInit
     *
     * @memberOf ConferencesDetailComponent
     */
    ngOnInit() {
        this.getConference();
        this.getUsers();
    }

    /**
     * Read Route Param and GET Application with param ID
     *
     * @private
     *
     * @memberOf ConferencesDetailComponent
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
     * get all available pk members and guests
     *
     * @private
     *
     * @memberOf ConferencesDetailComponent
     */
    private getUsers(): void {
        this.userService.getMembers().subscribe(result => {
            this.members = result;
        });
        this.userService.getGuests().subscribe(result => {
            this.guests = result;
        });
    }

    /**
     * get all applications for the config
     *
     * @returns
     *
     * @memberOf ConferencesDetailComponent
     */
    public populateConfigWithApplications() {
        if (!this.conference.applications) { return; }

        const applicationsByForm: ApplicationsByFormId = {};
        for (let i = 0; i < this.conference.applications.length; i++) {
            const application: ApplicationDto = this.conference.applications[i];
            if (typeof application.filledForm === 'string') { application.filledForm = JSON.parse(application.filledForm); }
            applicationsByForm[application.formId] = applicationsByForm[application.formId] || [];
            applicationsByForm[application.formId].push(application);
        }

        for (let i = 0; i < this.conference.config.length; i++) {
            this.setApplication(this.conference.config[i], applicationsByForm);
        }
    }

    /**
     * insert the applications into the config with formId
     *
     * @private
     * @param {ConferenceConfig} config
     * @param {Object} applications
     *
     * @memberOf ConferencesDetailComponent
     */
    private setApplication(config: ConferenceConfig, applications: ApplicationsByFormId) {
        if (config.formId) {
            config.entries = applications[config.formId];
        } else if (config.type === 'config') {
            for (let i = 0; i < config.entries.length; i++) {
                this.setApplication(config.entries[i], applications);
            }
        }
    }

    /**
     * Delete the conference
     *
     *
     * @memberOf ConferencesDetailComponent
     */
    public deleteConference() {
        this.modalService.createConfirmationModal({
            title: this.translationService.translate('confirmDeleteConferenceHeader'),
            message: this.translationService.translate('confirmDeleteConferenceContent'),
            /**
             * Confirm callback on confirm
             */
            confirm: () => {
                this.conferenceService.removeConference(this.conference.id).subscribe(result => {
                    this.router.navigate(['conferences']);
                    this.modalService.destroyModal();
                });
            }
        });
    }

    /**
     * open the assign member modal
     *
     * @memberOf ConferencesDetailComponent
     */
    public assignMemberModal(): void {
        this.assignUserModal(
            this.members.map(obj => new Selectable(obj.id, `${obj.lastname}, ${obj.firstname}`)),
            'assignMemberHeader'
        );
    }

    /**
     * open the assign guest modal
     *
     * @memberOf ConferencesDetailComponent
     */
    public assignGuestModal(): void {
        this.assignUserModal(
            this.guests.map(obj => new Selectable(obj.id, `${obj.lastname}, ${obj.firstname}`)),
            'assignGuestHeader'
        );
    }

    /**
     * opens the assignment modal for users
     *
     * @private
     * @param {Selectable[]} list
     * @param {string} title
     *
     * @memberOf ConferencesDetailComponent
     */
    private assignUserModal(list: Selectable[], title: string): void {
        this.modalService.createListModal({
            title: this.translationService.translate('title'),
            list: list,
            click: this.assignUser.bind(this),

            selectedValues: this.conference.attendants.map(obj => obj.id),

            emptyText: this.translationService.translate('noUsersAvailable')
        });
    }

    /**
     * add/remove a user from the conference
     *
     * @private
     * @param {Selectable} user
     *
     * @memberOf ConferencesDetailComponent
     */
    private assignUser(user: Selectable): void {
        const param: ConferenceDto = _.cloneDeep(this.conference);
        if (!param.attendants) { param.attendants = []; }
        const index = _.findIndex(param.attendants, obj => obj.id === user.value);
        if (index === -1) {
            this.userService.getUserById(user.value).subscribe(result => {
                param.attendants.push(result);
                console.log(param);
                this.saveConference(param);
            });
        } else {
            param.attendants.splice(index, 1);
            this.saveConference(param);
        }
    }

    /**
     * save the conference
     *
     * @private
     * @param {ConferenceDto} param
     *
     * @memberOf ConferencesDetailComponent
     */
    private saveConference(param: ConferenceDto): void {
        this.conferenceService.saveConference(param).subscribe(result => {
            this.conference = result;
            this.modalService.updateSelectedValues(this.conference.attendants.map(obj => obj.id));
        });
    }

    /**
     * remove an assigned user from the conference
     *
     * @param {UserDto} user
     *
     * @memberOf ConferencesDetailComponent
     */
    public unassignUser(user: UserDto) {
        this.assignUser(new Selectable(user.id, user.id));
    }

}
