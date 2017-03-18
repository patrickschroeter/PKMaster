import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';

/** Services */
import {
    ConferenceService,
    PermissionService
} from './../../core';
import { ModalService } from './../../modules/overlay';
import { TranslationService } from './../../modules/translation';
import { AlertService } from './../../modules/alert';

/** Models */
import {
    ConferenceDetailDto,
    ConferenceListDto,
    ConferenceCreateDto,
    FieldDto
} from './../../swagger';

import { Access, OnAccess } from './../../shared/decorators/access.decorator';

/**
 * A Component to list all conferences
 *
 * @export
 * @class ConferencesComponent
 * @implements {OnInit}
 */
@Component({
    selector: 'pk-conferences',
    templateUrl: './conferences.component.html',
    styleUrls: ['./conferences.component.scss']
})
export class ConferencesComponent implements OnInit, OnAccess {

    /**
     * Default Layout Class for component
     *
     * @memberOf ConferencesComponent
     */
    @HostBinding('class') classes = 'content--default';

    /**
     * a list of all conferences
     *
     * @type {ConferenceDto[]}
     * @memberOf ConferencesComponent
     */
    public conferences: ConferenceListDto[];

    /**
     * Form config for creating a new conference
     *
     * @type {FieldDto[]}
     * @memberOf ConferencesComponent
     */
    public newConference: FieldDto[];

    /**
     * Creates an instance of ConferencesComponent.
     *
     * @param {Router} router
     * @param {ModalService} modalService
     * @param {TranslationService} translationService
     * @param {ConferenceService} conferenceService
     *
     * @memberOf ConferencesComponent
     */
    constructor(
        /** Angular */
        private router: Router,
        /** Modules */
        private modalService: ModalService,
        private translationService: TranslationService,
        /** Services */
        private conferenceService: ConferenceService,
        public permission: PermissionService,
        public alert: AlertService
    ) { }

    /**
     * implements OnInit
     *
     * @memberOf ConferencesComponent
     */
    ngOnInit() {
        this.getConferences();
        this.initConferenceForm();
    }

    /**
     * load all conferences
     *
     * @memberOf ConferencesComponent
     */
    public getConferences(): void {
        this.conferenceService.getConferences().subscribe(conferences => {
            this.conferences = conferences;
        });
    }

    /**
     * initialize the add conference form
     *
     * @memberOf ConferencesComponent
     */
    @Access('EditConferences')
    public initConferenceForm(): void {
        this.newConference = this.conferenceService.getConferenceForm();
    }

    /**
     * create a new conference from input
     *
     * @param {ConferenceCreateDto} form
     *
     * @memberOf ConferencesComponent
     */
    @Access('EditConferences')
    public createConference(form: ConferenceCreateDto): void {
        this.conferenceService.createNewConference(form).subscribe(conference => {
            if (conference['id']) {
                this.router.navigate([`/conferences/`, conference['id'], 'edit']);
            }
        });
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
        if (!conference) { return; }
        const index = _.findIndex(this.conferences, (obj: ConferenceDetailDto) => obj.id === conference.id);
        if (index !== -1) {
            this.conferences.splice(index, 1);
        }
    }
}
