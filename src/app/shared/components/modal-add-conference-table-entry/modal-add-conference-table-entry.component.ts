import { Component, OnInit, ViewChild } from '@angular/core';
import * as _ from 'lodash';

/** Models */
import { Field } from './../../../swagger';
import { Window } from './../../';
import { OverlayComponent } from './../../../modules/overlay';

@Component({
    selector: 'pk-modal-add-conference-table-entry',
    templateUrl: './modal-add-conference-table-entry.component.html',
    styleUrls: ['./modal-add-conference-table-entry.component.scss'],
    exportAs: 'addTableEntryModal'
})
export class ModalAddConferenceTableEntryComponent implements OnInit, Window {

    @ViewChild('overlay') overlay: OverlayComponent;

    public save: Function;

    public newEntry: Field[];

    constructor() { }

    ngOnInit() {
        this.addFieldToTableForm();
    }

    /**
     * reset the form and open the overlay
     * @param {Object} options
     * @param {Number} options.[numberOfInputs]
     */
    public open(options: {
        numberOfInputs: number,
        values: string[]
    }) {
        this.generateInputs(options.numberOfInputs || 1, options.values);
        this.overlay.toggle(true);
    }

    /**
     * generates the form with the given number of elements
     * @param {Number} number
     */
    private generateInputs(number: number, values: string[]): void {
        const form = [];
        for (let i = 0; i < number; i++) {
            form.push({
                fieldType: 'input',
                name: form.length.toString(),
                value: values ? values[i] : '',
                styles: [
                    'small'
                ]
            });
        }
        this.newEntry = form;
    }

    /**
     * adds a new fiel to the table form
     */
    public addFieldToTableForm() {
        const form = _.cloneDeep(this.newEntry) || [];
        form.push({
            fieldType: 'input',
            name: form.length.toString(),
            value: '',
            styles: [
                'small'
            ]
        });
        this.newEntry = form;
    }

    /**
     *  adds the new entry to the table
     */
    public addTableEntry(form): void {
        if (this.save) {
            const entry: string[] = this.getValues(form);
            this.save(entry);
        }
        this.overlay.toggle(false);
    }

    /**
     * transforms the object to an array
     * @param {Object} object
     */
    private getValues(object: Object): string[] {
        const result = [];
        for (let i = 0, length = this.newEntry.length; i < length; i++) {
            result.push(object[i] || '');
        }
        return result;
    }

}
