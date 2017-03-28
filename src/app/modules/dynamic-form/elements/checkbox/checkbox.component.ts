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

import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { FormControl, AbstractControl, FormGroup } from '@angular/forms';

import { DynamicFormComponent } from './../../dynamic-form.component';

import { FieldDto } from 'app/swagger';

/**
 * CheckkboxComponent
 *
 * @export
 * @class CheckboxComponent
 * @implements {OnInit}
 */
@Component({
    selector: 'pk-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {

    @HostBinding('class.element') element = true;
    @HostBinding('class.element--primary') elementPrimary = true;

    @Input() config: FieldDto;
    @Input() disabled: boolean;
    @Input() form: FormGroup;

    private _formControl: AbstractControl;
    get formControl() { return this._formControl; }
    set formControl(control: AbstractControl) { this._formControl = control; }

    /**
     * Creates an instance of CheckboxComponent.
     *
     * @memberOf CheckboxComponent
     */
    constructor( ) { }

    /**
     * implements OnInit
     *
     * @memberOf CheckboxComponent
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
     * @memberOf CheckboxComponent
     */
    private getFormControl(): AbstractControl {
        if (this.form) {
            return this.form.get(this.config.name);
        }
        return null;
    }

    /**
     * check if the checkbox is disabled
     *
     * @returns {boolean}
     *
     * @memberOf CheckboxComponent
     */
    public isDisabled(): boolean {
        return this.disabled || (this.config && this.config.disabled);
    }

}
