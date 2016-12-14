/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { DynamicFormEditComponent } from './dynamic-form-edit.component';

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
import { ButtonModule } from './../../../../modules/button/button.module';
import { DeviderModule } from './../../../../modules/devider/devider.module';
import { OverlayModule } from './../../../../modules/overlay/overlay.module';

describe('DynamicFormEditComponent', () => {
    let component: DynamicFormEditComponent;
    let fixture: ComponentFixture<DynamicFormEditComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                DynamicFormEditComponent,

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
                ReactiveFormsModule,
                FormsModule,
                SharedModule,
                FloatingModule,
                ButtonModule,
                DeviderModule,
                OverlayModule
            ],
            providers: [
                { provide: InputValidationService, useClass: InputValidationMock },
                { provide: DynamicFormService, useClass: DynamicFormMock }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DynamicFormEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
