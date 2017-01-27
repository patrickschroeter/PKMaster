import { Injectable } from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';

import { AlertService } from './../../../../modules/alert';

import { InputValidationService } from './../input-validation/input-validation.service';

import { Field } from './../../../../swagger';

@Injectable()
export class DynamicFormService {

    private validationTime: number = 2000;

    constructor(
        private build: FormBuilder,
        private inputValidation: InputValidationService,
        private alert: AlertService
    ) { }

    /**
     * @description generates a from group from FormElements
     * @param {FormElement[]} input the input configuration
     * @return {FormGroup}
     */
    public generateFormFromInput(input?: Field[], config = {}): FormGroup {
        const options = {};
        for (let i = 0, length = input.length; i < length; i++) {
            const element = input[i];

            const formControl = this.createFormControl(element);
            if (!formControl) { continue; }

            /** Add new FormControl to FormBuilder-Options[] */
            options[element.name] = formControl;
        };
        return this.build.group(options, config);
    }

    /**
     * @description add missing FormControl to the form depending on input
     * @param {FormGroup} form the form to extend
     * @param {Field[]} input the input configuration
     */
    public updateFormFromInput(form: FormGroup, input?: Field[]): void {

        /** get all existing form.controls */
        const unusedElementNames: string[] = [];
        for (let key in form.controls) {
            if (!form.controls.hasOwnProperty(key)) { continue; }
            unusedElementNames.push(key);
        }

        /** add/update the form.controly by input fields */
        for (let i = 0, length = input.length; i < length; i++) {
            const element = input[i];
            this.removeKeyFromList(unusedElementNames, element.name);
            if (!form.get(element.name)) {
                const formControl = this.createFormControl(element);
                if (formControl) {
                    form.addControl(element.name, formControl);
                }
            } else {
                form.get(element.name).setValue(element.value);
            }
        }

        /** Remove all controls which are not in input field */
        for (let i = 0, length = unusedElementNames.length; i < length; i++) {
            const name = unusedElementNames[i];
            form.removeControl(name);
        }
    }

    /**
     * @description removes the key from the array
     */
    private removeKeyFromList(list: string[], key: string) {
        const index: number = list.indexOf(key);
        if (index === -1) { return; }
        list.splice(index, 1);
    }

    /**
     * @description adds information to the form element such as validations and formControl
     * @param {FormElement} element
     * @return {boolean}
     */
    private createFormControl(element: Field): FormControl {
        if (!element || !element.name || element.disabled) { return null; }

        /** Create Array of ValidationFn */
        const activeValidations = this.inputValidation.generateValidationsFromKeys(element.validations);
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
    public showElementValidation(formControl?: AbstractControl): void {
        if (!formControl) { return; }
        this.showValidation(formControl);
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
        const message = this.inputValidation.getErrorMessage(form);
        if (message) {
            this.alert.setErrorHint('validation', message, this.validationTime);
        }
    }
}
