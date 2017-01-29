/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { ModalErrorComponent } from './modal-error.component';

describe('ModalErrorComponent', () => {
    let component: ModalErrorComponent;
    let fixture: ComponentFixture<ModalErrorComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ModalErrorComponent],
            providers: [
                { provide: 'title', useValue: 'title' },
                { provide: 'message', useValue: 'message' }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ModalErrorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
