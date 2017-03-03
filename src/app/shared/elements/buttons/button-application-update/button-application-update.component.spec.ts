/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { ButtonApplicationUpdateComponent } from './button-application-update.component';

describe('ButtonApplicationUpdateComponent', () => {
    let component: ButtonApplicationUpdateComponent;
    let fixture: ComponentFixture<ButtonApplicationUpdateComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ButtonApplicationUpdateComponent],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ButtonApplicationUpdateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
