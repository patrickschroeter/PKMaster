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

import { Component, OnInit, Input, ViewChild, Output, EventEmitter, Inject } from '@angular/core';
import * as _ from 'lodash';

/** Services */
import {
    PermissionService
} from 'app/core';
import { ModalService } from 'app/modules/overlay';
import { TranslationService } from 'app/modules/translation';
import { WindowService } from './../../';

/** Models */
import { ConferenceConfig, Selectable } from 'app/models';

/**
 * An configuration element of a conference
 *
 * @export
 * @class ConferenceEntryComponent
 * @implements {OnInit}
 */
@Component({
    selector: 'pk-conference-entry',
    templateUrl: './conference-entry.component.html',
    styleUrls: ['./conference-entry.component.scss']
})
export class ConferenceEntryComponent implements OnInit {

    @Input() index: string;
    @Input() forms: Selectable[];
    @Input() entry: ConferenceConfig;

    @Output() remove: EventEmitter<ConferenceConfig> = new EventEmitter();

    private numberOfInputs: Number;

    /**
     * Creates an instance of ConferenceEntryComponent.
     *
     * @param {TranslationService} translationService
     * @param {ModalService} modalService
     * @param {PermissionService} permission
     * @param {WindowService} entryModalService
     * @param {WindowService} listModalService
     *
     * @memberOf ConferenceEntryComponent
     */
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

    /**
     * implements OnInit
     *
     * @memberOf ConferenceEntryComponent
     */
    ngOnInit() {
    }

    /****************************************************
     * ENTRY
     */

    /**
     * remove itself from the parent
     *
     * @memberOf ConferenceEntryComponent
     */
    public removeElement(): void {
        this.remove.emit(this.entry);
    }

    /**
     * open the modal to edit the element
     *
     * @memberOf ConferenceEntryComponent
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
     *
     * @private
     * @param {ConferenceConfig} element
     *
     * @memberOf ConferenceEntryComponent
     */
    private editElement(element: ConferenceConfig): void {
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
     *
     * @memberOf ConferenceEntryComponent
     */
    public openEntryModal(): void {
        this.entryModalService
        .setModalSave(this.addConfigElement.bind(this))
        .openModal();
    }

    /**
     * add a new config element to the form
     *
     * @param {ConferenceConfig} entry
     * @returns {void}
     *
     * @memberOf ConferenceEntryComponent
     */
    public addConfigElement(entry: ConferenceConfig): void {
        if (this.entry.type !== 'config') { return; }
        this.entry.entries = this.entry.entries || [];
        this.entry.entries.push(entry);
    }

    /****************************************************
     * APPLICATION
     */

    /**
     * open the modal to set the formId of the config
     *
     * @memberOf ConferenceEntryComponent
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
     *
     * @private
     * @param {Selectable} data
     *
     * @memberOf ConferenceEntryComponent
     */
    private setFormId(data: Selectable): void {
        this.entry.formId = data.value;
        this.entry.fields = [];
        this.modalService.destroyModal();
    }

    /****************************************************
     * LIST
     */

    /**
     * open the add entry modal
     *
     * @memberOf ConferenceEntryComponent
     */
    public openListEntryModal(): void {
        this.listModalService
        .setModalSave(this.addListEntry.bind(this))
        .openModal({
            numberOfInputs: this.numberOfInputs
        });
    }

    /**
     * add a new line to the list
     *
     * @private
     * @param {string[]} entry
     *
     * @memberOf ConferenceEntryComponent
     */
    private addListEntry(entry: string[]): void {
        this.entry.entries = this.entry.entries || [];
        this.entry.entries.push(entry);
        this.updateNumberOfInputs(entry.length);
    }

    /**
     * update the number of inputs for list modal
     *
     * @param {Number} number
     *
     * @memberOf ConferenceEntryComponent
     */
    public updateNumberOfInputs(number: Number): void {
        this.numberOfInputs = !this.numberOfInputs || number > this.numberOfInputs ? number : this.numberOfInputs;
    }

}
