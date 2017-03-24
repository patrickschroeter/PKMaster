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

import { ModalConfirmationComponent } from './modal-confirmation.component';

describe('ModalConfirmationComponent', () => {
    let component: ModalConfirmationComponent;
    let fixture: ComponentFixture<ModalConfirmationComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ModalConfirmationComponent],
            providers: [
                { provide: 'title', useValue: 'title' },
                { provide: 'message', useValue: 'message' },
                { provide: 'confirm', useValue: () => { } },
                { provide: 'confirmText', useValue: 'confirm' },
                { provide: 'cancel', useValue: () => { } },
                { provide: 'cancelText', useValue: 'cancel' }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ModalConfirmationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
