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
import { FieldDto } from 'app/swagger';

/**
 * DynamicFormDefaultComponent
 *
 * @export
 * @class DynamicFormDefaultComponent
 * @implements {OnInit}
 */
@Component({
    selector: 'pk-dynamic-form-default',
    templateUrl: './dynamic-form-default.component.html'
})
export class DynamicFormDefaultComponent {

    @Input() form: FieldDto[];

    @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();
    @Output() onCancel: EventEmitter<any> = new EventEmitter<any>();

    /**
     * Creates an instance of DynamicFormDefaultComponent.
     *
     * @memberOf DynamicFormDefaultComponent
     */
    constructor() { }

    /**
     * onSubmit event
     *
     * @param {*} form
     *
     * @memberOf DynamicFormDefaultComponent
     */
    public submit(form: any) {
        this.onSubmit.emit(form);
    }

    /**
     * onCancel event
     *
     * @memberOf DynamicFormDefaultComponent
     */
    public cancel() {
        this.onCancel.emit();
    }
}
