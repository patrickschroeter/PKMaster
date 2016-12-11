/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { FormsComponent } from './forms.component';

import {
    FormService,
    FormMock,
    InputValidationService,
    InputValidationMock,
} from './../../core';

import { AlertService, AlertMock } from './../../modules/alert';

import { SharedModule } from './../../shared/shared.module';
import { ListModule } from './../../modules/list/list.module';
import { FloatingModule } from './../../modules/floating/floating.module';
import { DynamicFormModule } from './../../modules/dynamic-form/dynamic-form.module';

describe('FormsComponent', () => {
    let component: FormsComponent;
    let fixture: ComponentFixture<FormsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                FormsComponent
            ],
            imports: [
                SharedModule,
                RouterTestingModule.withRoutes([
                    { path: '', component: class { } },
                ]),
                ListModule,
                FloatingModule,
                DynamicFormModule
            ],
            providers: [
                { provide: FormService, useClass: FormMock },
                { provide: InputValidationService, useClass: InputValidationMock },
                { provide: AlertService, useClass: AlertMock }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
