/**
 * A configuratoin Object for Conferences
 *
 * @export
 * @class ConferenceConfig
 */
export class ConferenceConfig {

    /**
     * the title of the config object
     *
     * @type {string}
     * @memberOf ConferenceConfig
     */
    public title: string;

    /**
     * the description of the config object
     *
     * @type {string}
     * @memberOf ConferenceConfig
     */
    public description?: string;

    /**
     * the footer text of the config object
     *
     * @type {string}
     * @memberOf ConferenceConfig
     */
    public footer?: string;

    /**
     * type of config.entries
     *
     * @type {('config' | 'application' | 'list')}
     * @memberOf ConferenceConfig
     */
    public type?: 'config' | 'application' | 'list';

    /**
     * id of form to sort into config.entries
     *
     * @type {string}
     * @memberOf ConferenceConfig
     */
    public formId?: string;

    /**
     * shown attributes of application
     *
     * @type {string[]}
     * @memberOf ConferenceConfig
     */
    public fields?: string[];

    /**
     * the elements of the config
     * contains: config, application or list
     *
     * @type {any[]}
     * @memberOf ConferenceConfig
     */
    public entries?: any[];

    /**
     * Creates an instance of ConferenceConfig.
     *
     * @param {string} title
     * @param {string} [description]
     * @param {string} [footer]
     *
     * @memberOf ConferenceConfig
     */
    constructor(title: string, description?: string, footer?: string) {
        this.title = title;
        this.description = description;
        this.footer = footer;
    }
}
