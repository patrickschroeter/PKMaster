/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { RolesComponent } from './roles.component';

import {
    InputValidationService,
    InputValidationMock
} from './../../core';

import { AlertService, AlertMock } from './../../modules/alert';

import { SharedModule } from './../../shared/shared.module';
import { ListModule } from './../../modules/list/list.module';
import { FloatingModule } from './../../modules/floating/floating.module';
import { DynamicFormModule } from './../../modules/dynamic-form/dynamic-form.module';
import { ButtonModule } from './../../modules/button/button.module';
import { OverlayModule } from './../../modules/overlay/overlay.module';

describe('RolesComponent', () => {
    let component: RolesComponent;
    let fixture: ComponentFixture<RolesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                RolesComponent
            ],
            imports: [
                RouterTestingModule.withRoutes([
                    { path: '', component: class { } },
                ]),
                SharedModule,
                ListModule,
                FloatingModule,
                DynamicFormModule,
                ButtonModule,
                OverlayModule
            ],
            providers: [
                { provide: InputValidationService, useClass: InputValidationMock },
                { provide: AlertService, useClass: AlertMock }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RolesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
