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
