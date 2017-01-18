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


import { CoreProviderMock } from './../../../../core/core.module';

import { SharedModule } from './../../../../shared/shared.module';
import { FloatingModule } from './../../../../modules/floating/floating.module';
import { DeviderModule } from './../../../../modules/devider/devider.module';
import { ButtonModule } from './../../../../modules/button/button.module';
import { OverlayModule } from './../../../../modules/overlay/overlay.module';

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
                ReactiveFormsModule,
                FormsModule,
                SharedModule,
                FloatingModule,
                DeviderModule,
                OverlayModule,
                ButtonModule
            ],
            providers: [
                { provide: DynamicFormService, useClass: DynamicFormMock },
                { provide: DynamicFormComponent, useClass: DynamicFormComponentMock },
                ...CoreProviderMock
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
