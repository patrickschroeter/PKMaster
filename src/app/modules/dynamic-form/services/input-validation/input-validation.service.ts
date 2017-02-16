import { Injectable, Inject, LOCALE_ID } from '@angular/core';

import { Validators, ValidatorFn, FormControl, FormGroup, AbstractControl } from '@angular/forms';

import { TranslationService } from './../../../translation';

/**
 * Service to generate ValidationFn by Keys
 *
 * @export
 * @class InputValidationService
 */
@Injectable()
export class InputValidationService {

    /**
     * RegExp for Email Validation
     *
     * @static
     * @type {RegExp}
     * @memberOf InputValidationService
     */
    // tslint:disable-next-line:max-line-length
    static emailRegex: RegExp = new RegExp(/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i);

    /**
     * Mapping for ValidationFn to Key
     *
     * @private
     * @type {Object<ValidatorFn>}
     * @memberOf InputValidationService
     */
    private validationMapping: { [key: string]: ValidatorFn } = {
        minLength: this.validateMinLength(8),
        maxLength: this.validateMaxLength(15),
        useExternalEmail: this.validateExternalEmail,
        isEmail: this.validateEmail,
        toBeTrue: this.validateToBeTrue,
        time: this.validateTime
    };

    /**
     * Creates an instance of InputValidationService.
     *
     * @param {TranslationService} translationService
     *
     * @memberOf InputValidationService
     */
    constructor(private translationService: TranslationService) { }

    /**
     * Mapping to TranslationService
     *
     * @private
     * @param {String} key
     * @param {Array} [interpolations]
     * @returns {String}
     *
     * @memberOf InputValidationService
     */
    private translate( key: string, interpolations?: (string | number)[]): string {
        return this.translationService.translate(key, interpolations);
    }

    /**
     * Get the Error Message from AbstractControl
     *
     * @param {AbstractControl} control
     * @returns {String}
     *
     * @memberOf InputValidationService
     */
    public getErrorMessage(control: AbstractControl): string {
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
            return this.translate(control.errors['areEqual'].message);

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
     *
     * @param {String[]} [keyArray=[]]
     * @returns {ValidatorFn[]}
     *
     * @memberOf InputValidationService
     */
    public generateValidationsFromKeys(keyArray: string[] = []): ValidatorFn[] {
        const result: ValidatorFn[] = [];
        if (!keyArray) { return result; }
        for (let i = 0; i < keyArray.length; i++) {
            const validationName = keyArray[i];
            const validation = this.validationMapping[validationName];
            if (validation) { result.push(validation); }
        }
        return result;
    }

    /**
     * Validation for min length
     *
     * @param {Number} length
     * @returns {ValidatorFn}
     *
     * @memberOf InputValidationService
     */
    public validateMinLength(length: number): ValidatorFn {
        return Validators.minLength(length);
    }

    /**
     * Validation for max length
     *
     * @param {Number} length
     * @returns {ValidatorFn}
     *
     * @memberOf InputValidationService
     */
    public validateMaxLength(length: number): ValidatorFn {
        return Validators.maxLength(length);
    }

    /**
     * Validatio for external Email
     *
     * @param {FormControl} control
     * @returns {Object}
     *
     * @memberOf InputValidationService
     */
    public validateExternalEmail(control: FormControl): Object {
        if (!control.value) { return null; }
        if (!control.value.match(InputValidationService.emailRegex) || control.value.match(/hs-augsburg/)) {
            return { internalEmail: true };
        }
    }

    /**
     * Validation for Email
     *
     * @param {FormControl} control
     * @returns {Object}
     *
     * @memberOf InputValidationService
     */
    public validateEmail(control: FormControl): Object {
        if (!control.value) { return null; }
        if (!control.value.match(InputValidationService.emailRegex)) {
            return { invalidEmail: true };
        }
    }

    /**
     * Validate to be 'true'
     *
     * @param {FormControl} control
     * @returns {Object}
     *
     * @memberOf InputValidationService
     */
    public validateToBeTrue(control: FormControl): Object {
        if (control.value !== true) {
            return { notTrue: true };
        }
    }

    /**
     * validate time input to (h)h:mm
     *
     * @param {FormControl} control
     * @returns {Object}
     *
     * @memberOf InputValidationService
     */
    public validateTime(control: FormControl): Object {
        if (!control.value) { return null; }
        if (!control.value.match(/^([01]?[0-9]|2[0-3])(:)[0-5][0-9]$/gm)) {
            return { invalidTime: true };
        }
    }

    /**
     * Configure a ValidationFn to compare the Controls with the given names
     * Returning an error with the message or uses a custom text
     *
     * @param {string[]} names
     * @param {string} [message]
     * @returns {ValidatorFn}
     *
     * @memberOf InputValidationService
     */
    public areEqual(names: string[], message?: string): ValidatorFn {
        message = message ? message : this.translate('errorAreEqual');
        return function(group: FormGroup): { [key: string]: any } {
            const result = {
                areEqual: {
                    message: message
                }
            };
            let value: any;
            for (let i = 0; i < names.length; i++) {
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
