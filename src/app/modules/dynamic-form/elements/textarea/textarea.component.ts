import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { FormControl, AbstractControl } from '@angular/forms';

import { DynamicFormComponent } from './../../dynamic-form.component';

import { Field } from './../../../../swagger';

@Component({
    selector: 'pk-textarea',
    templateUrl: './textarea.component.html',
    styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent implements OnInit {

    @HostBinding('class.element') element = true;

    @Input() config: Field;
    @Input() disabled: boolean;

    private formControl: AbstractControl;

    constructor(private parent: DynamicFormComponent) { }

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
    }

    isDisabled() {
        return this.disabled || this.config.disabled;
    }

}
