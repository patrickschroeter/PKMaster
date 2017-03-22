/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { ModalChangePasswordComponent } from './modal-change-password.component';

import { CoreProviderMock } from 'app/core/core.module';

import { DynamicFormProviderMock } from 'app/modules/dynamic-form/dynamic-form.module';
import { AlertProviderMock } from 'app/modules/alert/alert.module';
import { TranslationProviderMock } from 'app/modules/translation/translation.module';

describe('ModalChangePasswordComponent', () => {
    let component: ModalChangePasswordComponent;
    let fixture: ComponentFixture<ModalChangePasswordComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ModalChangePasswordComponent],
            providers: [
                ...CoreProviderMock,
                ...DynamicFormProviderMock,
                ...AlertProviderMock,
                ...TranslationProviderMock
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ModalChangePasswordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
