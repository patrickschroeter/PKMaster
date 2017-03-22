/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { ButtonApplicationSubmitComponent } from './button-application-submit.component';

import { CoreProviderMock } from 'app/core/core.module';
import { ModalProviderMock } from './../../../../modules/overlay/overlay.module';
import { TranslationProviderMock } from './../../../../modules/translation/translation.module';
import { AlertProviderMock } from './../../../../modules/alert/alert.module';

describe('ButtonApplicationSubmitComponent', () => {
    let component: ButtonApplicationSubmitComponent;
    let fixture: ComponentFixture<ButtonApplicationSubmitComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ButtonApplicationSubmitComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                ...CoreProviderMock,
                ...TranslationProviderMock,
                ...AlertProviderMock,
                ...ModalProviderMock
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ButtonApplicationSubmitComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
