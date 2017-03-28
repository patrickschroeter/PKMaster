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

/**
 * An entry in a Select Overlay
 *
 * @export
 * @class Selectable
 */
export class Selectable {

    /**
     * the key/id of the element
     *
     * @type {String}
     * @memberOf Selectable
     */
    public value: string;

    /**
     * the displayed label of the element
     *
     * @type {String}
     * @memberOf Selectable
     */
    public label: string;

    /**
     * Creates an instance of Selectable.
     *
     * @param {String} value
     * @param {String} label
     *
     * @memberOf Selectable
     */
    constructor(value: string, label: string) {
        this.value = value;
        this.label = label;
    }
};
