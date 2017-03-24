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

/** Services */
import { AlertService } from 'app/modules/alert';
import { TranslationService } from 'app/modules/translation';

/** Models */
import { FieldDto } from 'app/swagger';
import { Selectable } from 'app/models';

/**
 * A Datalist Component
 *
 * @export
 * @class DatalistComponent
 * @implements {OnInit}
 */
@Component({
    selector: 'pk-datalist',
    templateUrl: './datalist.component.html'
})
export class DatalistComponent implements OnInit {

    @HostBinding('class.element') element = true;

    @ViewChild('overlay') overlay: OverlayComponent;

    @Input() config: FieldDto;
    @Input() disabled: boolean;
    @Input() form: FormGroup;

    private _addOptionForm: FieldDto[];
    get addOptionForm() { return this._addOptionForm; }
    set addOptionForm(form) { this._addOptionForm = form; }

    private _formControl: AbstractControl;
    get formControl() { return this._formControl; }
    set formControl(control: AbstractControl) { this._formControl = control; }

    /**
     * Creates an instance of DatalistComponent.
     *
     * @param {AlertService} alert
     * @param {TranslationService} translationService
     *
     * @memberOf DatalistComponent
     */
    constructor(
        private alert: AlertService,
        private translationService: TranslationService
    ) { }

    /**
     * implements OnInit
     *
     * @memberOf DatalistComponent
     */
    ngOnInit() {
        if (!this.config) {
            this.config = new FieldDto();
        }
        this.formControl = this.getFormControl();
        if (!this.formControl) {
            this.formControl = new FormControl(this.config.value);
        }
        this.initAddOptionsForm();
    }

    /**
     * extract the Elements FormControl from the Parent, return null if no Parent set
     *
     * @private
     * @returns {AbstractControl}
     *
     * @memberOf DatalistComponent
     */
    private getFormControl(): AbstractControl {
        if (this.form) {
            return this.form.get(this.config.name);
        }
        return null;
    }

    /**
     * initialize the add optiosn form
     *
     * @memberOf DatalistComponent
     */
    public initAddOptionsForm() {
        this.addOptionForm = [
            {
                fieldType: 'input',
                name: 'value',
                required: true,
                placeholder: 'Value (unique Id)',
                value: '',
                styleIds: [
                    'small'
                ]
            },
            {
                fieldType: 'input',
                name: 'label',
                required: true,
                placeholder: 'Display Name',
                value: '',
                styleIds: [
                    'small'
                ]
            }
        ];
    }

    /**
     * check if the datalist is disabled, by config or input
     *
     * @private
     * @returns
     *
     * @memberOf DatalistComponent
     */
    public isDisabled() {
        return this.disabled || (this.config && this.config.disabled);
    }

    /**
     * add an option to the datalist
     *
     * @private
     * @param {Selectable} element
     *
     * @memberOf DatalistComponent
     */
    public addOption(element: Selectable) {
        // add value to values
        let values = this.formControl.value;
        if (!values) { values = []; }

        const index = this.indexOf(element, values);
        if (index === -1) {
            values.push(element);
        } else {
            values[index].label = element.label;
        }

        this.formControl.setValue(values);

        // add element to options

        if (!this.config.options) {
            this.config.options = [element];
        } else {
            const override = this.indexOf(element, this.config.options);

            if (override === -1) {
                this.config.options.push(element);
            } else {
                this.alert.setSuccessHint('option_updated', this.translationService.translate('updatedOption'));
                this.config.options[override].label = element.label;
            }
        }
        this.initAddOptionsForm();
        this.overlay.toggle(false);
    }

    /**
     * remove an option from the datalist
     *
     * @private
     * @param {Selectable} element
     *
     * @memberOf DatalistComponent
     */
    public removeOption(element: Selectable) {
        // remove value from values
        const values = this.formControl.value;
        const index = this.indexOf(element, values);
        if (index !== -1) { values.splice(index, 1); }
        this.formControl.setValue(values);

        // remove element from options
        if (this.indexOf(element, this.config.options) !== -1) {
            this.config.options.splice(index, 1);
        }
    }

    /**
     * get the index of the given Selectable in the given Array
     *
     * @private
     * @param {Selectable} element
     * @param {Selectable[]} array
     * @returns {number}
     *
     * @memberOf DatalistComponent
     */
    private indexOf(element: Selectable, target: Selectable[]): number {
        let index = -1;
        for (let i = 0; i < target.length; i++) {
            const option = target[i];
            if (option.value === element.value) {
                index = i;
            }
        }
        return index;
    }
}
