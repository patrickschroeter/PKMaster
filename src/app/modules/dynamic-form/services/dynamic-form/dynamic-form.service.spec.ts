/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { DynamicFormService } from './dynamic-form.service';

import {
    InputValidationService,
    InputValidationMock,
    AlertService,
    AlertMock
} from './../../../../core';

describe('Service: DynamicForm', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                FormBuilder,
                DynamicFormService,

                { provide: InputValidationService, useClass: InputValidationMock },
                { provide: AlertService, useClass: AlertMock }
            ]
        });
    });

    it('should ...', inject([DynamicFormService], (service: DynamicFormService) => {
        expect(service).toBeTruthy();
    }));
});
