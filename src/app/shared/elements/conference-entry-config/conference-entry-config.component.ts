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

import { Component, Input, Inject } from '@angular/core';
import * as _ from 'lodash';

/** Models */
import { ConferenceConfig, Selectable } from 'app/models';

/**
 * ConferenceEntryConfigComponent
 *
 * @export
 * @class ConferenceEntryConfigComponent
 * @implements {OnInit}
 */
@Component({
    selector: 'pk-conference-entry-config',
    templateUrl: './conference-entry-config.component.html',
    styleUrls: ['./conference-entry-config.component.scss']
})
export class ConferenceEntryConfigComponent {

    @Input() entry: ConferenceConfig;
    @Input() forms: Selectable[];
    @Input() index: string;

    /**
     * Creates an instance of ConferenceEntryConfigComponent.
     *
     * @memberOf ConferenceEntryConfigComponent
     */
    constructor() { }

    /**
     * remove the given element from the config
     *
     * @param {ConferenceConfig} element
     *
     * @memberOf ConferenceEntryConfigComponent
     */
    public removeElement(element: ConferenceConfig): void {
        const index = _.findIndex(this.entry.entries, (obj: any) => obj === element);
        if (index !== -1) {
            this.entry.entries.splice(index, 1);
        }
    }

    /**
     * ngFor trackByFn
     *
     * @param {number} index
     * @param {*} item
     * @returns
     *
     * @memberOf ConferenceEntryConfigComponent
     */
    public trackByFn(index: number, item: any) {
        return index;
    }

}
