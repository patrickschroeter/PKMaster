/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { DynamicFormElementComponent } from './dynamic-form-element.component';

import {
    DynamicFormComponent,
    DynamicFormComponentMock,
    DynamicFormContentComponent,
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

describe('DynamicFormElementComponent', () => {
    let component: DynamicFormElementComponent;
    let fixture: ComponentFixture<DynamicFormElementComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                DynamicFormElementComponent,

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
                { provide: DynamicFormService, useClass: DynamicFormMock },
                { provide: DynamicFormComponent, useClass: DynamicFormComponentMock },
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DynamicFormElementComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
