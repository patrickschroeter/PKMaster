/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { ApplicationsComponent } from './applications.component';

import { CoreProviderMock } from './../../core/core.module';
import { AlertProviderMock } from './../../modules/alert/alert.module';
import { TranslationProviderMock } from './../../modules/translation/translation.module';
import { ModalProviderMock } from './../../modules/overlay/overlay.module';

import { AccessDirective } from './../../shared';

describe('ApplicationsComponent', () => {
    let component: ApplicationsComponent;
    let fixture: ComponentFixture<ApplicationsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ApplicationsComponent,
                AccessDirective
            ],
            imports: [
                RouterTestingModule.withRoutes([
                    { path: '', component: class { } },
                ])
            ],
            providers: [
                ...AlertProviderMock,
                ...CoreProviderMock,
                ...TranslationProviderMock,
                ...ModalProviderMock
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ApplicationsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
