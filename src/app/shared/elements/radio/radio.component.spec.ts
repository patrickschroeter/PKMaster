/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { RadioComponent } from './radio.component';
import {
    FormValidationComponent } from './../../';

describe('RadioComponent', () => {
    let component: RadioComponent;
    let fixture: ComponentFixture<RadioComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                FormValidationComponent,
                RadioComponent
            ],
            imports: [
                ReactiveFormsModule
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RadioComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
