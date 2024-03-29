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

import { Component, OnInit, HostBinding, ViewChild, Inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as _ from 'lodash';

/** Services */
import {
    ConferenceService,
    FormService,
    PermissionService
} from 'app/core';
import { AlertService } from 'app/modules/alert';
import { TranslationService } from 'app/modules/translation';
import { WindowService } from 'app/shared';
import { ModalService } from 'app/modules/overlay';

/** Models */
import { ConferenceDetailDto, FormDetailDto, FieldDto } from 'app/swagger';
import { Selectable, ConferenceConfig } from 'app/models';
import { OverlayComponent } from 'app/modules/overlay';
import {
    ModalAddConferenceEntryComponent,
    ModalAddConferenceListComponent
} from 'app/shared';

/** Decorators */
import { Access, OnAccess } from 'app/shared/decorators/access.decorator';

/**
 * ConferencesEditComponent
 *
 * @export
 * @class ConferencesEditComponent
 * @implements {OnInit}
 * @implements {OnAccess}
 */
@Component({
    selector: 'pk-conferences-edit',
    templateUrl: './conferences-edit.component.html',
    styleUrls: ['./conferences-edit.component.scss'],
    providers: [
        { provide: 'EntryModalService', useClass: WindowService },
        { provide: 'ListModalService', useClass: WindowService }
    ]
})
export class ConferencesEditComponent implements OnInit, OnAccess {

    @HostBinding('class') classes = 'content--default';

    @ViewChild('overlay') overlay: OverlayComponent;

    @ViewChild('addEntryModal') addEntryModal: ModalAddConferenceEntryComponent;
    @ViewChild('addListModal') addListModal: ModalAddConferenceListComponent;

    public conference: ConferenceDetailDto;

    public forms: Selectable[];

    public editConferenceForm: FieldDto[];

    /**
     * Creates an instance of ConferencesEditComponent.
     * @param {Router} router
     * @param {ActivatedRoute} activatedRoute
     * @param {AlertService} alert
     * @param {TranslationService} translationService
     * @param {ModalService} modalService
     * @param {ConferenceService} conferenceService
     * @param {FormService} formService
     * @param {PermissionService} permission
     * @param {WindowService} entryModalService
     * @param {WindowService} listModalService
     *
     * @memberOf ConferencesEditComponent
     */
    constructor(
        /** Angular */
        private router: Router,
        private activatedRoute: ActivatedRoute,
        /** Modules */
        public alert: AlertService,
        private translationService: TranslationService,
        private modalService: ModalService,
        /** Services */
        private conferenceService: ConferenceService,
        private formService: FormService,
        public permission: PermissionService,
        @Inject('EntryModalService') private entryModalService: WindowService,
        @Inject('ListModalService') private listModalService: WindowService
    ) { }

    /**
     * implements OnInit
     *
     * @memberOf ConferencesEditComponent
     */
    ngOnInit() {
        this.getConference();
        this.getFormsAsSelectable();

        this.entryModalService.setModal(this.addEntryModal);
        this.listModalService.setModal(this.addListModal);
    }

    /**
     * get the current conference
     *
     * @private
     *
     * @memberOf ConferencesEditComponent
     */
    @Access('ReadConferences')
    private getConference() {
        this.activatedRoute.params.forEach((params: Params) => {
            this.conferenceService.getConferenceById(params['id']).subscribe(conference => {
                if (!conference) {
                    return this.onError(params['id']);
                } else {
                    this.conference = conference;
                    this.editConferenceForm = this.conferenceService.getConferenceForm(conference);
                }
            }, error => {
                console.error(error);
                return this.onError(params['id']);
            });
        });
    }

    /**
     * get all forms as Selectable array
     *
     * @private
     *
     * @memberOf ConferencesEditComponent
     */
    private getFormsAsSelectable() {
        this.formService.getForms().subscribe(result => {
            this.forms = result.map(obj => new Selectable(obj.id, obj.title));
        });
    }

    /**
     * onError function for infalid conference id
     *
     * @private
     * @param {string} id
     *
     * @memberOf ConferencesEditComponent
     */
    private onError(id: string) {
        this.router.navigate(['/conferences']);
        this.alert.setErrorHint('no-conference-found', this.translationService.translate('errorNoConferenceWithId', [id]), 2000);
    }

    /**
     * update the conference attribute
     *
     * @param {ConferenceDetailDto} conference
     *
     * @memberOf ConferencesEditComponent
     */
    @Access('EditConferences')
    public updateConference(conference: ConferenceDetailDto): void {
        const param: ConferenceDetailDto = _.cloneDeep(this.conference);
        param.description = conference.description;
        param.dateOfEvent = conference.dateOfEvent;
        param.endOfEvent = conference.endOfEvent;
        param.startOfEvent = conference.startOfEvent;
        param.roomOfEvent = conference.roomOfEvent;
        this.conferenceService.saveConference(param).subscribe(result => {
            this.conference = result;
            this.overlay.toggle();
        });
    }

    /**
     * open the add entry modal
     *
     * @memberOf ConferencesEditComponent
     */
    @Access('EditConferences')
    public openEntryModal(): void {
        this.entryModalService
            .setModal(this.addEntryModal)
            .setModalSave(this.addConfigElement.bind(this))
            .openModal();
    }

    /**
     * add a new config element to the form
     *
     * @param {ConferenceConfig} entry
     *
     * @memberOf ConferencesEditComponent
     */
    @Access('EditConferences')
    public addConfigElement(entry: ConferenceConfig) {
        this.conference.config = this.conference.config || [];
        this.conference.config.push(entry);
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
     * save the update conference
     *
     * @memberOf ConferencesEditComponent
     */
    @Access('EditConferences')
    public saveConference() {
        console.log(JSON.stringify(this.conference.config));
        this.conferenceService.saveConference(this.conference).subscribe(result => {
            this.conference = result;
            this.router.navigate(['conferences', result.id]);
        });
    }

    /**
     * remove the given element from the config
     *
     * @param {ConferenceConfig} element
     *
     * @memberOf ConferencesEditComponent
     */
    @Access('EditConferences')
    public removeElement(element: ConferenceConfig) {
        const index = _.findIndex(this.conference.config, (obj: ConferenceConfig) => obj === element);
        if (index !== -1) {
            this.conference.config.splice(index, 1);
        }
    }

}
