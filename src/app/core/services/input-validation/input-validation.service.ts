import { Injectable } from '@angular/core';

import { Validators, ValidatorFn, FormControl, FormGroup, AbstractControl } from '@angular/forms';

@Injectable()
export class InputValidationService {

    private validationMapping: Object = {
        minLength: this.validateMinLength(8),
        maxLength: this.validateMaxLength(15),
        useExternalEmail: this.validateExternalEmail,
        isEmail: this.validateEmail,
        toBeTrue: this.validateToBeTrue
    };

    constructor() { }

    public getErrorMessage(control: FormControl | FormGroup | AbstractControl): string {
        if (control.hasError('notTrue')) {
            return 'Field is required.';

        } else if (control.hasError('invalidEmail')) {
            return 'Field is an invalid E-Mail address.';

        } else if (control.hasError('internalEmail')) {
            return 'Field is not an external E-Mail address.';

        } else if (control.hasError('maxlength')) {
            return `Field requires a max length of
            ${ control.errors['maxlength'].requiredLength}. Actual
            ${ control.errors['maxlength'].actualLength }.`;

        } else if (control.hasError('minlength')) {
            return `Field requires a length of
            ${ control.errors['minlength'].requiredLength }. Actual
            ${ control.errors['minlength'].actualLength }.`;

        } else if (control.hasError('areEqual')) {
            if (control.errors['areEqual'].message) {
                return control.errors['areEqual'].message;
            }
            return 'The given values dont match';

        } else if (control.hasError('required')) {
            return 'Field is required.';

        } else if (control.invalid) {
            return 'Form/Field is invalid.';

        }
        return;
    }

    /**
     * Generates an Array of Validation Functions from the given Array of Keys
     * @param {Array} keyArray all Validation Keys
     * @return {Array} returns an array with all Validatin functions
     */
    public generateValidationsFromKeys(keyArray = []) {
        let result = [];
        if (!keyArray) { return result; }
        for (let i = 0, length = keyArray.length; i < length; i++) {
            let validationName = keyArray[i];
            let validation = this.validationMapping[validationName];
            if (validation) { result.push(validation); }
        }
        return result;
    }

    /**
     * Validation for min length
     * @param {number} length the min Length to be valid
     * @return {ValidatorFn} return a Validation Function
     */
    public validateMinLength(length: number): ValidatorFn {
        return Validators.minLength(length);
    }

    /**
     * Validation for max length
     * @param {number} length the max Length to be valid
     * @return {ValidatorFn} return a Validation Function
     */
    public validateMaxLength(length: number): ValidatorFn {
        return Validators.maxLength(length);
    }

    /**
     * Validatio for external Email
     * @param {FormControl} control the FormControl to be tested
     * @return {Object} return a Object with Information if validation fails
     */
    public validateExternalEmail(control: FormControl): Object {
        if (control.value.match(/hs-augsburg/)) {
            return { internalEmail: true };
        }
    }

    /**
     * Validation for Email
     * @param {FormControl} control the FormControl to be tested
     * @return {Object} return a Object with Information if validation fails
     */
    public validateEmail(control: FormControl): Object {
        if (!control.value.match(/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i)) {
            return { invalidEmail: true };
        }
    }

    /**
     * Validate to be 'true'
     * @param {FormControl} control the FormControl to be tested
     * @return {Object} return a Object with Information if validation fails
     */
    public validateToBeTrue(control: FormControl): Object {
        if (control.value !== true) {
            return { notTrue: true };
        }
    }


    public areEqual(names: string[], message?) {

        return function(group: FormGroup) {
            let value;
            for (let i = 0, length = names.length; i < length; i++) {
                let control = group.controls[names[i]];
                if (!value) {
                    value = control.value;
                } else if (value !== control.value) {
                    return {
                        areEqual: {
                            message: message
                        }
                    };
                }
            }
        };
    }
}
