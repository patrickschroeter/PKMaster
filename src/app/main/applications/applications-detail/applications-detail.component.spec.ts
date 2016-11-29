/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { ApplicationsDetailComponent } from './applications-detail.component';

import {
    ApplicationService,
    ApplicationMock,
    AlertService,
    AlertMock
} from './../../../core';

import { SharedModule } from './../../../shared/shared.module';
import { DynamicFormModule } from './../../../modules/dynamic-form/dynamic-form.module';
import { ListModule } from './../../../modules/list/list.module';
import { FloatingModule } from './../../../modules/floating/floating.module';

describe('ApplicationsDetailComponent', () => {
    let component: ApplicationsDetailComponent;
    let fixture: ComponentFixture<ApplicationsDetailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ApplicationsDetailComponent
            ],
            imports: [
                SharedModule,
                RouterTestingModule.withRoutes([
                    { path: '', component: class { } },
                ]),
                DynamicFormModule,
                ListModule,
                FloatingModule
            ],
            providers: [
                { provide: ApplicationService, useClass: ApplicationMock },
                { provide: AlertService, useClass: AlertMock }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ApplicationsDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
