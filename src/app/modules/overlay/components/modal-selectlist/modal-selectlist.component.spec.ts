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
                { provide: 'click', useValue: () => {} },
                { provide: 'isFluid', useValue: false },
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
