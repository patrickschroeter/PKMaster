import { Component, OnInit, Input, ViewChild } from '@angular/core';
import * as _ from 'lodash';

/** Services */
import {
    PermissionService,
    FormService
} from './../../../core';
import { ModalService, OverlayComponent } from './../../../modules/overlay';
import { TranslationService } from './../../../modules/translation';

/** Models */
import { ConferenceConfig, Selectable } from './../../../models';
import { Application, Field } from './../../../swagger';

/** Decorators */
import { Access } from './../../../shared';

@Component({
    selector: 'pk-conference-entry',
    templateUrl: './conference-entry.component.html',
    styleUrls: ['./conference-entry.component.scss']
})
export class ConferenceEntryComponent implements OnInit {

    @ViewChild('overlay') overlay: OverlayComponent;

    @Input() index: string;
    @Input() config: ConferenceConfig<any>;

    private forms: Selectable[];

    public tableForm: Field[];

    constructor(
        private permission: PermissionService,
        private translationService: TranslationService,
        private modalService: ModalService,
        private formService: FormService
    ) { }

    ngOnInit() {
        this.formService.getForms().subscribe(result => {
            this.forms = result.map(obj => new Selectable(obj.id, obj.title));
        });

        this.addFieldToTableForm();
    }

    /**
     * add a new config element to the form
     * @param {ConferenceConfig} entry
     */
    public addConfigElement(entry: ConferenceConfig<any>) {
        if (this.config.type !== 'config') { return; }
        this.config.entries = this.config.entries || [];
        this.config.entries.push(entry);
    }

    /**
     * adds a new fiel to the table form
     */
    public addFieldToTableForm() {
        const form = _.cloneDeep(this.tableForm) || [];
        form.push({
            fieldType: 'input',
            name: form.length.toString(),
            styles: [
                'small'
            ]
        });
        this.tableForm = form;
    }

    /**
     * open the modal to set the genericId of the config
     */
    @Access('EditRoles')
    public setGenericIdModal(): void {
        this.modalService.createListModal({
            title: this.translationService.translate('setGenericId'),
            list: this.forms,
            click: this.setGenericId.bind(this),

            selectedValue: this.config.genericId,

            emptyText: this.translationService.translate('noFormsAvailable'),
            redirect: this.permission.hasPermission('EditForms'),
            redirectText: this.translationService.translate('createNewForm'),
            redirectParam: ['', 'forms']
        });
    }

    /**
     * set the given genericId
     * @param {Selectable} data
     */
    @Access('EditRoles')
    private setGenericId(data: Selectable): void {
        this.config.genericId = data.value;
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
        this.config.entries = this.config.entries || [];
        this.config.entries.push(entry);
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

}
