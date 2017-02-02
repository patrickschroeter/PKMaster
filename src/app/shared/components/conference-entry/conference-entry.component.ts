import { Component, OnInit, Input, ViewChild, Output, EventEmitter, Inject } from '@angular/core';
import * as _ from 'lodash';

/** Services */
import {
    PermissionService,
    FormService
} from './../../../core';
import { ModalService, OverlayComponent } from './../../../modules/overlay';
import { TranslationService } from './../../../modules/translation';
import {
    WindowService
} from './../../';

/** Models */
import { ConferenceConfig, Selectable } from './../../../models';
import { Application, Field } from './../../../swagger';
import {
    ModalAddConferenceEntryComponent,
    ModalAddConferenceTableEntryComponent
 } from './../../';

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

    private formLabel: string;

    private numberOfTableFields: number;

    constructor(
        /** Modules */
        private translationService: TranslationService,
        private modalService: ModalService,
        /** Services */
        private permission: PermissionService,
        private formService: FormService,
        @Inject('EntryModalService') private entryModalService: WindowService,
        @Inject('TableEntryModalService') private tableEntryModalService: WindowService
    ) { }

    ngOnInit() {
        this.setNumberOfTableFields();
    }

    /**
     * calculates the number of table fields
     */
    public setNumberOfTableFields() {
        if (this.entry.type !== 'table') { return; }
        if (!this.entry.entries || !this.entry.entries.length) {
            this.numberOfTableFields = 1;
        } else {
            this.numberOfTableFields = _.cloneDeep(this.entry.entries).sort((a, b) => a > b ? -1 : 1)[0].length;
        }
    }

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
        this.formLabel = undefined;
        this.modalService.destroyModal();
    }

    /**
     * open the add entry modal
     */
    public openTableEntryModal(): void {
        this.tableEntryModalService
        .setModalSave(this.addTableEntry.bind(this))
        .openModal({
            numberOfInputs: this.numberOfTableFields
        });
    }

    /**
     * add a new line to the table
     * @param {String[]} entry
     */
    private addTableEntry(entry: string[]): void {
        this.numberOfTableFields = this.numberOfTableFields > entry.length ? this.numberOfTableFields : entry.length;
        this.entry.entries = this.entry.entries || [];
        this.entry.entries.push(entry);
    }

    /**
     * opens the modal to edit the table entry
     * @param {String[]} element
     * @param {Number} index
     */
    public openEditTableEntryModal(element: string[], index: number): void {
        this.tableEntryModalService
        .setModalSave(result => {
            this.updateTableEntry(result, index);
        })
        .openModal({
            numberOfInputs: this.numberOfTableFields,
            values: element
        });
    }

    /**
     * update the element at index
     * @param {String[]} element
     * @param {Number} index
     */
    private updateTableEntry(element: string[], index: number): void {
        this.entry.entries[index] = element;
    }

    /**
     * remove the given element from the config, if no element is given the element itself is removed from the parent
     * @param {ConferenceConfig} [element]
     */
    public removeElement(element?: ConferenceConfig<any>): void {
        if (!element) {
            this.remove.emit(this.entry);
        } else {
            const index = _.findIndex(this.entry.entries, obj => obj === element);
            if (index !== -1) {
                this.entry.entries.splice(index, 1);
            }
        }
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
            this.setNumberOfTableFields();
        }
    }

    /**
     * gets the label of the form with the given id
     * @param {String} id
     */
    public getLabelOfForm(id: string): string {
        if (this.formLabel) { return this.formLabel; }
        if (!this.forms) { return this.formLabel; }
        for (let i = 0, length = this.forms.length; i < length; i++) {
            const form = this.forms[i];
            if (form.value === id) {
                return this.formLabel = form.label;
            }
        }
        return this.formLabel;
    }

    /**
     * edit the displayed form fields
     */
    public editFormFields() {
        console.error('TODO');
    }

}
