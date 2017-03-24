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
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { RadioComponent } from './radio.component';
import {
    DynamicFormComponent } from './../../';

describe('RadioComponent', () => {
    let component: RadioComponent;
    let fixture: ComponentFixture<RadioComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                RadioComponent
            ],
            imports: [
                ReactiveFormsModule
            ],
            providers: [
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RadioComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
