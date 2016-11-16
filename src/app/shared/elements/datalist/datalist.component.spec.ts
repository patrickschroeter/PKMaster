/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { DatalistComponent } from './datalist.component';
import {
    InputComponent,
    OverlayComponent,
    DynamicFormComponent,
    FormValidationComponent,
    ButtonComponent,
    DeviderComponent,
    CheckboxComponent,
    TextareaComponent,
    RadioComponent,
    SelectComponent
} from './../../';

import {
    AlertService,
    AlertMock,
    InputValidationService,
    InputValidationMock
} from './../../../core';

describe('DatalistComponent', () => {
    let component: DatalistComponent;
    let fixture: ComponentFixture<DatalistComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                DatalistComponent,

                InputComponent,
                OverlayComponent,
                DynamicFormComponent,
                ButtonComponent,
                FormValidationComponent,
                DeviderComponent,
                CheckboxComponent,
                TextareaComponent,
                RadioComponent,
                SelectComponent
            ],
            imports: [
                ReactiveFormsModule
            ],
            providers: [
                { provide: AlertService, useClass: AlertMock },
                { provide: InputValidationService, useClass: InputValidationMock },
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
