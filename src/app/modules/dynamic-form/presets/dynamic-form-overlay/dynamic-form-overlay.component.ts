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

import { Component, Input, Output, EventEmitter } from '@angular/core';

/** Models */
import { FieldDto, ConferenceDetailDto } from 'app/swagger';

/**
 * A wrapper for an Dynamic Form in Overlay
 *
 * @export
 * @class DynamicFormOverlayComponent
 */
@Component({
    selector: 'pk-dynamic-form-overlay',
    templateUrl: './dynamic-form-overlay.component.html'
})
export class DynamicFormOverlayComponent {

    @Input() form: FieldDto[];

    @Output() save: EventEmitter<any> = new EventEmitter();

    /**
     * Creates an instance of DynamicFormOverlayComponent.
     *
     * @memberOf DynamicFormOverlayComponent
     */
    constructor() { }

    /**
     * emits the value of the form
     *
     * @param {any} value
     *
     * @memberOf DynamicFormOverlayComponent
     */
    public submit(value: any) {
        this.save.emit(value);
    }

}
