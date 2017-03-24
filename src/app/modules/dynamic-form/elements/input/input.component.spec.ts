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
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { InputComponent } from './input.component';
import {
    DynamicFormComponent
} from './../../';

// import {  } from './../../';

describe('Component: Input', () => {
    let fixture: ComponentFixture<any>;
    let component: InputComponent;
    let input: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                InputComponent
            ],
            imports: [
                ReactiveFormsModule
            ],
            providers: [
            ]
        });

        TestBed.compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InputComponent);
        component = fixture.componentInstance;
        input = fixture.debugElement.query(By.css('input'));
    });

    it('should create an instance', () => {
        expect(component).toBeTruthy();
    });
});
