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
import { ConferenceDetailDto } from 'app/swagger';

/**
 * ButtonConferenceEditComponent
 *
 * @export
 * @class ButtonConferenceEditComponent
 */
@Component({
    selector: 'pk-button-conference-edit',
    templateUrl: './button-conference-edit.component.html'
})
export class ButtonConferenceEditComponent {

    @Input() conference: ConferenceDetailDto;

    /**
     * Creates an instance of ButtonConferenceEditComponent.
     *
     * @memberOf ButtonConferenceEditComponent
     */
    constructor() { }

}
