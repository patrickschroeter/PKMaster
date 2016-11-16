/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OverlayComponent } from './overlay.component';
import { ButtonComponent } from './../../';
// import { A } from './../../../core';

describe('OverlayComponent', () => {
    let component: OverlayComponent;
    let fixture: ComponentFixture<OverlayComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                OverlayComponent,
                ButtonComponent
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OverlayComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
