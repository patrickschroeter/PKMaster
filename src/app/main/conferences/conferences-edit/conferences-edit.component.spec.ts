/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { ConferencesEditComponent } from './conferences-edit.component';

import {
    ConferenceService,
    ConferenceMock
} from './../../../core';

import { SharedModule } from './../../../shared/shared.module';
import { AlertModule } from './../../../modules/alert/alert.module';

describe('ConferencesEditComponent', () => {
    let component: ConferencesEditComponent;
    let fixture: ComponentFixture<ConferencesEditComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ConferencesEditComponent
            ],
            imports: [
                RouterTestingModule.withRoutes([{ path: '', component: class { } }]),
                SharedModule,
                AlertModule
            ],
            providers: [
                { provide: ConferenceService, useClass: ConferenceMock }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ConferencesEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
