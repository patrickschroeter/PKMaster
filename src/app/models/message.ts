/**
 * A message for an alert
 *
 * @export
 * @class Message
 */
export class Message {

    /**
     * the id of the message
     *
     * @type {String}
     * @memberOf Message
     */
    public id: string;

    /**
     * the type of the message
     *
     * @type {string}
     * @memberOf Message
     */
    public type: string;

    /**
     * the content of the message
     *
     * @type {string}
     * @memberOf Message
     */
    public message: string;

    /**
     * the timeout of the message
     *
     * @type {*}
     * @memberOf Message
     */
    public timeout?: any;

    /**
     * Creates an instance of Message.
     *
     * @param {string} id
     * @param {string} type
     * @param {string} message
     *
     * @memberOf Message
     */
    constructor(id: string, type: string, message: string) {
        this.id = id;
        this.type = type;
        this.message = message;
    }
}
