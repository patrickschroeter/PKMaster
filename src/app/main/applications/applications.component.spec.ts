/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { ApplicationsComponent } from './applications.component';

import {
    InputValidationService,
    InputValidationMock,
    AlertService,
    AlertMock,
    ApplicationService,
    ApplicationMock,
    FormService,
    FormMock
} from './../../core';

import {
    SharedModule
} from './../../shared/shared.module';
import { ListModule } from './../../modules/list/list.module';
import { FloatingModule } from './../../modules/floating/floating.module';

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
                FloatingModule
            ],
            providers: [
                { provide: InputValidationService, useClass: InputValidationMock },
                { provide: AlertService, useClass: AlertMock },
                { provide: ApplicationService, useClass: ApplicationMock },
                { provide: FormService, useClass: FormMock },
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
