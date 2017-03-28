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

import { Component, OnInit, ViewChild } from '@angular/core';
import * as _ from 'lodash';

/** Models */
import { FieldDto } from 'app/swagger';
import { Window } from 'app/models';
import { OverlayComponent } from 'app/modules/overlay';

/**
 * ModalAddConferenceListComponent
 *
 * @export
 * @class ModalAddConferenceListComponent
 * @implements {OnInit}
 * @implements {Window}
 */
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

    /**
     * Creates an instance of ModalAddConferenceListComponent.
     *
     * @memberOf ModalAddConferenceListComponent
     */
    constructor() { }

    /**
     * implements OnInit
     *
     * @memberOf ModalAddConferenceListComponent
     */
    ngOnInit() {
        this.addFieldToListForm();
    }

    /**
     * reset the form and open the overlay
     *
     * @param {Object} options
     * @param {Number} options.[numberOfInputs]
     * @param {String[]} options.[values]
     *
     * @memberOf ModalAddConferenceListComponent
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
     *
     * @private
     * @param {number} number
     * @param {string[]} values
     *
     * @memberOf ModalAddConferenceListComponent
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
     *
     * @memberOf ModalAddConferenceListComponent
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
     *
     * @param {{ [key: string]: string}} form
     *
     * @memberOf ModalAddConferenceListComponent
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
     *
     * @private
     * @param {{ [key: string]: string}} object
     * @returns {string[]}
     *
     * @memberOf ModalAddConferenceListComponent
     */
    private getValues(object: { [key: string]: string}): string[] {
        const result: string[] = [];
        for (let i = 0; i < this.newEntry.length; i++) {
            result.push(object[i] || '');
        }
        return result;
    }

}
