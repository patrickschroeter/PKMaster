import { Injectable } from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import * as _ from 'lodash';

import { AlertService } from 'app/modules/alert';

import { InputValidationService } from './../input-validation/input-validation.service';

import { FieldDto } from 'app/swagger';

@Injectable()
export class DynamicFormService {

    private validationTime = 2000;

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
    public generateFormFromInput(input?: FieldDto[], config = {}): FormGroup {
        const options: { [key: string]: FormControl } = {};
        for (let i = 0; i < input.length; i++) {
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
    public updateFormFromInput(form: FormGroup, input?: FieldDto[]): void {

        /** get all existing form.controls */
        const unusedElementNames: string[] = [];
        for (const key in form.controls) {
            if (form.controls.hasOwnProperty(key)) {
                unusedElementNames.push(key);
            }
        }

        /** add/update the form.controly by input fields */
        for (let i = 0; i < input.length; i++) {
            const element = input[i];
            this.removeKeyFromList(unusedElementNames, element.name);
            const control: AbstractControl = form.get(element.name);
            if (!control) {
                const formControl = this.createFormControl(element);
                if (formControl) {
                    form.addControl(element.name, formControl);
                }
            } else {
                control.setValue(element.value || control.value);
            }
        }

        /** Remove all controls which are not in input field */
        for (let i = 0; i < unusedElementNames.length; i++) {
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
    private createFormControl(element: FieldDto): FormControl {
        if (!element || !element.name || element.disabled) { return null; }

        /** Create Array of ValidationFn */
        const activeValidations = this.inputValidation.generateValidationsFromKeys(element.validationIds);
        if (element.required) { activeValidations.push(Validators.required); }

        /** FIX for multiselect */
        if (!element.value && element.multipleSelect) { element.value = null; }
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
