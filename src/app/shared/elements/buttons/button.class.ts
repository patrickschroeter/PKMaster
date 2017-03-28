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

import { Input } from '@angular/core';

import { ApplicationDetailDto, ApplicationListDto, Status } from 'app/swagger';

/**
 * Button
 *
 * @export
 * @class Button
 */
export class Button {

    @Input() public application: ApplicationDetailDto | ApplicationListDto;

    public status = Status;

    /**
     * Creates an instance of Button.
     *
     * @memberOf Button
     */
    constructor() { }

}
