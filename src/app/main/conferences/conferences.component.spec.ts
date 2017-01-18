/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { ConferencesComponent } from './conferences.component';

import { AlertService, AlertMock } from './../../modules/alert';
import { DynamicFormModule } from './../../modules/dynamic-form/dynamic-form.module';


import {
    ConferenceService,
    ConferenceMock,

    InputValidationService,
    InputValidationMock
} from './../../core';

import {
    SharedModule
} from './../../shared/shared.module';

import { FloatingModule } from './../../modules/floating/floating.module';
import { ListModule } from './../../modules/list/list.module';
import { ButtonModule } from './../../modules/button/button.module';
import { OverlayModule } from './../../modules/overlay/overlay.module';

describe('ConferencesComponent', () => {
    let component: ConferencesComponent;
    let fixture: ComponentFixture<ConferencesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ConferencesComponent
            ],
            imports: [
                ListModule,
                FloatingModule,
                ButtonModule,
                SharedModule,
                RouterTestingModule.withRoutes([
                    { path: '', component: class { } },
                ]),
                OverlayModule,
                DynamicFormModule,
            ],
            providers: [
                { provide: ConferenceService, useClass: ConferenceMock },
                { provide: InputValidationService, useClass: InputValidationMock },
                { provide: AlertService, useClass: AlertMock },
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
