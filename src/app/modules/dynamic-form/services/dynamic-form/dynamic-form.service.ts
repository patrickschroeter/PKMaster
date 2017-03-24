/**
 *
 * @author Patrick Schröter <patrick.schroeter@hotmail.de>
 *
 * @license CreativeCommons BY-NC-SA 4.0 2017
 *
 * This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/.
 *
 */

import { Injectable } from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import * as _ from 'lodash';

import { AlertService } from 'app/modules/alert';

import { InputValidationService } from './../input-validation/input-validation.service';

import { FieldDto } from 'app/swagger';

/**
 * DynamicFormService
 *
 * @export
 * @class DynamicFormService
 */
@Injectable()
export class DynamicFormService {

    private validationTime = 2000;

    /**
     * Creates an instance of DynamicFormService.
     * @param {FormBuilder} build
     * @param {InputValidationService} inputValidation
     * @param {AlertService} alert
     *
     * @memberOf DynamicFormService
     */
    constructor(
        private build: FormBuilder,
        private inputValidation: InputValidationService,
        private alert: AlertService
    ) { }

    /**
     * generates a from group from FormElements
     *
     * @param {FieldDto[]} [input]
     * @param {any} [config={}]
     * @returns {FormGroup}
     *
     * @memberOf DynamicFormService
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
     * add missing FormControl to the form depending on input
     *
     * @param {FormGroup} form
     * @param {FieldDto[]} [input]
     *
     * @memberOf DynamicFormService
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
     * removes the key from the array
     *
     * @private
     * @param {string[]} list
     * @param {string} key
     * @returns
     *
     * @memberOf DynamicFormService
     */
    private removeKeyFromList(list: string[], key: string) {
        const index: number = list.indexOf(key);
        if (index === -1) { return; }
        list.splice(index, 1);
    }

    /**
     * adds information to the form element such as validations and formControl
     *
     * @private
     * @param {FieldDto} element
     * @returns {FormControl}
     *
     * @memberOf DynamicFormService
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
     * shows error validation of an element
     *
     * @param {AbstractControl} [formControl]
     * @returns {void}
     *
     * @memberOf DynamicFormService
     */
    public showElementValidation(formControl?: AbstractControl): void {
        if (!formControl) { return; }
        this.showValidation(formControl);
    }

    public hideValidation() {
        this.alert.removeHint('validation');
    }

    /**
     * shows error validation
     *
     * @param {(FormGroup | FormControl | AbstractControl)} form
     *
     * @memberOf DynamicFormService
     */
    public showValidation(form: FormGroup | FormControl | AbstractControl) {
        const message = this.inputValidation.getErrorMessage(form);
        if (message) {
            this.alert.setErrorHint('validation', message, this.validationTime);
        }
    }
}
