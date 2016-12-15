import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { FormControl, AbstractControl } from '@angular/forms';

import { DynamicFormComponent } from './../../dynamic-form.component';

import { Field } from './../../../../swagger';

@Component({
    selector: 'pk-select',
    templateUrl: './select.component.html'
})
export class SelectComponent implements OnInit {

    @HostBinding('class.element') element = true;

    @Input() config: Field;
    @Input() disabled: boolean;

    private isOpen: boolean;

    private searchstring: string;
    private filteredOptions: Array<{ value?, label? }>;

    private formControl: AbstractControl;

    constructor(private parent: DynamicFormComponent) { }

    ngOnInit() {
        this.isOpen = false;

        if (!this.config) {
            this.config = {};
        }
        this.formControl = this.getFormControl();
        if (!this.formControl) {
            this.formControl = new FormControl(this.config.value);
        }
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

    isDisabled() {
        return this.disabled || (this.config && this.config.disabled);
    }

    toggleSelectOverlay() {
        this.isOpen = !this.isOpen;
    }

    select(option) {
        if (!this.config.multipleSelect) {
            this.formControl.setValue(option.value);
            this.toggleSelectOverlay();
            return;
        }

        let values = this.formControl.value;
        if (!values) { values = []; }

        let value = option.value;
        let index = values.indexOf(value);
        if (index === -1) {
            values.push(value);
        } else {
            values.splice(index, 1);
        }

        this.formControl.setValue(values);
    }

    filterOptions(event) {
        if (!this.config.options) { return; }
        if (event === '') {
            this.filteredOptions = undefined;
            return;
        }
        this.filteredOptions = [];
        for (let i = 0, length = this.config.options.length; i < length; i++) {
            let element = this.config.options[i];
            if (element.value.includes(event) || element.label.includes(event)) {
                this.filteredOptions.push(element);
            }
        }
    }

    removeOption(option) {
        let values = this.formControl.value;
        let value = option.value;
        let index = values.indexOf(value);
        if (index !== -1) { values.splice(index, 1); }
        this.formControl.setValue(values);
    }

}
