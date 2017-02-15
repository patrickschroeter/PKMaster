import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { FieldDto } from './../../../../swagger';

@Injectable()
export class DynamicFormMock {

    constructor() { }

    /**
     * @description generates a from group from FormElements
     * @param {FormElement[]} input the input configuration
     * @return {FormGroup}
     */
    generateFormFromInput(input?: FieldDto[], config = {}): FormGroup {
        return new FormGroup({});
    }


    /**
     * @description shows error validation of an element
     * @param {FormElement} element
     * @return {boolean}
     */
    showElementValidation(element: FieldDto): void {
    }

    /**
     * @description shows error validation
     * @param {FormGroup|FormControl} form the form object to validate
     * @return {void}
     */
    showValidation(form: FormGroup | FormControl) {
    }
}
