/**
 *
 * @author Patrick Schröter <patrick.schroeter@hotmail.de>
 *
 * @license CreativeCommons BY-NC-SA 4.0 2017
 *
 * This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/.
 *
 */

/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { ApplicationsListComponent } from './applications-list.component';

import { CoreProviderMock } from 'app/core/core.module';
import { SharedProviderMock } from 'app/shared/shared.module';
import { AlertProviderMock } from 'app/modules/alert/alert.module';
import { TranslationProviderMock } from 'app/modules/translation/translation.module';
import { ModalProviderMock } from 'app/modules/overlay/overlay.module';

import { AccessDirective } from 'app/shared/';
import { StatusPipe } from 'app/shared';

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
