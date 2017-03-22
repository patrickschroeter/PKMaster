/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { ConferenceEntryComponent } from './conference-entry.component';

import { CoreProviderMock } from 'app/core/core.module';
import { WindowMock } from './../../../shared';

import { TranslationProviderMock } from 'app/modules/translation/translation.module';
import { AlertProviderMock } from 'app/modules/alert/alert.module';
import { ModalProviderMock } from 'app/modules/overlay/overlay.module';

describe('ConferenceEntryComponent', () => {
    let component: ConferenceEntryComponent;
    let fixture: ComponentFixture<ConferenceEntryComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ConferenceEntryComponent
            ],
            providers: [
                ...CoreProviderMock,
                ...TranslationProviderMock,
                ...AlertProviderMock,
                ...ModalProviderMock,
                { provide: 'EntryModalService', useClass: WindowMock },
                { provide: 'ListModalService', useClass: WindowMock }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ConferenceEntryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
