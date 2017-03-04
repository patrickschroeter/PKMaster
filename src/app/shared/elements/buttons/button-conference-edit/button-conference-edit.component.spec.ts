/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { ButtonConferenceEditComponent } from './button-conference-edit.component';

describe('ButtonConferenceEditComponent', () => {
    let component: ButtonConferenceEditComponent;
    let fixture: ComponentFixture<ButtonConferenceEditComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ButtonConferenceEditComponent],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ButtonConferenceEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
