import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { FormControl, AbstractControl, FormGroup } from '@angular/forms';

import { DynamicFormComponent } from './../../dynamic-form.component';

import { FieldDto } from './../../../../swagger';

@Component({
    selector: 'pk-radio',
    templateUrl: './radio.component.html',
    styleUrls: ['./radio.component.scss']
})
export class RadioComponent implements OnInit {

    @HostBinding('class.element') element = true;

    @Input() config: FieldDto;
    @Input() disabled: boolean;
    @Input() form: FormGroup;

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

}
