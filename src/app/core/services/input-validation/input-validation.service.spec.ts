/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { InputValidationService } from './input-validation.service';

import { Validators, FormControl } from '@angular/forms';

describe('Service: InputValidation', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [InputValidationService]
        });
    });

    it('should ...', inject([InputValidationService], (service: InputValidationService) => {
        expect(service).toBeTruthy();
    }));

    describe('generateValidationsFromKeys', () => {

        it('should return an empty array if no array is given', inject([InputValidationService], (service: InputValidationService) => {
            let keys = null;
            expect(service.generateValidationsFromKeys(keys)).toEqual([]);
        }));

        it('should return an empty array if the given keys are invalid', inject([InputValidationService], (service: InputValidationService) => {
            let keys = ['some', 'invalid', 'keys', 'in', 'array'];
            expect(service.generateValidationsFromKeys(keys)).toEqual([]);
        }));

        it('should return an array with functions if the keys are valid', inject([InputValidationService], (service: InputValidationService) => {
            let keys = ['isEmail', 'minLength'];
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

        it('should return undefined if the input is an external email', inject([InputValidationService], (service: InputValidationService) => {
            let control = new FormControl('email@gmail.de');
            expect(service.validateExternalEmail(control)).toBeUndefined();
        }));

        it('should return the error object if the input is an internal email', inject([InputValidationService], (service: InputValidationService) => {
            let control = new FormControl('email@hs-augsburg.de');
            expect(service.validateExternalEmail(control)).toEqual(jasmine.any(Object));
        }));

        it('should return undefined if the input is no email', inject([InputValidationService], (service: InputValidationService) => {
            let control = new FormControl('email');
            expect(service.validateExternalEmail(control)).toBeUndefined();
        }));
    });

    describe('validateEmail', () => {

        it('should return the error object if the input is not an email', inject([InputValidationService], (service: InputValidationService) => {
            let control = new FormControl('email');
            expect(service.validateEmail(control)).toEqual(jasmine.any(Object));
        }));

        it('should return undefined if the input is an email', inject([InputValidationService], (service: InputValidationService) => {
            let control = new FormControl('email@gmail.de');
            expect(service.validateEmail(control)).toBeUndefined();
        }));
    });

    describe('validateToBeTrue', () => {

        it('should return the error object if the input is not true', inject([InputValidationService], (service: InputValidationService) => {
            let control = new FormControl(false);
            expect(service.validateToBeTrue(control)).toEqual(jasmine.any(Object));
        }));

        it('should return undefined if the input is true', inject([InputValidationService], (service: InputValidationService) => {
            let control = new FormControl(true);
            expect(service.validateToBeTrue(control)).toBeUndefined();
        }));
    });
});
