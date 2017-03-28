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
 * An Alert Object
 *
 * @export
 * @interface Alert
 */
export interface Alert {

    /**
     * the title of the alert
     *
     * @type {string}
     * @memberOf Alert
     */
    title: string;

    /**
     * the content/messag of the alert
     *
     * @type {string}
     * @memberOf Alert
     */
    message: string;

    /**
     * a flag if the alert is open
     *
     * @type {boolean}
     * @memberOf Alert
     */
    isOpen: boolean;
};
