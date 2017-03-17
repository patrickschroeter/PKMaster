/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { ConferencesComponent } from './conferences.component';
import { AccessDirective } from './../../shared';

import { CoreProviderMock } from './../../core/core.module';
import { AlertProviderMock } from './../../modules/alert/alert.module';
import { ModalProviderMock } from './../../modules/overlay/overlay.module';
import { TranslationProviderMock } from './../../modules/translation/translation.module';

describe('ConferencesComponent', () => {
    let component: ConferencesComponent;
    let fixture: ComponentFixture<ConferencesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ConferencesComponent,

                AccessDirective
            ],
            imports: [
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
        fixture = TestBed.createComponent(ConferencesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
