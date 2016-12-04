import { Injectable } from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';

import { InputValidationService, AlertService } from './../../../../core';

import { Field } from './../../../../swagger';

@Injectable()
export class DynamicFormService {

    constructor(
        private build: FormBuilder,
        private inputValidation: InputValidationService,
        private alert: AlertService) { }

    /**
     * @description generates a from group from FormElements
     * @param {FormElement[]} input the input configuration
     * @return {FormGroup}
     */
    public generateFormFromInput(input?: Field[], config = {}): FormGroup {
        let options = {};
        for (let i = 0, length = input.length; i < length; i++) {
            let element = input[i];

            if (!this.extendElement(element)) { continue; }

            /** Add new FormControl to FormBuilder-Options[] */
            options[element.name] = element['formControl'];
        };
        return this.build.group(options, config);
    }

    /**
     * @description adds information to the form element such as validations and formControl
     * @param {FormElement} element
     * @return {boolean}
     */
    private extendElement(element: Field): boolean {
        if (!element || !element.name || element.disabled) { return false; }

        /** Create Array of ValidationFn */
        let activeValidations = this.inputValidation.generateValidationsFromKeys(element.validations);
        if (element.required) { activeValidations.push(Validators.required); }

        /** Create new FormControl if not existing */
        if (!element['formControl']) {
            /** FIX for multiselect */
            if (!element.value) { element.value = element.multipleSelect ? null : ''; }
            element['formControl'] = new FormControl(element.value, Validators.compose(activeValidations));
        }
        return true;
    }


    /**
     * @description shows error validation of an element
     * @param {FormElement} element
     * @return {boolean}
     */
    public showElementValidation(element: Field): void {
        if (!element['formControl']) { return; }
        this.showValidation(element['formControl']);
    }

    public hideValidation() {
        this.alert.removeHint('validation');
    }

    /**
     * @description shows error validation
     * @param {FormGroup|FormControl} form the form object to validate
     * @return {void}
     */
    public showValidation(form: FormGroup | FormControl) {
        let message = this.inputValidation.getErrorMessage(form);
        if (message) {
            this.alert.setErrorHint('validation' , message);
        }
    }
}
