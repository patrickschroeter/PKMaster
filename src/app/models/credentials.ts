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
 * The Credentials Object of the user
 *
 * @export
 * @interface Credentials
 */
export interface Credentials {

    /**
     * the email
     *
     * @type {String}
     * @memberOf Credentials
     */
    email: string;

    /**
     * the password
     *
     * @type {String}
     * @memberOf Credentials
     */
    password: string;
}
