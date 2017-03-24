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

import { Component, OnInit, Input, HostBinding, ViewChild } from '@angular/core';
import { FormControl, AbstractControl, FormGroup } from '@angular/forms';

/** Components */
import { DynamicFormComponent } from './../../dynamic-form.component';
import { OverlayComponent } from 'app/modules/overlay';

/** Models */
import { FieldDto } from 'app/swagger';
import { Selectable } from 'app/models';

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

    @HostBinding('class.element') element = true;

    @ViewChild('overlay') overlay: OverlayComponent;

    @Input() config: FieldDto;
    @Input() disabled: boolean;
    @Input() form: FormGroup;

    private filteredOptions: Selectable[];

    private _searchstring: string;
    get searchstring() { return this._searchstring; }
    set searchstring(string: string) { this._searchstring = string; }

    private _formControl: AbstractControl;
    get formControl() { return this._formControl; }
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
     * @returns {boolean}
     *
     * @memberOf SelectComponent
     */
    public isDisabled(): boolean {
        return this.disabled || (this.config && this.config.disabled);
    }

    /**
     * select an option
     *
     * @param {Selectable} option
     * @returns {void}
     *
     * @memberOf SelectComponent
     */
    public select(option: Selectable): void {
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
     * @param {string} event
     * @returns {void}
     *
     * @memberOf SelectComponent
     */
    public filterOptions(event: string): void {
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
     * @param {Selectable} option
     *
     * @memberOf SelectComponent
     */
    public removeOption(option: Selectable): void {
        const values = this.formControl.value;
        const value = option.value;
        const index = values.indexOf(value);
        if (index !== -1) { values.splice(index, 1); }
        this.formControl.setValue(values);
    }

}
