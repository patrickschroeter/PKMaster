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

} from './../../';

import { DynamicFormProviderMock } from './../../dynamic-form.module';
import { CoreProviderMock } from './../../../../core/core.module';

import { SharedModule } from './../../../../shared/shared.module';
import { FloatingModule } from './../../../../modules/floating/floating.module';
import { ButtonModule } from './../../../../modules/button/button.module';
import { DeviderModule } from './../../../../modules/devider/devider.module';
import { OverlayModule } from './../../../../modules/overlay/overlay.module';

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
                ReactiveFormsModule,
                FormsModule,
                SharedModule,
                FloatingModule,
                ButtonModule,
                DeviderModule,
                OverlayModule
            ],
            providers: [
                ...DynamicFormProviderMock,
                ...CoreProviderMock
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
