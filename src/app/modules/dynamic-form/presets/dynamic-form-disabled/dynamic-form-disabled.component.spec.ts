/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { DynamicFormDisabledComponent } from './dynamic-form-disabled.component';

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

import { CoreProviderMock } from './../../../../core/core.module';

import { SharedModule } from './../../../../shared/shared.module';
import { FloatingModule } from './../../../../modules/floating/floating.module';
import { DeviderModule } from './../../../../modules/devider/devider.module';
import { OverlayModule } from './../../../../modules/overlay/overlay.module';
import { ButtonModule } from './../../../../modules/button/button.module';

describe('DynamicFormDisabledComponent', () => {
    let component: DynamicFormDisabledComponent;
    let fixture: ComponentFixture<DynamicFormDisabledComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                DynamicFormDisabledComponent,

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
                ...CoreProviderMock
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DynamicFormDisabledComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
