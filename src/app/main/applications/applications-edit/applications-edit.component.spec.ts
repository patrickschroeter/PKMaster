/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { ApplicationsEditComponent } from './applications-edit.component';

import {
    ApplicationService,
    ApplicationMock,
    InputValidationService,
    InputValidationMock
} from './../../../core';

import { AlertService, AlertMock } from './../../../modules/alert';

import { SharedModule } from './../../../shared/shared.module';
import { DynamicFormModule } from './../../../modules/dynamic-form/dynamic-form.module';
import { FloatingModule } from './../../../modules/floating/floating.module';
import { ButtonModule } from './../../../modules/button/button.module';

describe('ApplicationsEditComponent', () => {
    let component: ApplicationsEditComponent;
    let fixture: ComponentFixture<ApplicationsEditComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ApplicationsEditComponent
            ],
            imports: [
                SharedModule,
                RouterTestingModule.withRoutes([
                    { path: '', component: class { } },
                ]),
                DynamicFormModule,
                FloatingModule,
                ButtonModule
            ],
            providers: [
                { provide: ApplicationService, useClass: ApplicationMock },
                { provide: AlertService, useClass: AlertMock },
                { provide: InputValidationService, useClass: InputValidationMock }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ApplicationsEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
