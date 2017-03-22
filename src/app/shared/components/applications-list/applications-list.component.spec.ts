/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { ApplicationsListComponent } from './applications-list.component';

import { CoreProviderMock } from 'app/core/core.module';
import { SharedProviderMock } from './../../../shared/shared.module';
import { AlertProviderMock } from 'app/modules/alert/alert.module';
import { TranslationProviderMock } from 'app/modules/translation/translation.module';
import { ModalProviderMock } from 'app/modules/overlay/overlay.module';

import { AccessDirective } from './../../';
import { StatusPipe } from './../../../shared';

describe('ApplicationsListComponent', () => {
    let component: ApplicationsListComponent;
    let fixture: ComponentFixture<ApplicationsListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ApplicationsListComponent,
                AccessDirective,
                StatusPipe
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
                ...ModalProviderMock,
                ...SharedProviderMock
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ApplicationsListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
