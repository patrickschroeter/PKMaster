/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { ButtonApplicationEditComponent } from './button-application-edit.component';

describe('ButtonApplicationEditComponent', () => {
    let component: ButtonApplicationEditComponent;
    let fixture: ComponentFixture<ButtonApplicationEditComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ButtonApplicationEditComponent],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ButtonApplicationEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
