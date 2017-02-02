/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { ModalAddConferenceTableEntryComponent } from './modal-add-conference-table-entry.component';

describe('ModalAddConferenceTableEntryComponent', () => {
    let component: ModalAddConferenceTableEntryComponent;
    let fixture: ComponentFixture<ModalAddConferenceTableEntryComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ModalAddConferenceTableEntryComponent
            ], schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ModalAddConferenceTableEntryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
