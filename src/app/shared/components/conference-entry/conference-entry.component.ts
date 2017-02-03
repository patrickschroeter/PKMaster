import { Component, OnInit, Input, ViewChild, Output, EventEmitter, Inject } from '@angular/core';
import * as _ from 'lodash';

/** Services */
import {
    PermissionService
} from './../../../core';
import { ModalService } from './../../../modules/overlay';
import { TranslationService } from './../../../modules/translation';
import { WindowService } from './../../';

/** Models */
import { ConferenceConfig, Selectable } from './../../../models';

/** Decorators */
import { Access } from './../../';

@Component({
    selector: 'pk-conference-entry',
    templateUrl: './conference-entry.component.html',
    styleUrls: ['./conference-entry.component.scss']
})
export class ConferenceEntryComponent implements OnInit {

    @Input() index: string;
    @Input() forms: Selectable[];
    @Input() entry: ConferenceConfig<any>;
    @Output() remove: EventEmitter<ConferenceConfig<any>> = new EventEmitter();

    constructor(
        /** Modules */
        private translationService: TranslationService,
        private modalService: ModalService,
        /** Services */
        private permission: PermissionService,
        /** Custom */
        @Inject('EntryModalService') private entryModalService: WindowService,
        @Inject('ListModalService') private listModalService: WindowService
    ) { }

    ngOnInit() {
    }

    /****************************************************
     * ENTRY
     */

    /**
     * remove itself from the parent
     */
    public removeElement(): void {
        this.remove.emit(this.entry);
    }

    /**
     * open the modal to edit the element
     */
    public openEditModal(): void {
        this.entryModalService
        .setModalSave(this.editElement.bind(this))
        .openModal({
            values: this.entry
        });
    }

    /**
     * edits the element
     * @param {ConferenceConfig} element
     */
    private editElement(element: ConferenceConfig<any>): void {
        this.entry.title = element.title;
        this.entry.description = element.description;
        this.entry.footer = element.footer;
        if (this.entry.type !== element.type) {
            this.entry.type = element.type;
            this.entry.entries = [];
        }
    }

    /****************************************************
     * CONFIG
     */

    /**
     * open the add entry modal
     */
    public openEntryModal(): void {
        this.entryModalService
        .setModalSave(this.addConfigElement.bind(this))
        .openModal();
    }

    /**
     * add a new config element to the form
     * @param {ConferenceConfig} entry
     */
    public addConfigElement(entry: ConferenceConfig<any>): void {
        if (this.entry.type !== 'config') { return; }
        this.entry.entries = this.entry.entries || [];
        this.entry.entries.push(entry);
    }

    /****************************************************
     * APPLICATION
     */

    /**
     * open the modal to set the formId of the config
     */
    public setFormIdModal(): void {
        this.modalService.createListModal({
            title: this.translationService.translate('setFormId'),
            list: this.forms,
            click: this.setFormId.bind(this),

            selectedValue: this.entry.formId,

            emptyText: this.translationService.translate('noFormsAvailable'),
            redirect: this.permission.hasPermission('EditForms'),
            redirectText: this.translationService.translate('createNewForm'),
            redirectParam: ['', 'forms']
        });
    }

    /**
     * set the given formId
     * @param {Selectable} data
     */
    private setFormId(data: Selectable): void {
        this.entry.formId = data.value;
        this.modalService.destroyModal();
    }

    /****************************************************
     * LIST
     */

    /**
     * open the add entry modal
     */
    public openListEntryModal(): void {
        this.listModalService
        .setModalSave(this.addListEntry.bind(this))
        .openModal({});
    }

    /**
     * add a new line to the list
     * @param {String[]} entry
     */
    private addListEntry(entry: string[]): void {
        this.entry.entries = this.entry.entries || [];
        this.entry.entries.push(entry);
    }

}
