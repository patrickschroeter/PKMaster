import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { FormElement } from './../../../../swagger';

@Injectable()
export class DynamicFormMock {

    constructor() { }

    /**
     * @description generates a from group from FormElements
     * @param {FormElement[]} input the input configuration
     * @return {FormGroup}
     */
    generateFormFromInput(input?: FormElement[], config = {}): FormGroup {
        return null;
    }


    /**
     * @description shows error validation of an element
     * @param {FormElement} element
     * @return {boolean}
     */
    showElementValidation(element: FormElement): void {
    }

    /**
     * @description shows error validation
     * @param {FormGroup|FormControl} form the form object to validate
     * @return {void}
     */
    showValidation(form: FormGroup | FormControl) {
    }
}
