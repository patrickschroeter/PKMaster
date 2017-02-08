import { Component, OnInit, Input, Inject, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';

/** Services */
import { WindowService } from './../../';

/** Models */
import { ConferenceConfig, Selectable } from './../../../models';

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

    /**
     * Input entry
     *
     * @type {ConferenceConfig}
     * @memberOf ConferenceEntryListComponent
     */
    @Input() entry: ConferenceConfig;

    /**
     * change event for numberOfInputs
     *
     * @type {EventEmitter<Number>}
     * @memberOf ConferenceEntryListComponent
     */
    @Output() change: EventEmitter<Number> = new EventEmitter<Number>();

    /**
     * number of fields in the list
     *
     * @private
     * @type {number}
     * @memberOf ConferenceEntryListComponent
     */
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
            this.numberOfListFields = _.cloneDeep(this.entry.entries).sort((a, b) => a > b ? -1 : 1)[0].length;
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
        .setModalSave(result => {
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
