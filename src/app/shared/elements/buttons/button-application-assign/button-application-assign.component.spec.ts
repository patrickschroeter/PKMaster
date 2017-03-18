import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { ButtonApplicationAssignComponent } from './button-application-assign.component';

import { CoreProviderMock } from './../../../../core/core.module';
import { ModalProviderMock } from './../../../../modules/overlay/overlay.module';
import { TranslationProviderMock } from './../../../../modules/translation/translation.module';
import { AlertProviderMock } from './../../../../modules/alert/alert.module';

describe('ButtonApplicationAssignComponent', () => {
    let component: ButtonApplicationAssignComponent;
    let fixture: ComponentFixture<ButtonApplicationAssignComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ButtonApplicationAssignComponent],
            providers: [
                ...CoreProviderMock,
                ...TranslationProviderMock,
                ...AlertProviderMock,
                ...ModalProviderMock
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ButtonApplicationAssignComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
