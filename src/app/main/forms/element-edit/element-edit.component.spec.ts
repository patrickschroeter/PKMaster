/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { ElementEditComponent } from './element-edit.component';

import {
    FormElementService,
    FormElementMock,
    InputValidationService,
    InputValidationMock,
    AlertService,
    AlertMock
} from './../../../core';

import {
    SharedModule
} from './../../../shared/shared.module';

describe('ElementEditComponent', () => {
    let component: ElementEditComponent;
    let fixture: ComponentFixture<ElementEditComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ElementEditComponent
            ],
            imports: [
                SharedModule,
                RouterTestingModule.withRoutes([
                    { path: '', component: class { } },
                ])
            ],
            providers: [
                { provide: FormElementService, useClass: FormElementMock },
                { provide: InputValidationService, useClass: InputValidationMock },
                { provide: AlertService, useClass: AlertMock }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ElementEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
