/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { ApplicationsComponent } from './applications.component';

import {
    InputValidationService,
    InputValidationMock,
    ApplicationService,
    ApplicationMock,
    FormService,
    FormMock,
    PermissionService,
    PermissionMock
} from './../../core';

import { AlertService, AlertMock } from './../../modules/alert';

import {
    SharedModule
} from './../../shared/shared.module';
import { ListModule } from './../../modules/list/list.module';
import { FloatingModule } from './../../modules/floating/floating.module';
import { ButtonModule } from './../../modules/button/button.module';
import { OverlayModule } from './../../modules/overlay/overlay.module';

describe('ApplicationsComponent', () => {
    let component: ApplicationsComponent;
    let fixture: ComponentFixture<ApplicationsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ApplicationsComponent
            ],
            imports: [
                SharedModule,
                RouterTestingModule.withRoutes([
                    { path: '', component: class { } },
                ]),
                ListModule,
                FloatingModule,
                ButtonModule,
                OverlayModule
            ],
            providers: [
                { provide: InputValidationService, useClass: InputValidationMock },
                { provide: AlertService, useClass: AlertMock },
                { provide: ApplicationService, useClass: ApplicationMock },
                { provide: FormService, useClass: FormMock },
                { provide: PermissionService, useClass: PermissionMock }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ApplicationsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
