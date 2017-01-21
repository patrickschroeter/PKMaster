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

} from './';

import { DynamicFormProviderMock } from './dynamic-form.module';
import { CoreProviderMock } from './../../core/core.module';

import { SharedModule } from './../../shared/shared.module';
import { FloatingModule } from './../../modules/floating/floating.module';
import { ButtonModule } from './../../modules/button/button.module';
import { DeviderModule } from './../../modules/devider/devider.module';
import { OverlayModule } from './../../modules/overlay/overlay.module';

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
        fixture = TestBed.createComponent(DynamicFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
