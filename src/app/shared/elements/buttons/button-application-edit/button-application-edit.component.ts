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

import { Component } from '@angular/core';

import { Button } from './../button.class';

/** Models */
import { ApplicationDetailDto } from 'app/swagger';

/**
 * ButtonApplicationEditComponent
 *
 * @export
 * @class ButtonApplicationEditComponent
 * @extends {Button}
 */
@Component({
  selector: 'pk-button-application-edit',
  templateUrl: './button-application-edit.component.html'
})
export class ButtonApplicationEditComponent extends Button {

    public application: ApplicationDetailDto;

    constructor() {
        super();
    }

}
