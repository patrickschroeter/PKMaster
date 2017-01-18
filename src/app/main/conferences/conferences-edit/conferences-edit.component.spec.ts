/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { ConferencesEditComponent } from './conferences-edit.component';

import { CoreProviderMock } from './../../../core/core.module';
import { AlertProviderMock } from './../../../modules/alert/alert.module';

import { SharedModule } from './../../../shared/shared.module';
import { ButtonModule } from './../../../modules/button/button.module';
import { FloatingModule } from './../../../modules/floating/floating.module';

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
                ButtonModule,
                FloatingModule
            ],
            providers: [
                ...CoreProviderMock,
                ...AlertProviderMock
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
