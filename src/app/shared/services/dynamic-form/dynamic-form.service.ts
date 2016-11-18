import { Injectable } from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';

import { InputValidationService } from './../../../core';

import { FormElement } from './../../../swagger';

@Injectable()
export class DynamicFormService {

    constructor(private build: FormBuilder, private inputValidation: InputValidationService) { }

    /**
     * @description generates a from group from FormElements
     * @param {FormElement[]} input the input configuration
     * @return {FormGroup}
     */
    generateFormFromInput(input?: FormElement[]): FormGroup {
        console.log(input);
        let options = {};
        for (let i = 0, length = input.length; i < length; i++) {
            let element = input[i];

            if (!this.extendElement(element)) { continue; }

            /** Add new FormControl to FormBuilder-Options[] */
            options[element.name] = element.formControl;
        };
        return this.build.group(options);
    }

    /**
     * @description adds information to the form element such as validations and formControl
     * @param {FormElement} element
     * @return {boolean}
     */
    extendElement(element: FormElement): boolean {
        if (!element || !element.name) { return false; }

        /** Create Array of ValidationFn */
        let activeValidations = this.inputValidation.generateValidationsFromKeys(element.validations);
        if (element.required) { activeValidations.push(Validators.required); }

        /** Create new FormControl if not existing */
        if (!element.formControl) {
            /** FIX for multiselect */
            if (!element.value) { element.value = element.multiple ? null : ''; }
            element.formControl = new FormControl(element.value, Validators.compose(activeValidations));

        }
        return true;
    }
}
