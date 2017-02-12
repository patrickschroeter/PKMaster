/**
 * An entry in a Select Overlay
 *
 * @export
 * @class Selectable
 */
export class Selectable {

    /**
     * the key/id of the element
     *
     * @type {String}
     * @memberOf Selectable
     */
    public value: string;

    /**
     * the displayed label of the element
     *
     * @type {String}
     * @memberOf Selectable
     */
    public label: string;

    /**
     * Creates an instance of Selectable.
     *
     * @param {String} value
     * @param {String} label
     *
     * @memberOf Selectable
     */
    constructor(value: string, label: string) {
        this.value = value;
        this.label = label;
    }
};
