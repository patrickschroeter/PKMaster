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
