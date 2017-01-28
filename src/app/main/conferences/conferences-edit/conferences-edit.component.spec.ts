/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { ConferencesEditComponent } from './conferences-edit.component';

import { CoreProviderMock } from './../../../core/core.module';
import { AlertProviderMock } from './../../../modules/alert/alert.module';
import { TranslationProviderMock } from './../../../modules/translation/translation.module';

describe('ConferencesEditComponent', () => {
    let component: ConferencesEditComponent;
    let fixture: ComponentFixture<ConferencesEditComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ConferencesEditComponent
            ],
            imports: [
                RouterTestingModule.withRoutes([{ path: '', component: class { } }]),
            ],
            providers: [
                ...CoreProviderMock,
                ...AlertProviderMock,
                ...TranslationProviderMock
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ConferencesEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
