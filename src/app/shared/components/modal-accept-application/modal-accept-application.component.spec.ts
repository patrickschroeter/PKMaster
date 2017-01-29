/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { ModalAcceptApplicationComponent } from './modal-accept-application.component';

/** Services */
import { CoreProviderMock } from './../../../core/core.module';

/** Components */
import { OverlayComponent } from './../../../modules/overlay';

describe('ModalAcceptApplicationComponent', () => {
    let component: ModalAcceptApplicationComponent;
    let fixture: ComponentFixture<ModalAcceptApplicationComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ModalAcceptApplicationComponent,

                OverlayComponent
            ],
            providers: [
                ...CoreProviderMock
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ModalAcceptApplicationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
