import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { FormControl, AbstractControl } from '@angular/forms';

import { DynamicFormComponent } from './../../dynamic-form.component';

import { Field } from './../../../../swagger';


@Component({
    selector: 'pk-input',
    templateUrl: './input.component.html'
})
export class InputComponent implements OnInit {

    @HostBinding('class.element') element = true;

    @Input() config: Field;
    @Input() disabled: boolean;

    private _formControl: AbstractControl;
    get formControl() { return this._formControl; }
    set formControl(control: AbstractControl) { this._formControl = control; }

    constructor(private parent: DynamicFormComponent) { }

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
        if (this.parent &&
            this.parent.form) {
            return this.parent.form.get(this.config.name);
        }
        return null;
    }

    isDisabled() {
        return this.disabled || (this.config && this.config.disabled);
    }

}
