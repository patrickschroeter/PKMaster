/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { DatalistComponent } from './datalist.component';

import {
    OverlayComponent,
    ButtonComponent,
    SelectComponent,
    RadioComponent,
    TextareaComponent,
    DeviderComponent,
    CheckboxComponent,
    InputComponent
} from './../';

import { DynamicFormComponent } from './../../components';

import {
    AlertService,
    AlertMock
} from './../../../core';

describe('DatalistComponent', () => {
    let component: DatalistComponent;
    let fixture: ComponentFixture<DatalistComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                DatalistComponent,

                OverlayComponent,
                DynamicFormComponent,
                ButtonComponent,
                InputComponent,
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
