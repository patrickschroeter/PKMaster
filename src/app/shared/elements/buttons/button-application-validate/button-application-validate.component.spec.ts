/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { ButtonApplicationValidateComponent } from './button-application-validate.component';

import { CoreProviderMock } from 'app/core/core.module';
import { ModalProviderMock } from 'app/modules/overlay/overlay.module';
import { TranslationProviderMock } from 'app/modules/translation/translation.module';
import { AlertProviderMock } from 'app/modules/alert/alert.module';

describe('ButtonApplicationValidateComponent', () => {
    let component: ButtonApplicationValidateComponent;
    let fixture: ComponentFixture<ButtonApplicationValidateComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ButtonApplicationValidateComponent],
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
        fixture = TestBed.createComponent(ButtonApplicationValidateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
