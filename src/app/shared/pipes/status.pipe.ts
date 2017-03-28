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

import { Pipe, PipeTransform } from '@angular/core';

/**
 * StatusPipe
 *
 * @export
 * @class StatusPipe
 * @implements {PipeTransform}
 */
@Pipe({
    name: 'status'
})
export class StatusPipe implements PipeTransform {

    static names = [
        'invalid',
        'created',
        'submitted',
        'rescinded',
        'pending',
        'deactivated',
        'accepted',
        'denied',
    ];

    /**
     * implements PipeTransform
     *
     * @param {*} value
     * @param {*} [args]
     * @returns {*}
     *
     * @memberOf StatusPipe
     */
    transform(value: any, args?: any): any {
        const names = StatusPipe.names;
        const index = +value;
        if (isNaN(index) || names.length <= index || index < 0) {
            return null;
        }
        return names[index];
    }

}
