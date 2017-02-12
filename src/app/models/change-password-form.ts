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
