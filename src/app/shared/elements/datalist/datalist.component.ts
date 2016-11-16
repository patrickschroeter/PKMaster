import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { FormControl } from '@angular/forms';

import { AlertService } from './../../../core';

import { FormElement } from './../../../swagger';

@Component({
    selector: 'pk-datalist',
    templateUrl: './datalist.component.html',
    styleUrls: ['./datalist.component.scss']
})
export class DatalistComponent implements OnInit {

    @HostBinding('class.element') element = true;

    @Input() config: FormElement;

    private isOpen: boolean;

    private addOptionForm;

    constructor(private alert: AlertService) { }

    ngOnInit() {
        if (this.config && !this.config.formControl) { this.config.formControl = new FormControl(this.config.value); }

        this.addOptionForm = [
            {
                elementType: 'input',
                name: 'value',
                required: true,
                placeholder: 'Value (unique Id)',
                styles: [
                    'small'
                ]
            },
            {
                elementType: 'input',
                name: 'label',
                required: true,
                placeholder: 'Display Name',
                styles: [
                    'small'
                ]
            }
        ];
    }

    toggleAddOptionOverlay() {
        this.isOpen = !this.isOpen;
    }

    addOption(element) {
        // add value to values
        let values = this.config.formControl.value;
        if (!values) { values = []; }

        let index = this.indexOf(element, values);
        if (index === -1) {
            values.push(element);
        } else {
            values[index].label = element.label;
        }

        this.config.formControl.setValue(values);

        // add element to options

        if (!this.config.options) {
            this.config.options = [element];
        } else {
            let override = this.indexOf(element, this.config.options);

            if (override === -1) {
                this.config.options.push(element);
            } else {
                this.alert.setSuccessHint('Option updated');
                this.config.options[override].label = element.label;
            }
        }
        this.toggleAddOptionOverlay();
    }

    removeOption(element) {
        // remove value from values
        let values = this.config.formControl.value;
        let index = this.indexOf(element, values);
        if (index !== -1) { values.splice(index, 1); }
        this.config.formControl.setValue(values);

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
