/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { ProfileComponent } from './profile.component';

import { CoreProviderMock } from './../../core/core.module';
import { AlertProviderMock } from './../../modules/alert/alert.module';

import {
    SharedModule
} from './../../shared/shared.module';
import { DynamicFormModule } from './../../modules/dynamic-form/dynamic-form.module';
import { FloatingModule } from './../../modules/floating/floating.module';
import { ButtonModule } from './../../modules/button/button.module';
import { OverlayModule } from './../../modules/overlay/overlay.module';

describe('ProfileComponent', () => {
    let component: ProfileComponent;
    let fixture: ComponentFixture<ProfileComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ProfileComponent
            ],
            imports: [
                ReactiveFormsModule,
                RouterTestingModule.withRoutes([
                    { path: '', component: class { } },
                ]),
                SharedModule,
                DynamicFormModule,
                FloatingModule,
                ButtonModule,
                OverlayModule
            ],
            providers: [
                ...CoreProviderMock,
                ...AlertProviderMock
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProfileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
