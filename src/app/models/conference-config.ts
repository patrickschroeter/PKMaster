export class ConferenceConfig<T> {
    public title: string;
    public description?: string;
    public footer?: string;

    /** type of config.entries */
    public type?: 'config' | 'application' | 'table';

    /** id of form to sort into config.entries */
    public formId?: string;
    /** shown attributes of application */
    public fields?: string[];

    public entries?: (T | ConferenceConfig<T> | string)[];

    constructor(title: string, description?: string, footer?: string) {
        this.title = title;
        this.description = description;
        this.footer = footer;
    }
}
