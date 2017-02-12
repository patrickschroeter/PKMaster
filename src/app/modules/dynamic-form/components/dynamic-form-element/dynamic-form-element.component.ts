import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { DynamicFormService } from './../../services';

import { FieldDto } from './../../../../swagger';

import { DynamicFormComponent } from './../../dynamic-form.component';

@Component({
    selector: 'pk-dynamic-form-element',
    templateUrl: './dynamic-form-element.component.html'
})
export class DynamicFormElementComponent implements OnInit {

    @Input() element: FieldDto;
    @Input() disabled: boolean;
    @Input() form: FormGroup;

    constructor(private dynamicForm: DynamicFormService) { }

    ngOnInit() {
    }


    /**
     * @description shows the validation of the element
     * @param {FormElement} element the element to validate
     * @return {void}
     */
    public showElementValidation(element: FieldDto): void {
        this.dynamicForm.showElementValidation(this.form.controls[element.name]);
    }

    public hideElementValidation(): void {
        this.dynamicForm.hideValidation();
    }
}
