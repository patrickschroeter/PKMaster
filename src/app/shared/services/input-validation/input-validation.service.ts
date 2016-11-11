import { Injectable } from '@angular/core';

import { Validators, ValidatorFn, FormControl } from '@angular/forms';

@Injectable()
export class InputValidationService {

    private validationMapping: Object = {
        minLength: this.validateMinLength(8),
        maxLength: this.validateMaxLength(15),
        useExternalEmail: this.validateExternalEmail,
        isEmail: this.validateEmail,
        toBeTrue: this.validateToBeTrue
    }

    constructor() { }

    /**
     * Generates an Array of Validation Functions from the given Array of Keys
     * @param {Array} keyArray all Validation Keys
     * @return {Array} returns an array with all Validatin functions
     */
    generateValidationsFromKeys(keyArray = []) {
        let result = [];
        if (!keyArray) return result;
        for (let i = 0, length = keyArray.length; i < length; i++) {
            let validationName = keyArray[i];
            let validation = this.validationMapping[validationName];
            if (validation) result.push(validation);
        }
        return result;
    }

    /**
     * Validation for min length
     * @param {number} length the min Length to be valid
     * @return {ValidatorFn} return a Validation Function
     */
    validateMinLength(length: number): ValidatorFn {
        return Validators.minLength(length);
    }

    /**
     * Validation for max length
     * @param {number} length the max Length to be valid
     * @return {ValidatorFn} return a Validation Function
     */
    validateMaxLength(length: number): ValidatorFn {
        return Validators.maxLength(length);
    }

    /**
     * Validatio for external Email
     * @param {FormControl} control the FormControl to be tested
     * @return {Object} return a Object with Information if validation fails
     */
    validateExternalEmail(control: FormControl): Object {
        if (control.value.match(/hs-augsburg/)) {
            return { internalEmail: true };
        }
    }

    /**
     * Validation for Email
     * @param {FormControl} control the FormControl to be tested
     * @return {Object} return a Object with Information if validation fails
     */
    validateEmail(control: FormControl): Object {
        if (!control.value.match(/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i)) {
            return { invalidEmail: true }
        }
    }

    /**
     * Validate to be 'true'
     * @param {FormControl} control the FormControl to be tested
     * @return {Object} return a Object with Information if validation fails
     */
    validateToBeTrue(control: FormControl): Object {
        if (control.value !== true) {
            return { notTrue: true }
        }
    }

}
