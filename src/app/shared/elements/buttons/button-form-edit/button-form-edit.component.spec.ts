/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { ButtonFormEditComponent } from './button-form-edit.component';

describe('ButtonFormEditComponent', () => {
    let component: ButtonFormEditComponent;
    let fixture: ComponentFixture<ButtonFormEditComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ButtonFormEditComponent],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ButtonFormEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
