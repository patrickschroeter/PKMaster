/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { IdentifyComponent } from './identify.component';

describe('IdentifyComponent', () => {
    let component: IdentifyComponent;
    let fixture: ComponentFixture<IdentifyComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [IdentifyComponent],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(IdentifyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
