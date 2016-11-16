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
    AlertService,
    AlertMock
} from './../../../core';

import {
    SharedModule
} from './../../../shared/shared.module';

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
                ])
            ],
            providers: [
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
