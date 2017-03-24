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
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { DynamicFormDisabledComponent } from './dynamic-form-disabled.component';

import { DynamicFormProviderMock } from './../../dynamic-form.module';
import { CoreProviderMock } from 'app/core/core.module';

describe('DynamicFormDisabledComponent', () => {
    let component: DynamicFormDisabledComponent;
    let fixture: ComponentFixture<DynamicFormDisabledComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                DynamicFormDisabledComponent
            ],
            imports: [
                ReactiveFormsModule,
                FormsModule
            ],
            providers: [
                ...DynamicFormProviderMock,
                ...CoreProviderMock
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DynamicFormDisabledComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
