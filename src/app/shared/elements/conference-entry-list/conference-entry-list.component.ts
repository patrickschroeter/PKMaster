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

import { Component, OnInit, Input, Inject, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';

/** Services */
import { WindowService } from './../../';

/** Models */
import { ConferenceConfig, Selectable } from 'app/models';

/**
 * A component to display a list of values
 *
 * @export
 * @class ConferenceEntryListComponent
 * @implements {OnInit}
 */
@Component({
    selector: 'pk-conference-entry-list',
    templateUrl: './conference-entry-list.component.html',
    styleUrls: ['./conference-entry-list.component.scss']
})
export class ConferenceEntryListComponent implements OnInit {

    @Input() entry: ConferenceConfig;
    @Output() change: EventEmitter<Number> = new EventEmitter<Number>();

    private numberOfListFields: number;

    /**
     * Creates an instance of ConferenceEntryListComponent.
     *
     * @param {WindowService} listModalService
     *
     * @memberOf ConferenceEntryListComponent
     */
    constructor(
        @Inject('ListModalService') private listModalService: WindowService
    ) { }

    /**
     * implements OnInit
     *
     * @memberOf ConferenceEntryListComponent
     */
    ngOnInit() {
        this.setNumberOfListFields();
    }

    /**
     * calculates the number of list fields
     *
     * @private
     * @returns {void}
     *
     * @memberOf ConferenceEntryListComponent
     */
    private setNumberOfListFields(): void {
        if (!this.entry || this.entry.type !== 'list') { return; }
        if (!this.entry.entries || !this.entry.entries.length) {
            this.numberOfListFields = 1;
        } else {
            // TODO: test
            this.numberOfListFields = _.cloneDeep(this.entry.entries).sort((a: any, b: any) => a > b ? -1 : 1)[0].length;
        }
        this.change.emit(this.numberOfListFields);
    }

    /**
     * removes the list entry at the given index
     *
     * @param {Number} index
     *
     * @memberOf ConferenceEntryListComponent
     */
    public deleteListEntry(index: number): void {
        if (index > -1 && this.entry && this.entry.entries) {
            this.entry.entries.splice(index, 1);
        }
    }

    /**
     * opens the modal to edit the list entry
     *
     * @param {String[]} element
     * @param {Number} index
     *
     * @memberOf ConferenceEntryListComponent
     */
    public openEditListEntryModal(element: string[], index: number): void {
        this.listModalService
        .setModalSave((result: string[]) => {
            this.updateListEntry(result, index);
        })
        .openModal({
            numberOfInputs: this.numberOfListFields,
            values: element
        });
    }

    /**
     * update the element at index
     *
     * @private
     * @param {String[]} entry
     * @param {Number} index
     *
     * @memberOf ConferenceEntryListComponent
     */
    private updateListEntry(entry: string[], index: number): void {
        this.numberOfListFields = this.numberOfListFields > entry.length ? this.numberOfListFields : entry.length;
        this.change.emit(this.numberOfListFields);
        if (this.entry && this.entry.entries) {
            this.entry.entries[index] = entry;
        }
    }

}
