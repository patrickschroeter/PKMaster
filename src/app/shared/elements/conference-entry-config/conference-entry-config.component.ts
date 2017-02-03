import { Component, OnInit, Input, Inject } from '@angular/core';
import * as _ from 'lodash';

/** Models */
import { ConferenceConfig, Selectable } from './../../../models';

@Component({
    selector: 'pk-conference-entry-config',
    templateUrl: './conference-entry-config.component.html',
    styleUrls: ['./conference-entry-config.component.scss']
})
export class ConferenceEntryConfigComponent implements OnInit {

    @Input() entry: ConferenceConfig<any>;
    @Input() forms: Selectable[];
    @Input() index: string;

    constructor() { }

    ngOnInit() {
    }

    /**
     * remove the given element from the config
     * @param {ConferenceConfig} element
     */
    public removeElement(element: ConferenceConfig<any>): void {
        const index = _.findIndex(this.entry.entries, obj => obj === element);
        if (index !== -1) {
            this.entry.entries.splice(index, 1);
        }
    }

    /**
     * ngFor trackByFn
     */
    public trackByFn(index, item) {
        return index;
    }

}
