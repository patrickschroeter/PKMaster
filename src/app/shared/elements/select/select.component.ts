import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { FormControl } from '@angular/forms';

import { FormElement } from './../../../swagger';

@Component({
    selector: 'pk-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {

    @HostBinding('class.element') element = true;

    @Input() config: FormElement;
    @Input() disabled: boolean;

    private isOpen: boolean;

    private searchstring: string;
    private filteredOptions: Array<{ value?, label? }>;

    constructor() { }

    ngOnInit() {
        this.isOpen = false;

        if (this.config && !this.config.formControl) { this.config.formControl = new FormControl(this.config.value); }
    }

    isDisabled() {
        return this.disabled || this.config.disabled;
    }

    toggleSelectOverlay() {
        this.isOpen = !this.isOpen;
    }

    select(option) {
        if (!this.config.multiple) {
            this.config.formControl.setValue(option.value);
            this.toggleSelectOverlay();
            return;
        }

        let values = this.config.formControl.value;
        if (!values) { values = []; }

        let value = option.value;
        let index = values.indexOf(value);
        if (index === -1) {
            values.push(value);
        } else {
            values.splice(index, 1);
        }

        this.config.formControl.setValue(values);
    }

    filterOptions(event) {
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
        let values = this.config.formControl.value;
        let value = option.value;
        let index = values.indexOf(value);
        if (index !== -1) { values.splice(index, 1); }
        this.config.formControl.setValue(values);
    }

}
