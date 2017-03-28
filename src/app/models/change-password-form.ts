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
 * The Form Object to change the password
 *
 * @export
 * @interface PasswordForm
 */
export interface ChangePasswordForm {

    /**
     * the current password
     *
     * @type {string}
     * @memberOf PasswordForm
     */
    password: string;

    /**
     * the new password
     *
     * @type {string}
     * @memberOf PasswordForm
     */
    newpassword: string;
}
