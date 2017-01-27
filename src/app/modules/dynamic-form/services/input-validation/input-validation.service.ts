import { Injectable, Inject, LOCALE_ID } from '@angular/core';

import { Validators, ValidatorFn, FormControl, FormGroup, AbstractControl } from '@angular/forms';

import { TranslationService } from './../../../translation';

@Injectable()
export class InputValidationService {

    // tslint:disable-next-line:max-line-length
    static emailRegex: RegExp = new RegExp(/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i);

    private validationMapping: Object = {
        minLength: this.validateMinLength(8),
        maxLength: this.validateMaxLength(15),
        useExternalEmail: this.validateExternalEmail,
        isEmail: this.validateEmail,
        toBeTrue: this.validateToBeTrue,
        time: this.validateTime
    };

    constructor(private translationService: TranslationService) { }

    private translate( key: string, interpolations?: (string | number)[]): string {
        return this.translationService.translate(key, interpolations);
    }

    public getErrorMessage(control: FormControl | FormGroup | AbstractControl): string {
        if (control.hasError('notTrue')) {
            return this.translate('errorRequired');

        } else if (control.hasError('invalidEmail')) {
            return this.translate('errorInvalidEmail');

        } else if (control.hasError('internalEmail')) {
            return this.translate('errorInternalEmail');

        } else if (control.hasError('maxlength')) {
            return this.translate('errorMaxLength', [
                control.errors['maxlength'].requiredLength,
                control.errors['maxlength'].actualLength
            ]);

        } else if (control.hasError('minlength')) {
            return this.translate('errorMinLength', [
                control.errors['minlength'].requiredLength,
                control.errors['minlength'].actualLength
            ]);

        } else if (control.hasError('areEqual')) {
            if (control.errors['areEqual'].message) {
                return this.translate(control.errors['areEqual'].message);
            }
            return this.translate('errorAreEqual');

        } else if (control.hasError('invalidTime')) {
            return this.translate('errorInvalidTime');

        } else if (control.hasError('required')) {
            return this.translate('errorRequired');

        } else if (control.invalid) {
            return this.translate('errorInvalid');

        }
        return;
    }

    /**
     * Generates an Array of Validation Functions from the given Array of Keys
     * @param {Array} keyArray all Validation Keys
     * @return {Array} returns an array with all Validatin functions
     */
    public generateValidationsFromKeys(keyArray = []) {
        const result = [];
        if (!keyArray) { return result; }
        for (let i = 0, length = keyArray.length; i < length; i++) {
            const validationName = keyArray[i];
            const validation = this.validationMapping[validationName];
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
        if (!control.value.match(InputValidationService.emailRegex) || control.value.match(/hs-augsburg/)) {
            return { internalEmail: true };
        }
    }

    /**
     * Validation for Email
     * @param {FormControl} control the FormControl to be tested
     * @return {Object} return a Object with Information if validation fails
     */
    public validateEmail(control: FormControl): Object {
        if (!control.value.match(InputValidationService.emailRegex)) {
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

    /**
     * @description validate time input to (h)h:mm
     */
    public validateTime(control: FormControl): Object {
        if (!control.value.match(/^([01]?[0-9]|2[0-3])(:|.)[0-5][0-9]$/gm)) {
            return { invalidTime: true };
        }
    }

    /**
     * Configure a ValidationFn to compare the Controls with the given names
     * Returning an error with the message or uses a custom text
     */
    public areEqual(names: string[], message?): ValidatorFn {
        message = message ? message : this.translate('errorAreEqual');
        return function(group: FormGroup): { [key: string]: any } {
            const result = {
                areEqual: {
                    message: message
                }
            };
            let value;
            for (let i = 0, length = names.length; i < length; i++) {
                const control = group.controls[names[i]];
                // fail if control is missing for one of the keys
                if (!control) {
                    return result;
                }
                // set the first value to compate
                if (!value) {
                    value = control.value;
                } else if (value !== control.value) {
                    return result;
                }
            }
        };
    }
}
