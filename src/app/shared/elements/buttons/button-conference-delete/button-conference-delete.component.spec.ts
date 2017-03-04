/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { ButtonConferenceDeleteComponent } from './button-conference-delete.component';

import { CoreProviderMock } from './../../../../core/core.module';
import { ModalProviderMock } from './../../../../modules/overlay/overlay.module';
import { TranslationProviderMock } from './../../../../modules/translation/translation.module';

describe('ButtonConferenceDeleteComponent', () => {
    let component: ButtonConferenceDeleteComponent;
    let fixture: ComponentFixture<ButtonConferenceDeleteComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ButtonConferenceDeleteComponent],
            providers: [
                ...CoreProviderMock,
                ...ModalProviderMock,
                ...TranslationProviderMock
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ButtonConferenceDeleteComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
