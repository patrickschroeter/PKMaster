/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OverlayComponent } from './overlay.component';

import { FloatingModule } from './../../modules/floating/floating.module';
import { ButtonModule } from './../../modules/button/button.module';

describe('OverlayComponent', () => {
    let component: OverlayComponent;
    let fixture: ComponentFixture<OverlayComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                OverlayComponent
            ],
            imports: [
                FloatingModule,
                ButtonModule
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
