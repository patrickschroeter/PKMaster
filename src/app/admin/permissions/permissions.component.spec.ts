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

import { PermissionsComponent } from './permissions.component';

import { CoreProviderMock } from 'app/core/core.module';
import { AlertProviderMock } from 'app/modules/alert/alert.module';
import { TranslationProviderMock } from 'app/modules/translation/translation.module';

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
