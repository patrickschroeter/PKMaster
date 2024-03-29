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

import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';

/** Services */
import {
    ConferenceService,
    PermissionService
} from 'app/core';
import { ModalService } from 'app/modules/overlay';
import { TranslationService } from 'app/modules/translation';
import { AlertService } from 'app/modules/alert';

import { ListService, List } from 'app/shared';

/** Models */
import {
    ConferenceDetailDto,
    ConferenceListDto,
    ConferenceCreateDto,
    FieldDto
} from 'app/swagger';

import { Access, OnAccess } from 'app/shared/decorators/access.decorator';

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
    styleUrls: ['./conferences.component.scss'],
    providers: [
        ListService
    ]
})
export class ConferencesComponent extends List<ConferenceListDto> implements OnInit, OnAccess {

    @HostBinding('class') classes = 'content--default';

    public conferences: ConferenceListDto[];
    public newConference: FieldDto[];

    public list: ConferenceListDto[];

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
        public alert: AlertService,
        public listService: ListService
    ) {
        super(listService);
    }

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

            this.initListDependencies(conferences);
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
