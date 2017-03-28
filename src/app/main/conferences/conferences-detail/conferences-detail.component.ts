/**
 *
 * @author Patrick Schröter <patrick.schroeter@hotmail.de>
 *
 * @license CreativeCommons BY-NC-SA 4.0 2017
 *
 * This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/.
 *
 */

import { Component, OnInit, HostBinding, ViewChild } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRoute, Router, Params } from '@angular/router';
import * as _ from 'lodash';

/** Services */
import {
    ConferenceService,
    ApplicationService,
    PermissionService,
    UserService
} from 'app/core';
import { ModalService } from 'app/modules/overlay';
import { AlertService } from 'app/modules/alert';
import { TranslationService } from 'app/modules/translation';

/** Models */
import { ConferenceConfig, Selectable, ApplicationsByFormId } from 'app/models';
import {
    ConferenceDetailDto,
    ApplicationDetailDto,
    ApplicationListDto,
    CommentDto,
    UserDetailDto,
    UserListDto,
    AttendantCreateDto
} from 'app/swagger';
import { OverlayComponent } from 'app/modules/overlay';

import { Access, OnAccess } from 'app/shared/decorators/access.decorator';

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
export class ConferencesDetailComponent implements OnInit, OnAccess {

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
    public conference: ConferenceDetailDto;

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
     * @type {UserDetailDto[]}
     * @memberOf ConferencesDetailComponent
     */
    public members: UserDetailDto[];

    /**
     * a list of all possible guests of the conference
     *
     * @type {UserDetailDto[]}
     * @memberOf ConferencesDetailComponent
     */
    public guests: UserDetailDto[];

    private modalType: string;

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
        public alert: AlertService,
        /** Services */
        private conferenceService: ConferenceService,
        private applicationService: ApplicationService,
        private userService: UserService,
        public permission: PermissionService
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
    @Access('ReadConferences')
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
    @Access('ReadConferences')
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
    @Access('ReadConferences')
    public populateConfigWithApplications() {
        if (!this.conference.config) { return; }
        this.conferenceService.getApplicationsByConference(this.conference.id).subscribe((result: ApplicationDetailDto[]) => {

            const applicationsByForm: ApplicationsByFormId = {};
            for (let i = 0; i < result.length; i++) {
                const application: ApplicationDetailDto = result[i];
                applicationsByForm[application.form.id] = applicationsByForm[application.form.id] || [];
                applicationsByForm[application.form.id].push(application);
            }

            for (let i = 0; i < this.conference.config.length; i++) {
                this.setApplication(this.conference.config[i], applicationsByForm);
            }

        });
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
    @Access('ReadConferences')
    private setApplication(config: ConferenceConfig, applications: ApplicationsByFormId) {
        if (!config || !applications) { return; }
        if (config.formId) {
            config.entries = applications[config.formId];
        } else if (config.type === 'config') {
            if (!config.entries) { config.entries = []; }
            for (let i = 0; i < config.entries.length; i++) {
                this.setApplication(config.entries[i], applications);
            }
        }
    }

    /**
     * Remove conference from conferences
     *
     * @param {ConferenceDetailDto} conference
     * @returns {void}
     *
     * @memberOf ConferencesComponent
     */
    @Access('EditConferences')
    public removeConference(conference: ConferenceDetailDto): void {
        this.router.navigate(['conferences']);
    }

    /**
     * open the assign member modal
     *
     * @memberOf ConferencesDetailComponent
     */
    @Access('EditConferences')
    public assignMemberModal(): void {
        this.modalType = 'members';
        this.modalService.createListModal({
            title: this.translationService.translate('assignMemberHeader'),
            list: this.members.map(obj => new Selectable(obj.id, `${obj.lastname}, ${obj.firstname}`)),
            click: this.assignUser.bind(this),

            selectedValues: this.conference.members.map((obj: UserListDto) => obj.id),

            emptyText: this.translationService.translate('noUsersAvailable')
        });
    }

    /**
     * open the assign guest modal
     *
     * @memberOf ConferencesDetailComponent
     */
    @Access('EditConferences')
    public assignGuestModal(): void {
        this.modalType = 'guests';
        this.modalService.createListModal({
            title: this.translationService.translate('assignGuestHeader'),
            list: this.guests.map(obj => new Selectable(obj.id, `${obj.lastname}, ${obj.firstname}`)),
            click: this.assignUser.bind(this),

            selectedValues: this.conference.guests.map((obj: UserListDto) => obj.id),

            emptyText: this.translationService.translate('noUsersAvailable')
        });
    }

    /**
     * assign of unassign the selected user
     *
     * @private
     * @param {Selectable} user
     * @returns {void}
     *
     * @memberOf ConferencesDetailComponent
     */
    @Access('EditConferences')
    private assignUser(user: Selectable): void {
        const group: string = this.modalType;
        const isMember: boolean = group === 'members';
        if (!group) { return; }
        const type = isMember ? AttendantCreateDto.TypeOfAttendanceEnum.Member : AttendantCreateDto.TypeOfAttendanceEnum.Guest;
        const attendant = _.find(
            isMember ? this.conference.members : this.conference.guests,
            (obj: UserListDto) => obj.id === user.value
        );
        if (!attendant) {
            this.conferenceService.assignAttendantToConference(this.conference, new AttendantCreateDto(user.value, type))
                .subscribe((result: ConferenceDetailDto) => {
                    this.conference.update(result);
                    this.populateConfigWithApplications();
                    this.updateSelectedUsers();
                }, (error: Response) => {
                    this.alert.setAlert(error.statusText, error.text());
                });
        } else {
            this.conferenceService.removeAttendantFromConference(this.conference, new AttendantCreateDto(attendant.id, type))
                .subscribe((result: string) => {
                    this.updateSelectedUsers();
                });
        }
    }

    /**
     * update the Selected Values in the ModalService
     *
     * @private
     *
     * @memberOf ConferencesDetailComponent
     */
    @Access('EditConferences')
    private updateSelectedUsers() {
        if (this.modalType) {
            if (this.modalType === 'members') {
                this.modalService.updateSelectedValues(this.conference.members.map(obj => obj.id));
            } else {
                this.modalService.updateSelectedValues(this.conference.guests.map(obj => obj.id));
            }
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
    @Access('EditConferences')
    private saveConference(param: ConferenceDetailDto): void {
        this.conferenceService.saveConference(param).subscribe(result => {
            this.conference.update(result);
            this.populateConfigWithApplications();
        });
    }

    /**
     * remove an assigned user from the conference
     *
     * @param {UserDetailDto} user
     *
     * @memberOf ConferencesDetailComponent
     */
    @Access('EditConferences')
    public unassignUser(user: UserDetailDto, type: string) {
        this.modalType = type;
        this.assignUser(new Selectable(user.id, user.id));
    }

}
