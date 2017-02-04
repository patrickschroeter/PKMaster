/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { ModalAddConferenceListComponent } from './modal-add-conference-list.component';

describe('ModalAddConferenceListEntryComponent', () => {
    let component: ModalAddConferenceListComponent;
    let fixture: ComponentFixture<ModalAddConferenceListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ModalAddConferenceListComponent
            ], schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ModalAddConferenceListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
