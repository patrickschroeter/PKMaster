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

import { Component, Input } from '@angular/core';

/** Models */
import { FormDetailDto } from 'app/swagger';

/**
 * ButtonFormEditComponent
 *
 * @export
 * @class ButtonFormEditComponent
 */
@Component({
    selector: 'pk-button-form-edit',
    templateUrl: './button-form-edit.component.html'
})
export class ButtonFormEditComponent {

    @Input() form: FormDetailDto;

    /**
     * Creates an instance of ButtonFormEditComponent.
     *
     * @memberOf ButtonFormEditComponent
     */
    constructor() { }

}
