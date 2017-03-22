/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { PermissionsComponent } from './permissions.component';

import { CoreProviderMock } from 'app/core/core.module';
import { AlertProviderMock } from './../../modules/alert/alert.module';
import { TranslationProviderMock } from './../../modules/translation/translation.module';

describe('PermissionsComponent', () => {
    let component: PermissionsComponent;
    let fixture: ComponentFixture<PermissionsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                PermissionsComponent
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
        fixture = TestBed.createComponent(PermissionsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
