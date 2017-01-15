import { Component, OnInit, Input, HostBinding, ViewChild } from '@angular/core';
import { FormControl, AbstractControl } from '@angular/forms';

import { DynamicFormComponent } from './../../dynamic-form.component';

import { AlertService } from './../../../../modules/alert';

import { Field } from './../../../../swagger';

import { OverlayComponent } from './../../../../modules/overlay';

@Component({
    selector: 'pk-datalist',
    templateUrl: './datalist.component.html'
})
export class DatalistComponent implements OnInit {

    @HostBinding('class.element') element = true;

    @ViewChild('overlay') overlay: OverlayComponent;

    @Input() config: Field;
    @Input() disabled: boolean;

    private _addOptionForm;
    get addOptionForm() { return this._addOptionForm; }
    set addOptionForm(form) { this._addOptionForm = form; }

    private _formControl: AbstractControl;
    get formControl() { return this._formControl; }
    set formControl(control: AbstractControl) { this._formControl = control; }

    constructor(private parent: DynamicFormComponent, private alert: AlertService) { }

    ngOnInit() {
        if (!this.config) {
            this.config = {};
        }
        this.formControl = this.getFormControl();
        if (!this.formControl) {
            this.formControl = new FormControl(this.config.value);
        }
        this.initAddOptionsForm();
    }

    /**
     * @description extract the Elements FormControl from the Parent, return null if no Parent set
     */
    private getFormControl(): AbstractControl {
        if (this.parent &&
            this.parent.form) {
            return this.parent.form.get(this.config.name);
        }
        return null;
    }

    private initAddOptionsForm() {
        this.addOptionForm = [
            {
                fieldType: 'input',
                name: 'value',
                required: true,
                placeholder: 'Value (unique Id)',
                styles: [
                    'small'
                ]
            },
            {
                fieldType: 'input',
                name: 'label',
                required: true,
                placeholder: 'Display Name',
                styles: [
                    'small'
                ]
            }
        ];
    }

    isDisabled() {
        return this.disabled || (this.config && this.config.disabled);
    }

    public resetAddOptionForm() {
        for (let i = 0, length = this.addOptionForm.length; i < length; i++) {
            this.addOptionForm[i].value = '';
        }
    }

    addOption(element) {
        // add value to values
        let values = this.formControl.value;
        if (!values) { values = []; }

        let index = this.indexOf(element, values);
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
            let override = this.indexOf(element, this.config.options);

            if (override === -1) {
                this.config.options.push(element);
            } else {
                this.alert.setSuccessHint('option_updated', 'Option updated');
                this.config.options[override].label = element.label;
            }
        }
        this.overlay.toggle(false);
    }

    removeOption(element) {
        // remove value from values
        let values = this.formControl.value;
        let index = this.indexOf(element, values);
        if (index !== -1) { values.splice(index, 1); }
        this.formControl.setValue(values);

        // remove element from options
        if (this.indexOf(element, this.config.options) !== -1) {
            this.config.options.splice(index, 1);
        }
    }

    indexOf(element, array): number {
        let index = -1;
        for (let i = 0, length = array.length; i < length; i++) {
            let option = array[i];
            if (option.value === element.value) {
                index = i;
            }
        }
        return index;
    }
}
