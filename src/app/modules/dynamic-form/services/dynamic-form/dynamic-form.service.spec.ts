/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { DynamicFormService } from './dynamic-form.service';

import { InputValidationService, InputValidationMock } from './../input-validation';

import { CoreProviderMock } from './../../../../core/core.module';
import { AlertProviderMock } from './../../../../modules/alert/alert.module';
import { AlertService } from './../../../../modules/alert';

import { Fields } from './../../../../models';

describe('Service: DynamicForm', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                FormBuilder,
                DynamicFormService,

                { provide: InputValidationService, useClass: InputValidationMock },
                ...CoreProviderMock,
                ...AlertProviderMock
            ]
        });
    });

    it('should ...', inject([DynamicFormService], (service: DynamicFormService) => {
        expect(service).toBeTruthy();
    }));

    describe('generateFormFromInput', () => {
        let service: DynamicFormService;
        let validation: InputValidationService;

        beforeEach(
            inject([DynamicFormService, InputValidationService],
                (dynamic: DynamicFormService, validationeService: InputValidationService) => {
                    service = dynamic;
                    validation = validationeService;
                }
            )
        );

        it('should create a FormGroup with a control for every valid Field in input', () => {
            const group: FormGroup = service.generateFormFromInput([
                new Fields.Email(), new Fields.FieldName()
            ]);
            expect(group.get('email')).toBeTruthy();
            expect(group.get('name')).toBeTruthy();

            expect(group.get('input')).toBeFalsy();
        });

        it('should not create a control for a disabled Field', () => {
            const group: FormGroup = service.generateFormFromInput([
                { name: 'test', disabled: true }
            ]);
            expect(group.get('test')).toBeFalsy();
        });

        it('should create validations for control', () => {
            const group: FormGroup = service.generateFormFromInput([
                { name: 'test', required: false },
                { name: 'required', required: true }
            ]);
            expect(group.get('test').valid).toBeTruthy();
            expect(group.get('required').valid).toBeFalsy();
        });

        it('should request special validations from the service', () => {
            spyOn(validation, 'generateValidationsFromKeys');
            service.generateFormFromInput([
                { name: 'validations', validations: ['special'] }
            ]);
            expect(validation.generateValidationsFromKeys).toHaveBeenCalledWith(['special']);
        });

        it('should set \'\' as Control Value if the Field defines no value', () => {
            const group: FormGroup = service.generateFormFromInput([
                { name: 'value' },
            ]);
            expect(group.get('value').value).toEqual('');
        });

        it('should set Null as Control Value if the Field defines no value and it\'s multiselect', () => {
            const group: FormGroup = service.generateFormFromInput([
                { name: 'value', multipleSelect: true },
            ]);
            expect(group.get('value').value).toBeNull();
        });

        it('should set the Field Value as Control Value', () => {
            const group: FormGroup = service.generateFormFromInput([
                { name: 'value', value: 'Value' },
            ]);
            expect(group.get('value').value).toEqual('Value');
        });
    });

    describe('updateFormFromInput', () => {
        let service: DynamicFormService;
        let validation: InputValidationService;

        beforeEach(
            inject([DynamicFormService, InputValidationService],
                (dynamic: DynamicFormService, validationeService: InputValidationService) => {
                    service = dynamic;
                    validation = validationeService;
                }
            )
        );

        it('should add all new fields to the FormGroup', () => {
            const group: FormGroup = service.generateFormFromInput([]);

            expect(group.get('field')).toBeNull();
            expect(group.get('field2')).toBeNull();

            service.updateFormFromInput(group, [
                { name: 'field' }
            ]);

            expect(group.get('field')).toBeDefined();

            service.updateFormFromInput(group, [
                { name: 'field2' }
            ]);

            expect(group.get('field2')).toBeDefined();
        });

        it('should remove all missing fields from the FormGroup', () => {
            const group: FormGroup = service.generateFormFromInput([
                { name: 'field' }
            ]);
            expect(group.get('field')).toBeDefined();

            service.updateFormFromInput(group, []);

            expect(group.get('field')).toBeNull();
        });

        it('should update the value of all existing Controls', () => {
            const group: FormGroup = service.generateFormFromInput([
                { name: 'field', value: 'no-value' }
            ]);

            expect(group.get('field').value).toEqual('no-value');

            service.updateFormFromInput(group, [
                { name: 'field', value: 'value' }
            ]);

            expect(group.get('field').value).toEqual('value');
        });
    });

    describe('showValidation', () => {
        let service: DynamicFormService;
        let alert: AlertService;
        let validation: InputValidationService;

        beforeEach(
            inject([DynamicFormService, AlertService, InputValidationService],
                (dynamic: DynamicFormService, alertService: AlertService, validationService: InputValidationService) => {
                    service = dynamic;
                    alert = alertService;
                    validation = validationService;
                }
            )
        );

        it('should request the validation of the Form', () => {
            spyOn(validation, 'getErrorMessage');
            service.showValidation(new FormControl());
            expect(validation.getErrorMessage).toHaveBeenCalled();
        });

        it('should alert the validation message', () => {
            spyOn(validation, 'getErrorMessage').and.returnValue('message');
            spyOn(alert, 'setErrorHint');
            service.showValidation(new FormControl());
            expect(alert.setErrorHint).toHaveBeenCalled();
        });

        it('should not alert anything if there is no message', () => {
            spyOn(validation, 'getErrorMessage').and.returnValue(false);
            spyOn(alert, 'setErrorHint');
            service.showValidation(new FormControl());
            expect(alert.setErrorHint).not.toHaveBeenCalled();
        });
    });

    describe('showElementValidation', () => {
        let service: DynamicFormService;

        beforeEach(
            inject([DynamicFormService],
                (dynamic: DynamicFormService) => {
                    service = dynamic;
                }
            )
        );

        it('should show the validation if a control is given', () => {
            spyOn(service, 'showValidation');
            service.showElementValidation(new FormControl());
            expect(service.showValidation).toHaveBeenCalled();
        });

        it('should do nothing if no control is given', () => {
            spyOn(service, 'showValidation');
            service.showElementValidation();
            expect(service.showValidation).not.toHaveBeenCalled();
        });
    });

    describe('hideValidation', () => {
        let service: DynamicFormService;
        let alert: AlertService;
        let validation: InputValidationService;

        beforeEach(
            inject([DynamicFormService, AlertService, InputValidationService],
                (dynamic: DynamicFormService, alertService: AlertService, validationService: InputValidationService) => {
                    service = dynamic;
                    alert = alertService;
                    validation = validationService;
                }
            )
        );

        it('should remove all validations', () => {
            spyOn(alert, 'removeHint');
            service.hideValidation();
            expect(alert.removeHint).toHaveBeenCalledWith('validation');
        });
    });
});
