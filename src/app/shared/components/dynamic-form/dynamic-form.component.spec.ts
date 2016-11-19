/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { DynamicFormComponent } from './dynamic-form.component';
import {
    InputComponent,
    OverlayComponent,
    ButtonComponent,
    DeviderComponent,
    CheckboxComponent,
    TextareaComponent,
    RadioComponent,
    SelectComponent,
    DatalistComponent,

    DynamicFormService,
    DynamicFormMock
} from './../../';

import {
    AlertService,
    AlertMock,
    InputValidationService,
    InputValidationMock
} from './../../../core';

describe('DynamicFormComponent', () => {
    let component: DynamicFormComponent;
    let fixture: ComponentFixture<DynamicFormComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                DynamicFormComponent,

                DatalistComponent,
                InputComponent,
                OverlayComponent,
                ButtonComponent,
                DeviderComponent,
                CheckboxComponent,
                TextareaComponent,
                RadioComponent,
                SelectComponent
            ],
            imports: [
                ReactiveFormsModule
            ],
            providers: [
                { provide: AlertService, useClass: AlertMock },
                { provide: InputValidationService, useClass: InputValidationMock },
                { provide: DynamicFormService, useClass: DynamicFormMock },
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DynamicFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
