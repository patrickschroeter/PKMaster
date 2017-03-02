import { Component, OnInit, ViewChild } from '@angular/core';
import * as _ from 'lodash';

/** Models */
import { FieldDto } from './../../../swagger';
import { Window } from './../../../models';
import { OverlayComponent } from './../../../modules/overlay';

@Component({
    selector: 'pk-modal-add-conference-list',
    templateUrl: './modal-add-conference-list.component.html',
    styleUrls: ['./modal-add-conference-list.component.scss'],
    exportAs: 'addListModal'
})
export class ModalAddConferenceListComponent implements OnInit, Window {

    @ViewChild('overlay') overlay: OverlayComponent;

    public save: Function;

    public newEntry: FieldDto[];

    constructor() { }

    ngOnInit() {
        this.addFieldToListForm();
    }

    /**
     * reset the form and open the overlay
     * @param {Object} options
     * @param {Number} options.[numberOfInputs]
     * @param {String[]} options.[values]
     */
    public open(options: {
        numberOfInputs: number,
        values: string[]
    }) {
        this.generateInputs(
            options ? options.numberOfInputs || 1 : 1,
            options ? options.values : []
        );
        this.overlay.toggle(true);
    }

    /**
     * generates the form with the given number of elements
     * @param {Number} number
     */
    private generateInputs(number: number, values: string[]): void {
        const form: FieldDto[] = [];
        for (let i = 0; i < number; i++) {
            form.push({
                fieldType: 'input',
                name: form.length.toString(),
                value: values ? values[i] : ''
            });
        }
        this.newEntry = form;
    }

    /**
     * adds a new fiel to the list form
     */
    public addFieldToListForm() {
        const form = _.cloneDeep(this.newEntry) || [];
        form.push({
            fieldType: 'input',
            name: form.length.toString(),
            value: ''
        });
        this.newEntry = form;
    }

    /**
     *  adds the new entry to the list
     */
    public addListEntry(form: { [key: string]: string}): void {
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
    private getValues(object: { [key: string]: string}): string[] {
        const result: string[] = [];
        for (let i = 0; i < this.newEntry.length; i++) {
            result.push(object[i] || '');
        }
        return result;
    }

}
