import { Component, OnInit, Input } from '@angular/core';

import { DynamicFormService } from './../services';

import { FormElement } from './../../../swagger';

@Component({
    selector: 'pk-dynamic-form-element',
    templateUrl: './dynamic-form-element.component.html'
})
export class DynamicFormElementComponent implements OnInit {

    @Input() element;
    @Input() disabled: boolean;

    constructor(private dynamicForm: DynamicFormService) { }

    ngOnInit() {
    }


    /**
     * @description shows the validation of the element
     * @param {FormElement} element the element to validate
     * @return {void}
     */
    showElementValidation(element: FormElement): void {
        this.dynamicForm.showElementValidation(element);
    }
}
