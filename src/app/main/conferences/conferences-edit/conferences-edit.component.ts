import { Component, OnInit, HostBinding, ViewChild, Inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as _ from 'lodash';

/** Services */
import {
    ConferenceService,
    FormService
} from './../../../core';
import { AlertService } from './../../../modules/alert';
import { TranslationService } from './../../../modules/translation';
import { WindowService } from './../../../shared';

/** Models */
import { Conference, Form, Field } from './../../../swagger';
import { Selectable, ConferenceConfig } from './../../../models';
import { OverlayComponent } from './../../../modules/overlay';
import {
    ModalAddConferenceEntryComponent,
    ModalAddConferenceTableEntryComponent
 } from './../../../shared';

/** TODO */ import { ApplicationApiMock } from './../../../core';

@Component({
    selector: 'pk-conferences-edit',
    templateUrl: './conferences-edit.component.html',
    styleUrls: ['./conferences-edit.component.scss'],
    providers: [
        { provide: 'EntryModalService', useClass: WindowService },
        { provide: 'TableEntryModalService', useClass: WindowService }
    ]
})
export class ConferencesEditComponent implements OnInit {
    @HostBinding('class') classes = 'content--default';

    @ViewChild('overlay') overlay: OverlayComponent;

    @ViewChild('addEntryModal') addEntryModal: ModalAddConferenceEntryComponent;
    @ViewChild('addTableEntryModal') addTableEntryModal: ModalAddConferenceTableEntryComponent;

    public conference: Conference;

    public forms: Selectable[];

    public editConferenceForm: Field[];

    constructor(
        /** Angular */
        private router: Router,
        private activatedRoute: ActivatedRoute,
        /** Modules */
        private alert: AlertService,
        private translationService: TranslationService,
        /** Services */
        private conferenceService: ConferenceService,
        private formService: FormService,
        @Inject('EntryModalService') private entryModalService: WindowService,
        @Inject('TableEntryModalService') private tableEntryModalService: WindowService
    ) { }

    ngOnInit() {
        this.getConference();
        this.getFormsAsSelectable();

        this.entryModalService.setModal(this.addEntryModal);
        this.tableEntryModalService.setModal(this.addTableEntryModal);
    }

    /**
     * get the current conference
     */
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
     */
    private getFormsAsSelectable() {
        this.formService.getForms().subscribe(result => {
            this.forms = result.map(obj => new Selectable(obj.id, obj.title));
        });
    }

    /**
     * onError function for infalid conference id
     * @param {String} id
     */
    private onError(id: string) {
        this.router.navigate(['/conferences']);
        this.alert.setErrorHint('no-conference-found', this.translationService.translate('errorNoConferenceWithId', [id]), 2000);
    }

    /**
     * update the conference attribute
     * @param {Conference} conference
     */
    public updateConference(conference: Conference): void {
        const param: Conference = _.cloneDeep(this.conference);
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
     */
    public openEntryModal(): void {
        this.entryModalService
            .setModal(this.addEntryModal)
            .setModalSave(this.addConfigElement.bind(this))
            .openModal();
    }

    /**
     * add a new config element to the form
     * @param {ConferenceConfig} entry
     */
    public addConfigElement(entry: ConferenceConfig<any>) {
        this.conference.config = this.conference.config || [];
        this.conference.config.push(entry);
    }

    /**
     * delete conference
     */
    public deleteConference() {
        console.error('TODO');
    }

    /**
     * save the update conference
     */
    public saveConference() {
        console.log(JSON.stringify(this.conference.config));
        this.conferenceService.saveConference(this.conference).subscribe(result => {
            this.conference = result;
            this.router.navigate(['conferences', result.id]);
        });
    }

    /**
     * remove the given element from the config
     * @param {ConferenceConfig} element
     */
    public removeElement(element: ConferenceConfig<any>) {
        const index = _.findIndex(this.conference.config, obj => obj === element);
        if (index !== -1) {
            this.conference.config.splice(index, 1);
        }
    }

}
