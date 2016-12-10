import { Injectable } from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';

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

            let formControl = this.extendElement(element);
            if (!formControl) { continue; }

            /** Add new FormControl to FormBuilder-Options[] */
            options[element.name] = formControl;
        };
        return this.build.group(options, config);
    }

    /**
     * @description adds information to the form element such as validations and formControl
     * @param {FormElement} element
     * @return {boolean}
     */
    private extendElement(element: Field): FormControl {
        if (!element || !element.name || element.disabled) { return null; }

        /** Create Array of ValidationFn */
        let activeValidations = this.inputValidation.generateValidationsFromKeys(element.validations);
        if (element.required) { activeValidations.push(Validators.required); }

        /** FIX for multiselect */
        if (!element.value) { element.value = element.multipleSelect ? null : ''; }
        return new FormControl(element.value, Validators.compose(activeValidations));
    }


    /**
     * @description shows error validation of an element
     * @param {FormElement} element
     * @return {boolean}
     */
    public showElementValidation(element: Field, formControl?: AbstractControl): void {
        if (!element['formControl'] && !formControl) { return; }
        if (element['formControl']) {
            this.showValidation(element['formControl']);
        } else if (formControl) {
            this.showValidation(formControl);
        }
    }

    public hideValidation() {
        this.alert.removeHint('validation');
    }

    /**
     * @description shows error validation
     * @param {FormGroup|FormControl} form the form object to validate
     * @return {void}
     */
    public showValidation(form: FormGroup | FormControl | AbstractControl) {
        let message = this.inputValidation.getErrorMessage(form);
        if (message) {
            this.alert.setErrorHint('validation', message);
        }
    }
}
