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

import { Component, HostBinding } from '@angular/core';

/**
 * DeviderComponent
 *
 * @export
 * @class DeviderComponent
 * @implements {OnInit}
 */
@Component({
    selector: 'pk-devider',
    templateUrl: './devider.component.html',
    styleUrls: ['./devider.component.scss']
})
export class DeviderComponent {

    @HostBinding('class.devider') devider = true;
    @HostBinding('class.devider-element') deviderElement = true;

    /**
     * Creates an instance of DeviderComponent.
     *
     * @memberOf DeviderComponent
     */
    constructor() { }

}
