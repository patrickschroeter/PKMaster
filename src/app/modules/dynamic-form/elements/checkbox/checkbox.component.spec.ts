/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { CheckboxComponent } from './checkbox.component';
import {
    DynamicFormComponent, DynamicFormComponentMock } from './../../';

describe('CheckboxComponent', () => {
    let component: CheckboxComponent;
    let fixture: ComponentFixture<CheckboxComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                CheckboxComponent
            ],
            imports: [
                ReactiveFormsModule
            ],
            providers: [
                { provide: DynamicFormComponent, useClass: DynamicFormComponentMock }
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CheckboxComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
