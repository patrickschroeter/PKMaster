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
import { FormControl, FormGroup } from '@angular/forms';

import { FieldDto } from 'app/swagger';

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
