/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { ApplicationsEditComponent } from './applications-edit.component';

import {
    ApplicationService,
    ApplicationMock,
    AlertService,
    AlertMock
} from './../../../core';

import { SharedModule } from './../../../shared/shared.module';

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
                ])
            ],
            providers: [
                { provide: ApplicationService, useClass: ApplicationMock },
                { provide: AlertService, useClass: AlertMock }
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
