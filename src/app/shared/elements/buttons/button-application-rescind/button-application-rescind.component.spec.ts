/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { ButtonApplicationRescindComponent } from './button-application-rescind.component';

import { CoreProviderMock } from 'app/core/core.module';
import { ModalProviderMock } from 'app/modules/overlay/overlay.module';
import { TranslationProviderMock } from 'app/modules/translation/translation.module';
import { AlertProviderMock } from 'app/modules/alert/alert.module';

describe('ButtonApplicationRescindComponent', () => {
    let component: ButtonApplicationRescindComponent;
    let fixture: ComponentFixture<ButtonApplicationRescindComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ButtonApplicationRescindComponent],
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
        fixture = TestBed.createComponent(ButtonApplicationRescindComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
