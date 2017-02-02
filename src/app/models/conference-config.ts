export class ConferenceConfig<T> {
    public title: string;
    public description: string;
    public footer: string;

    /** type of config.entries */
    public type: 'config' | 'application' | 'table';

    /** id of form to sort into config.entries */
    public genericId: string;
    /** shown attributes of application */
    public fields: string[];

    public entries: (T | ConferenceConfig<T> | string)[];

    constructor(title: string, description?: string, footer?: string) {
        this.title = title;
        this.description = description;
        this.footer = footer;
    }

    /**
     * sets the id for sorting in entries;
     * @param {String} id
     */
    public setIdOfGeneric(id: string) {
        this.genericId = id;
    }

    /**
     * set the given entries, returns this
     * @param {T|ConferenceConfig<T>|String[]} entries
     */
    public setEntries(entries: (T | ConferenceConfig<T> | string)[]): ConferenceConfig<T> {
        this.entries = entries;
        return this;
    }

    /**
     * set the given fields, returns this
     * @param {String[]} fields
     */
    public setFields(fields: string[]): ConferenceConfig<T> {
        this.fields = fields;
        return this;
    }

    /**
     * set the given genericId, returns this
     * @param {String} id
     */
    public setGenericId(id: string): ConferenceConfig<T> {
        this.genericId = id;
        return this;
    }

    /**
     * set the given genericId, returns this
     * @param {String} type
     */
    public setConfigType(type: 'config' | 'application' | 'table'): ConferenceConfig<T> {
        this.type = type;
        return this;
    }
}
