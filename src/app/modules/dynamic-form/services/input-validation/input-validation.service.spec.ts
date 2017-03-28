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

/* tslint:disable:no-unused-variable */
import { TestBed, async, inject } from '@angular/core/testing';
import { Validators, FormControl, FormGroup } from '@angular/forms';

import { InputValidationService } from './input-validation.service';

import { TranslationProviderMock } from './../../../translation/translation.module';

describe('Service: InputValidation', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                InputValidationService,
                ...TranslationProviderMock
            ]
        });
    });

    it('should ...', inject([InputValidationService], (service: InputValidationService) => {
        expect(service).toBeTruthy();
    }));

    describe('generateValidationsFromKeys', () => {

        it('should return an empty array if no array is given', inject([InputValidationService], (service: InputValidationService) => {
            const keys: any = null;
            expect(service.generateValidationsFromKeys(keys)).toEqual([]);
        }));

        it('should return an empty array if no array is given', inject([InputValidationService], (service: InputValidationService) => {
            const keys: any = undefined;
            expect(service.generateValidationsFromKeys(keys)).toEqual([]);
        }));

        it('should return an empty array if the given keys are invalid',
            inject([InputValidationService], (service: InputValidationService) => {
                const keys = ['some', 'invalid', 'keys', 'in', 'array'];
                expect(service.generateValidationsFromKeys(keys)).toEqual([]);
            }));

        it('should return an array with functions if the keys are valid',
            inject([InputValidationService], (service: InputValidationService) => {
                const keys = ['isEmail', 'minLength'];
                expect(service.generateValidationsFromKeys(keys).length).toEqual(2);
            }));
    });

    describe('validateMinLength', () => {

        it('shoule return a Validator Function', inject([InputValidationService], (service: InputValidationService) => {
            expect(service.validateMinLength(5)).not.toBeUndefined();
        }));
    });

    describe('validateMaxLength', () => {

        it('shoule return a Validator Function', inject([InputValidationService], (service: InputValidationService) => {
            expect(service.validateMaxLength(5)).not.toBeUndefined();
        }));
    });

    describe('validateExternalEmail', () => {

        it('should return undefined if the input is an external email',
            inject([InputValidationService], (service: InputValidationService) => {
                const control = new FormControl('email@gmail.de');
                expect(service.validateExternalEmail(control)).toBeUndefined();
            }));

        it('should return the error object if the input is an internal email',
            inject([InputValidationService], (service: InputValidationService) => {
                const control = new FormControl('email@hs-augsburg.de');
                expect(service.validateExternalEmail(control)).toEqual(jasmine.any(Object));
            }));

        it('should return the error object if the input is no email',
            inject([InputValidationService], (service: InputValidationService) => {
                const control = new FormControl('email');
                expect(service.validateExternalEmail(control)).toEqual(jasmine.any(Object));
            }));
    });

    describe('validateEmail', () => {

        it('should return the error object if the input is not an email',
            inject([InputValidationService], (service: InputValidationService) => {
                const control = new FormControl('email');
                expect(service.validateEmail(control)).toEqual(jasmine.any(Object));
            }));

        it('should return undefined if the input is an email', inject([InputValidationService], (service: InputValidationService) => {
            const control = new FormControl('email@gmail.de');
            expect(service.validateEmail(control)).toBeUndefined();
        }));
    });

    describe('validateToBeTrue', () => {

        it('should return the error object if the input is not true',
            inject([InputValidationService], (service: InputValidationService) => {
                const control = new FormControl(false);
                expect(service.validateToBeTrue(control)).toEqual(jasmine.any(Object));
            }));

        it('should return undefined if the input is true', inject([InputValidationService], (service: InputValidationService) => {
            const control = new FormControl(true);
            expect(service.validateToBeTrue(control)).toBeUndefined();
        }));
    });

    describe('validateTime', () => {

        it('shold return undefined if the input is valid',
            inject([InputValidationService], (service: InputValidationService) => {
                expect(service.validateTime(new FormControl('0:00'))).toBeUndefined();
                expect(service.validateTime(new FormControl('02:55'))).toBeUndefined();
                expect(service.validateTime(new FormControl('15:01'))).toBeUndefined();
                expect(service.validateTime(new FormControl('23:59'))).toBeUndefined();
                expect(service.validateTime(new FormControl('19:40'))).toBeUndefined();
            })
        );

        it('should return the error object if the input is not a valid time',
            inject([InputValidationService], (service: InputValidationService) => {
                const result = { invalidTime: true };
                expect(service.validateTime(new FormControl('-0:00'))).toEqual(result);
                expect(service.validateTime(new FormControl('13.25'))).toEqual(result);
                expect(service.validateTime(new FormControl('30.00'))).toEqual(result);
                expect(service.validateTime(new FormControl('25:00'))).toEqual(result);
                expect(service.validateTime(new FormControl('19:60'))).toEqual(result);
                expect(service.validateTime(new FormControl('19:65'))).toEqual(result);
                expect(service.validateTime(new FormControl('19:150'))).toEqual(result);
                expect(service.validateTime(new FormControl('190:50'))).toEqual(result);
                expect(service.validateTime(new FormControl('119:250'))).toEqual(result);
                expect(service.validateTime(new FormControl('15'))).toEqual(result);
                expect(service.validateTime(new FormControl('2:5'))).toEqual(result);
                expect(service.validateTime(new FormControl('1'))).toEqual(result);
            })
        );

    });

    describe('areEqual', () => {

        it('should return undefined if the controls with the given names have the same value',
            inject([InputValidationService], (service: InputValidationService) => {
                const result = service.areEqual(['key', 'value'])(new FormGroup({
                    key: new FormControl('password'),
                    value: new FormControl('password')
                }));
                expect(result).toBeUndefined();
            })
        );

        it('should return the default message on fail',
            inject([InputValidationService], (service: InputValidationService) => {
                const result = service.areEqual(['key', 'value'])(new FormGroup({
                    key: new FormControl('password'),
                    value: new FormControl('password2')
                }));
                expect(result).toEqual({ areEqual: { message: 'errorAreEqual' } });
            })
        );

        it('should return the custom message on fail',
            inject([InputValidationService], (service: InputValidationService) => {
                const message = 'this is a message';
                const result = service.areEqual(['key', 'value'], message)(new FormGroup({
                    key: new FormControl('password'),
                    value: new FormControl('password2')
                }));
                expect(result).toEqual({ areEqual: { message: message } });
            })
        );

        it('should return the error if only one control is available',
            inject([InputValidationService], (service: InputValidationService) => {
                const result = service.areEqual(['key', 'value'])(new FormGroup({
                    key: new FormControl('password')
                }));
                expect(result).toEqual({ areEqual: { message: 'errorAreEqual' } });
            })
        );

        it('should work with more than 2 names (success)',
            inject([InputValidationService], (service: InputValidationService) => {
                const result = service.areEqual(['key', 'value', 'result'])(new FormGroup({
                    key: new FormControl('password'),
                    value: new FormControl('password'),
                    result: new FormControl('password')
                }));
                expect(result).toBeUndefined();
            })
        );

        it('should work with more than 2 names (failure)',
            inject([InputValidationService], (service: InputValidationService) => {
                const result = service.areEqual(['key', 'value', 'result'])(new FormGroup({
                    key: new FormControl('password'),
                    value: new FormControl('password'),
                    result: new FormControl('password2')
                }));
                expect(result).toEqual({ areEqual: { message: 'errorAreEqual' } });
            })
        );

        it('should work with true (success)',
            inject([InputValidationService], (service: InputValidationService) => {
                const result = service.areEqual(['key', 'value', 'result'])(new FormGroup({
                    key: new FormControl(true),
                    value: new FormControl(true),
                    result: new FormControl(true)
                }));
                expect(result).toBeUndefined();
            })
        );

        it('should work with false (success)',
            inject([InputValidationService], (service: InputValidationService) => {
                const result = service.areEqual(['key', 'value', 'result'])(new FormGroup({
                    key: new FormControl(false),
                    value: new FormControl(false),
                    result: new FormControl(false)
                }));
                expect(result).toBeUndefined();
            })
        );

        it('should work with booleans (failure)',
            inject([InputValidationService], (service: InputValidationService) => {
                const result = service.areEqual(['key', 'value', 'result'])(new FormGroup({
                    key: new FormControl(true),
                    value: new FormControl(false),
                    result: new FormControl(true)
                }));
                expect(result).toEqual({ areEqual: { message: 'errorAreEqual' } });
            })
        );
    });

    describe('getErrorMessage', () => {

        it('should return undefined if no error is in the Control/Group',
            inject([InputValidationService], (service: InputValidationService) => {
                expect(service.getErrorMessage(new FormControl(false))).toBeUndefined();
            })
        );

        describe('should return the error string', () => {
            let service: InputValidationService;

            beforeEach(inject([InputValidationService], (input: InputValidationService) => {
                service = input;
            }));

            it('(notTrue)', () => {
                expect(service.getErrorMessage(new FormControl(false, service.validateToBeTrue))).toEqual('errorRequired');
            });
            it('(invalidEmail)', () => {
                expect(service.getErrorMessage(new FormControl('false', service.validateEmail))).toEqual('errorInvalidEmail');
            });
            it('(internalEmail)', () => {
                expect(service.getErrorMessage(new FormControl('false', service.validateExternalEmail))).toEqual('errorInternalEmail');
            });
            it('(maxlength)', () => {
                expect(service.getErrorMessage(new FormControl('123456789', service.validateMaxLength(1)))).toEqual('errorMaxLength');
            });
            it('(minlength)', () => {
                expect(service.getErrorMessage(new FormControl(false, service.validateMinLength(5)))).toEqual('errorMinLength');
            });
            it('(areEqual)', () => {
                const group = new FormGroup({
                    key: new FormControl(true),
                    value: new FormControl(false)
                }, service.areEqual(['key', 'value']));
                expect(service.getErrorMessage(group)).toEqual('errorAreEqual');
            });
            it('(invalidTime)', () => {
                expect(service.getErrorMessage(new FormControl('false', service.validateTime))).toEqual('errorInvalidTime');
            });
            it('(required)', () => {
                expect(service.getErrorMessage(new FormControl(undefined, Validators.required))).toEqual('errorRequired');
            });
            it('(invalid)', () => {
                const control = new FormControl(false, (c) => { return {}; });
                expect(service.getErrorMessage(control)).toEqual('errorInvalid');
            });

        });
    });
});
