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

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { UsersDetailComponent } from './users-detail.component';

/** Provider */
import { CoreProviderMock } from 'app/core/core.module';
import { ModalProviderMock } from 'app/modules/overlay/overlay.module';
import { TranslationProviderMock } from 'app/modules/translation/translation.module';
import { AlertProviderMock } from 'app/modules/alert/alert.module';

describe('UsersDetailComponent', () => {
    let component: UsersDetailComponent;
    let fixture: ComponentFixture<UsersDetailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                UsersDetailComponent
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
        fixture = TestBed.createComponent(UsersDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
