/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { ConferencesDetailComponent } from './conferences-detail.component';

import { CoreProviderMock } from 'app/core/core.module';
import { AlertProviderMock } from './../../../modules/alert/alert.module';
import { OverlayModule, ModalProviderMock } from './../../../modules/overlay/overlay.module';
import { TranslationProviderMock } from './../../../modules/translation/translation.module';

describe('ConferencesDetailComponent', () => {
    let component: ConferencesDetailComponent;
    let fixture: ComponentFixture<ConferencesDetailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ConferencesDetailComponent],
            imports: [
                OverlayModule,
                RouterTestingModule.withRoutes([
                    { path: '', component: class { } },
                ])
            ],
            providers: [
                ...CoreProviderMock,
                ...AlertProviderMock,
                ...ModalProviderMock,
                ...TranslationProviderMock
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ConferencesDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
