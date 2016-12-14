/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AlertComponent } from './alert.component';
import { AlertService, AlertMock } from './../../';

import { FloatingModule } from './../../../../modules/floating/floating.module';
import { ButtonModule } from './../../../../modules/button/button.module';
import { OverlayModule } from './../../../../modules/overlay/overlay.module';

describe('AlertComponent', () => {
    let component: AlertComponent;
    let fixture: ComponentFixture<AlertComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AlertComponent
            ],
            imports: [
                FloatingModule,
                ButtonModule,
                OverlayModule,
            ],
            providers: [
                { provide: AlertService, useClass: AlertMock }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AlertComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
