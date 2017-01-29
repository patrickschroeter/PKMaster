/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { ModalOutletComponent } from './modal-outlet.component';

import { ModalProviderMock } from './../../overlay.module';

import { ModalErrorComponent } from './../modal-error/modal-error.component';
import { ModalSelectlistComponent } from './../modal-selectlist/modal-selectlist.component';
import { ModalConfirmationComponent } from './../modal-confirmation/modal-confirmation.component';

describe('ModalOutletComponent', () => {
    let component: ModalOutletComponent;
    let fixture: ComponentFixture<ModalOutletComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ModalOutletComponent,

                ModalErrorComponent,
                ModalSelectlistComponent,
                ModalConfirmationComponent
            ],
            providers: [
                ...ModalProviderMock
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ModalOutletComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
