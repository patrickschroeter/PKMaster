import { Component, OnInit, Input, HostBinding, ViewChild } from '@angular/core';
import { FormControl, AbstractControl, FormGroup } from '@angular/forms';

import { DynamicFormComponent } from './../../dynamic-form.component';

import { FieldDto } from './../../../../swagger';

import { OverlayComponent } from './../../../../modules/overlay';

@Component({
    selector: 'pk-select',
    templateUrl: './select.component.html'
})
export class SelectComponent implements OnInit {

    @ViewChild('overlay') overlay: OverlayComponent;

    @HostBinding('class.element') element = true;

    @Input() config: FieldDto;
    @Input() disabled: boolean;
    @Input() form: FormGroup;

    private filteredOptions: Array<{ value?, label? }>;

    private _searchstring: string;
    get searchstring() { return this._searchstring; }
    set searchstring(string: string) { this._searchstring = string; }

    private _formControl: AbstractControl;
    get formControl() { return this._formControl; }
    set formControl(control: AbstractControl) { this._formControl = control; }

    constructor( ) { }

    ngOnInit() {
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
        if (this.form) {
            return this.form.get(this.config.name);
        }
        return null;
    }

    isDisabled() {
        return this.disabled || (this.config && this.config.disabled);
    }

    select(option) {
        if (!this.config.multipleSelect) {
            this.formControl.setValue(option.value);
            this.overlay.toggle();
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
