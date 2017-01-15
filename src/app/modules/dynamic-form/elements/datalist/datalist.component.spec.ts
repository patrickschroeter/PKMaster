/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { DatalistComponent } from './datalist.component';

import {
    SelectComponent,
    RadioComponent,
    TextareaComponent,
    CheckboxComponent,
    InputComponent
} from './../';

import {
    DynamicFormComponent,
    DynamicFormComponentMock,
    DynamicFormContentComponent,
    DynamicFormElementComponent,
    DynamicFormSubmitComponent,
    DynamicFormCancelComponent,

    DynamicFormService,
    DynamicFormMock
} from './../../';

import {
    InputValidationService,
    InputValidationMock,
} from './../../../../core';
import { AlertService, AlertMock } from './../../../../modules/alert';
import { ButtonModule } from './../../../../modules/button/button.module';
import { OverlayModule } from './../../../../modules/overlay/overlay.module';
import { DeviderComponent } from './../../../../modules/devider';

import { FloatingModule } from './../../../../modules/floating/floating.module';

describe('DatalistComponent', () => {
    let component: DatalistComponent;
    let fixture: ComponentFixture<DatalistComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                DatalistComponent,

                DynamicFormComponent,
                DynamicFormContentComponent,
                DynamicFormElementComponent,
                DynamicFormSubmitComponent,
                DynamicFormCancelComponent,

                InputComponent,
                DeviderComponent,
                CheckboxComponent,
                TextareaComponent,
                RadioComponent,
                SelectComponent
            ],
            imports: [
                ReactiveFormsModule,
                FloatingModule,
                FormsModule,
                OverlayModule,
                ButtonModule
            ],
            providers: [
                { provide: AlertService, useClass: AlertMock },
                { provide: InputValidationService, useClass: InputValidationMock },
                { provide: DynamicFormComponent, useClass: DynamicFormComponentMock },
                { provide: DynamicFormService, useClass: DynamicFormMock }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DatalistComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
