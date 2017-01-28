/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { ChangePasswordOverlayComponent } from './change-password-overlay.component';

import { CoreProviderMock } from './../../../core/core.module';

import { DynamicFormProviderMock } from './../../../modules/dynamic-form/dynamic-form.module';
import { AlertProviderMock } from './../../../modules/alert/alert.module';
import { TranslationProviderMock } from './../../../modules/translation/translation.module';

describe('ChangePasswordOverlayComponent', () => {
    let component: ChangePasswordOverlayComponent;
    let fixture: ComponentFixture<ChangePasswordOverlayComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ChangePasswordOverlayComponent],
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
        fixture = TestBed.createComponent(ChangePasswordOverlayComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
