/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { RolesDetailComponent } from './roles-detail.component';

import { CoreProviderMock } from 'app/core/core.module';
import { ModalProviderMock } from './../../../modules/overlay/overlay.module';
import { TranslationProviderMock } from './../../../modules/translation/translation.module';
import { AlertProviderMock } from './../../../modules/alert/alert.module';

describe('RolesDetailComponent', () => {
    let component: RolesDetailComponent;
    let fixture: ComponentFixture<RolesDetailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                RolesDetailComponent
            ],
            providers: [
                ...CoreProviderMock,
                ...ModalProviderMock,
                ...TranslationProviderMock,
                ...AlertProviderMock
            ],
            imports: [
                RouterTestingModule.withRoutes([
                    { path: '', component: class { } },
                ])
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RolesDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
