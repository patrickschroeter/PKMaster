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
    DynamicFormContentComponent,
    DynamicFormElementComponent,
    DynamicFormSubmitComponent,
    DynamicFormCancelComponent,
} from './../../';

import { DynamicFormProviderMock } from './../../dynamic-form.module';

import { CoreProviderMock } from './../../../../core/core.module';
import { AlertProviderMock } from './../../../../modules/alert/alert.module';

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
                ...DynamicFormProviderMock,
                ...CoreProviderMock,
                ...AlertProviderMock
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
