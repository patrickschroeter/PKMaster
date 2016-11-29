/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { DynamicFormDefaultComponent } from './dynamic-form-default.component';

import {
    DynamicFormComponent,
    DynamicFormContentComponent,
    DynamicFormElementComponent,
    DynamicFormSubmitComponent,
    DynamicFormCancelComponent,

    TextareaComponent,
    InputComponent,
    DatalistComponent,
    RadioComponent,
    CheckboxComponent,
    SelectComponent,

    DynamicFormService,
    DynamicFormMock
} from './../../';

import {
    InputValidationService,
    InputValidationMock
} from './../../../../core';

import { SharedModule } from './../../../../shared/shared.module';
import { FloatingModule } from './../../../../modules/floating/floating.module';

describe('DynamicFormDefaultComponent', () => {
    let component: DynamicFormDefaultComponent;
    let fixture: ComponentFixture<DynamicFormDefaultComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                DynamicFormDefaultComponent,

                DynamicFormComponent,
                DynamicFormContentComponent,
                DynamicFormElementComponent,
                DynamicFormSubmitComponent,
                DynamicFormCancelComponent,
                TextareaComponent,
                InputComponent,
                DatalistComponent,
                RadioComponent,
                CheckboxComponent,
                SelectComponent
            ],
            imports: [
                SharedModule,
                FloatingModule,
                ReactiveFormsModule,
                FormsModule
            ],
            providers: [
                { provide: InputValidationService, useClass: InputValidationMock },
                { provide: DynamicFormService, useClass: DynamicFormMock }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DynamicFormDefaultComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
