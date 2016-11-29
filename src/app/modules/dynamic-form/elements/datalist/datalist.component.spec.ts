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

import {
    AlertService,
    AlertMock
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
