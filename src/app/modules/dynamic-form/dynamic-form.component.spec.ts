/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { DynamicFormComponent } from './dynamic-form.component';

import {
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
} from './';

import {
    InputValidationService,
    InputValidationMock
} from './../../core';

import { SharedModule } from './../../shared/shared.module';
import { FloatingModule } from './../../modules/floating/floating.module';

describe('DynamicFormComponent', () => {
    let component: DynamicFormComponent;
    let fixture: ComponentFixture<DynamicFormComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
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
        fixture = TestBed.createComponent(DynamicFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
