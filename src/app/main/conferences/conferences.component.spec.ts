/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { ConferencesComponent } from './conferences.component';

import {
    InputValidationService,
    InputValidationMock
} from './../../core';

import { AlertService, AlertMock } from './../../modules/alert';

import {
    SharedModule
} from './../../shared/shared.module';
import { DynamicFormModule } from './../../modules/dynamic-form/dynamic-form.module';
import { FloatingModule } from './../../modules/floating/floating.module';

describe('ConferencesComponent', () => {
    let component: ConferencesComponent;
    let fixture: ComponentFixture<ConferencesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ConferencesComponent
            ],
            imports: [
                SharedModule,
                RouterTestingModule.withRoutes([
                    { path: '', component: class { } },
                ]),
                DynamicFormModule,
                FloatingModule
            ],
            providers: [
                { provide: InputValidationService, useClass: InputValidationMock },
                { provide: AlertService, useClass: AlertMock }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ConferencesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
