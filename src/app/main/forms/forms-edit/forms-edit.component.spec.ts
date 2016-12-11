/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { FormsEditComponent } from './forms-edit.component';

import { ElementEditComponent } from './..';

import {
    FormService,
    FormMock,
    InputValidationService,
    InputValidationMock
} from './../../../core';

import { AlertService, AlertMock } from './../../../modules/alert';

import {
    SharedModule
} from './../../../shared/shared.module';
import { DynamicFormModule } from './../../../modules/dynamic-form/dynamic-form.module';
import { FloatingModule } from './../../../modules/floating/floating.module';
import { ButtonModule } from './../../../modules/button/button.module';
import { OverlayModule } from './../../../modules/overlay/overlay.module';

describe('FormsEditComponent', () => {
    let component: FormsEditComponent;
    let fixture: ComponentFixture<FormsEditComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                FormsEditComponent,

                ElementEditComponent
            ],
            imports: [
                SharedModule,
                RouterTestingModule.withRoutes([
                    { path: '', component: class { } },
                ]),
                DynamicFormModule,
                FloatingModule,
                ButtonModule,
                OverlayModule
            ],
            providers: [
                { provide: InputValidationService, useClass: InputValidationMock },
                { provide: FormService, useClass: FormMock },
                { provide: AlertService, useClass: AlertMock }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormsEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
