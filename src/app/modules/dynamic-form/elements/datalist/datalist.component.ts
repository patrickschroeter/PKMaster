import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { FormControl, AbstractControl } from '@angular/forms';

import { DynamicFormComponent } from './../../dynamic-form.component';

import { AlertService } from './../../../../modules/alert';

import { Field } from './../../../../swagger';

@Component({
    selector: 'pk-datalist',
    templateUrl: './datalist.component.html'
})
export class DatalistComponent implements OnInit {

    @HostBinding('class.element') element = true;

    @Input() config: Field;
    @Input() disabled: boolean;

    private isOpen: boolean;

    private addOptionForm;

    private formControl: AbstractControl;

    constructor(private parent: DynamicFormComponent, private alert: AlertService) { }

    ngOnInit() {
        if (!this.config) {
            this.config = {};
        }
        if (this.parent &&
            this.parent.form &&
            this.parent.form.controls &&
            this.parent.form.controls[this.config.name]) {
            this.formControl = this.parent.form.controls[this.config.name];
        } else {
            this.formControl = new FormControl(this.config.value);
        }

        this.initAddOptionsForm();
    }

    initAddOptionsForm() {
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

    toggleAddOptionOverlay() {
        this.isOpen = !this.isOpen;
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
        this.toggleAddOptionOverlay();
        this.initAddOptionsForm();
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
