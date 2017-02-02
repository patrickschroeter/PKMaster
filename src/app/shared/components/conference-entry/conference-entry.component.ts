import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';

/** Services */
import {
    PermissionService,
    FormService
} from './../../../core';
import { ModalService, OverlayComponent } from './../../../modules/overlay';
import { TranslationService } from './../../../modules/translation';
import { WindowService } from './../../';

/** Models */
import { ConferenceConfig, Selectable } from './../../../models';
import { Application, Field } from './../../../swagger';
import { ModalAddConferenceEntryComponent } from './../../';

/** Decorators */
import { Access } from './../../';

@Component({
    selector: 'pk-conference-entry',
    templateUrl: './conference-entry.component.html',
    styleUrls: ['./conference-entry.component.scss']
})
export class ConferenceEntryComponent implements OnInit {

    @ViewChild('overlay') overlay: OverlayComponent;

    @Input() index: string;
    @Input() entry: ConferenceConfig<any>;
    @Output() remove: EventEmitter<ConferenceConfig<any>> = new EventEmitter();

    private forms: Selectable[];
    private formLabel: string;

    public tableForm: Field[];

    constructor(
        /** Modules */
        private translationService: TranslationService,
        private modalService: ModalService,
        /** Services */
        private permission: PermissionService,
        private formService: FormService,
        private entryModalService: WindowService
    ) { }

    ngOnInit() {
        if (this.entry.type === 'application') {
            this.formService.getForms().subscribe(result => {
                this.forms = result.map(obj => new Selectable(obj.id, obj.title));
            });
        } else if (this.entry.type === 'table') {
            this.addFieldToTableForm();
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
    public addConfigElement(entry: ConferenceConfig<any>) {
        if (this.entry.type !== 'config') { return; }
        this.entry.entries = this.entry.entries || [];
        this.entry.entries.push(entry);
    }

    /**
     * adds a new fiel to the table form
     */
    public addFieldToTableForm() {
        const form = _.cloneDeep(this.tableForm) || [];
        form.push({
            fieldType: 'input',
            name: form.length.toString(),
            value: '',
            styles: [
                'small'
            ]
        });
        this.tableForm = form;
    }

    /**
     * open the modal to set the formId of the config
     */
    @Access('EditRoles')
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
    @Access('EditRoles')
    private setFormId(data: Selectable): void {
        this.entry.formId = data.value;
        this.modalService.destroyModal();
    }

    /**
     * opens the overlay to add a table entry
     */
    public openTableOverlay() {
        this.tableForm = _.cloneDeep(this.tableForm);
        this.overlay.toggle(true);
    }

    /**
     * add a new line to the table
     * @param {Object} form
     */
    public addTableEntry(form: Object): void {
        const entry: string[] = this.getValues(form);
        this.entry.entries = this.entry.entries || [];
        this.entry.entries.push(entry);
        this.overlay.toggle(false);
    }

    /**
     * recursively format object with index keys to array
     * @param {Object} object
     * @param {Number} [index]
     */
    private getValues(object: Object, index?: number): string[] {
        index = index || 0;
        const result = object[index];
        if (!result) { return []; }
        return [result].concat(this.getValues(object, 1 + index));
    }

    /**
     * remove the given element from the config, if no element is given the element itself is removed from the parent
     * @param {ConferenceConfig} [element]
     */
    public removeElement(element?: ConferenceConfig<any>) {
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

}
