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
    AlertService,
    AlertMock,
    InputValidationService,
    InputValidationMock,
} from './../../../../core';

import {
    OverlayComponent,
    ButtonComponent,
    DeviderComponent
} from './../../../../shared';
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

                OverlayComponent,
                ButtonComponent,
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
                FormsModule
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
