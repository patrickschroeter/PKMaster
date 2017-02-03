import { Component, OnInit, Input, Inject } from '@angular/core';
import * as _ from 'lodash';

/** Services */
import { WindowService } from './../../';

/** Models */
import { ConferenceConfig, Selectable } from './../../../models';

@Component({
    selector: 'pk-conference-entry-list',
    templateUrl: './conference-entry-list.component.html',
    styleUrls: ['./conference-entry-list.component.scss']
})
export class ConferenceEntryListComponent implements OnInit {

    @Input() entry: ConferenceConfig<any>;

    private numberOfListFields: number;

    constructor(
        @Inject('ListModalService') private listModalService: WindowService
    ) { }

    ngOnInit() {
        this.setNumberOfListFields();
    }

    /**
     * calculates the number of list fields
     */
    public setNumberOfListFields() {
        if (!this.entry || this.entry.type !== 'list') { return; }
        if (!this.entry.entries || !this.entry.entries.length) {
            this.numberOfListFields = 1;
        } else {
            this.numberOfListFields = _.cloneDeep(this.entry.entries).sort((a, b) => a > b ? -1 : 1)[0].length;
        }
    }

    /**
     * removes the list entry at the given index
     * @param {Number} index
     */
    public deleteListEntry(index: number) {
        if (index > -1 && this.entry && this.entry.entries) {
            this.entry.entries.splice(index, 1);
        }
    }

    /**
     * opens the modal to edit the list entry
     * @param {String[]} element
     * @param {Number} index
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
     * @param {String[]} entry
     * @param {Number} index
     */
    private updateListEntry(entry: string[], index: number): void {
        this.numberOfListFields = this.numberOfListFields > entry.length ? this.numberOfListFields : entry.length;
        if (this.entry && this.entry.entries) {
            this.entry.entries[index] = entry;
        }
    }

}
