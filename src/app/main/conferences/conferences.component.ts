import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';

/** Services */
import { ConferenceService } from './../../core';
import { ModalService } from './../../modules/overlay';
import { TranslationService } from './../../modules/translation';

/** Models */
import { ConferenceDetailDto, ConferenceCreateDto, FieldDto } from './../../swagger';

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
export class ConferencesComponent implements OnInit {

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
    public conferences: ConferenceDetailDto[];

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
    ) { }

    /**
     * implements OnInit
     *
     * @memberOf ConferencesComponent
     */
    ngOnInit() {
        this.conferenceService.getConferences().subscribe(conferences => {
            this.conferences = conferences;
        });

        this.newConference = this.conferenceService.getConferenceForm();
    }

    /**
     * create a new conference from input
     *
     * @param {ConferenceCreateDto} form
     *
     * @memberOf ConferencesComponent
     */
    public createConference(form: ConferenceCreateDto): void {
        this.conferenceService.createNewConference(form).subscribe(conference => {
            if (conference['id']) {
                this.router.navigate([`/conferences/`, conference['id'], 'edit']);
            }
        });
    }

    /**
     * clone conference
     *
     * @param {ConferenceCreateDto} conference
     *
     * @memberOf ConferencesComponent
     */
    public cloneConference(conference: ConferenceCreateDto) {
        const param: ConferenceCreateDto = new ConferenceCreateDto(conference as ConferenceDetailDto);
        param.description = 'Copy of ' + param.description;
        this.createConference(param);
    }

    /**
     * Remove conference from conferences
     *
     * @param {ConferenceDetailDto} conference
     * @returns {void}
     *
     * @memberOf ConferencesComponent
     */
    public removeConference(conference: ConferenceDetailDto): void {
        if (!conference) { return; }
        const index = _.findIndex(this.conferences, (obj: ConferenceDetailDto) => obj.id === conference.id);
        if (index !== -1) {
            this.conferences.splice(index, 1);
        }
    }
}
