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

import { ModalSelectlistComponent } from './modal-selectlist.component';

describe('ModalSelectlistComponent', () => {
    let component: ModalSelectlistComponent;
    let fixture: ComponentFixture<ModalSelectlistComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ModalSelectlistComponent],
            providers: [
                { provide: 'title', useValue: 'title' },
                { provide: 'list', useValue: [] },
                { provide: 'click', useValue: () => { } },
                { provide: 'isFluid', useValue: false },
                { provide: 'emptyText', useValue: '' },
                { provide: 'redirect', useValue: false },
                { provide: 'redirectText', useValue: '' },
                { provide: 'redirectFn', useValue: () => { } },
                { provide: 'selectedValue', useValue: '' },
                { provide: 'selectedValues', useValue: [] },
            ],
            schemas: [
                NO_ERRORS_SCHEMA
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ModalSelectlistComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
