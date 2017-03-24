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
 * AcceptApplication
 *
 * @export
 * @interface AcceptApplication
 */
export interface AcceptApplication {

    /**
     * Accept Message
     *
     * @type {String}
     * @memberOf AcceptApplication
     */
    accept_message: string;

    /**
     * Flag to indicate if the Application requires changes
     *
     * @type {Boolean}
     * @memberOf AcceptApplication
     */
    accept_requiresChanges: boolean;
}
