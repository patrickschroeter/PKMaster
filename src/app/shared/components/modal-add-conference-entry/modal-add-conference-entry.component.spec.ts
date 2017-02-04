/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { ModalAddConferenceEntryComponent } from './modal-add-conference-entry.component';

import { TranslationProviderMock } from './../../../modules/translation/translation.module';
import { AlertProviderMock } from './../../../modules/alert/alert.module';

describe('ModalAddConferenceEntryComponent', () => {
    let component: ModalAddConferenceEntryComponent;
    let fixture: ComponentFixture<ModalAddConferenceEntryComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ModalAddConferenceEntryComponent
            ],
            providers: [
                ...TranslationProviderMock,
                ...AlertProviderMock
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ModalAddConferenceEntryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
