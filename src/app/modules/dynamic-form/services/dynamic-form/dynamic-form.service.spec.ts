/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { DynamicFormService } from './dynamic-form.service';

import { InputValidationService, InputValidationMock } from './../input-validation';

import { CoreProviderMock } from './../../../../core/core.module';
import { AlertProviderMock } from './../../../../modules/alert/alert.module';

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
});
