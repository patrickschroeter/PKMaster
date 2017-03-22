import { Component, OnInit, Input, HostBinding, ViewChild } from '@angular/core';
import { FormControl, AbstractControl, FormGroup } from '@angular/forms';

/** Components */
import { DynamicFormComponent } from './../../dynamic-form.component';
import { OverlayComponent } from 'app/modules/overlay';

/** Models */
import { FieldDto } from 'app/swagger';
import { Selectable } from './../../../../models';

/**
 * A Select Component
 *
 * @export
 * @class SelectComponent
 * @implements {OnInit}
 */
@Component({
    selector: 'pk-select',
    templateUrl: './select.component.html'
})
export class SelectComponent implements OnInit {

    /**
     * Default Layout Class
     *
     * @memberOf SelectComponent
     */
    @HostBinding('class.element') element = true;

    /**
     * The OverlayComponent
     *
     * @type {OverlayComponent}
     * @memberOf SelectComponent
     */
    @ViewChild('overlay') overlay: OverlayComponent;

    /**
     * the config Field
     *
     * @type {FieldDto}
     * @memberOf SelectComponent
     */
    @Input() config: FieldDto;

    /**
     * Flag if Field is disabled
     *
     * @type {boolean}
     * @memberOf SelectComponent
     */
    @Input() disabled: boolean;

    /**
     * the parent FormGroup
     *
     * @type {FormGroup}
     * @memberOf SelectComponent
     */
    @Input() form: FormGroup;

    /**
     *
     *
     * @private
     * @type {Selectable[]}
     * @memberOf SelectComponent
     */
    private filteredOptions: Selectable[];

    /**
     * A String to filter the Options
     *
     * @private
     * @type {string}
     * @memberOf SelectComponent
     */
    private _searchstring: string;

    /**
     * get searchstring
     *
     * @memberOf SelectComponent
     */
    get searchstring() { return this._searchstring; }

    /**
     * set searchstring
     *
     * @memberOf SelectComponent
     */
    set searchstring(string: string) { this._searchstring = string; }

    /**
     * the datalist FormControl
     *
     * @private
     * @type {AbstractControl}
     * @memberOf SelectComponent
     */
    private _formControl: AbstractControl;

    /**
     * get formControl
     *
     *
     * @memberOf SelectComponent
     */
    get formControl() { return this._formControl; }

    /**
     * set formControl
     *
     * @memberOf SelectComponent
     */
    set formControl(control: AbstractControl) { this._formControl = control; }

    /**
     * Creates an instance of SelectComponent.
     *
     *
     * @memberOf SelectComponent
     */
    constructor( ) { }

    /**
     * implements OnInit
     *
     * @memberOf SelectComponent
     */
    ngOnInit() {
        if (!this.config) {
            this.config = new FieldDto();
        }
        this.formControl = this.getFormControl();
        if (!this.formControl) {
            this.formControl = new FormControl(this.config.value);
        }
    }

    /**
     * extract the Elements FormControl from the Parent, return null if no Parent set
     *
     * @private
     * @returns {AbstractControl}
     *
     * @memberOf SelectComponent
     */
    private getFormControl(): AbstractControl {
        if (this.form) {
            return this.form.get(this.config.name);
        }
        return null;
    }

    /**
     * check if the datalist is disabled, by config or input
     *
     * @private
     * @returns
     *
     * @memberOf SelectComponent
     */
    public isDisabled() {
        return this.disabled || (this.config && this.config.disabled);
    }

    /**
     * select an option
     *
     * @private
     * @param {Selectable} option
     * @returns
     *
     * @memberOf SelectComponent
     */
    public select(option: Selectable) {
        if (!this.config.multipleSelect) {
            this.formControl.setValue(option.value);
            this.overlay.toggle();
            return;
        }

        let values = this.formControl.value;
        if (!values) { values = []; }

        const value = option.value;
        const index = values.indexOf(value);
        if (index === -1) {
            values.push(value);
        } else {
            values.splice(index, 1);
        }

        this.formControl.setValue(values);
        if (!this.config.multipleSelect) {
            this.filterOptions('');
        }
    }

    /**
     * filter options by searchstring
     *
     * @private
     * @param {String} event
     * @returns
     *
     * @memberOf SelectComponent
     */
    public filterOptions(event: string) {
        if (!this.config.options) { return; }
        if (event === '') {
            this.filteredOptions = undefined;
            return;
        }
        this.filteredOptions = [];
        for (let i = 0; i < this.config.options.length; i++) {
            const element = this.config.options[i];
            if (element.value.includes(event) || element.label.includes(event)) {
                this.filteredOptions.push(element);
            }
        }
    }

    /**
     * remove an option
     *
     * @private
     * @param {Selectable} option
     *
     * @memberOf SelectComponent
     */
    public removeOption(option: Selectable) {
        const values = this.formControl.value;
        const value = option.value;
        const index = values.indexOf(value);
        if (index !== -1) { values.splice(index, 1); }
        this.formControl.setValue(values);
    }

}
