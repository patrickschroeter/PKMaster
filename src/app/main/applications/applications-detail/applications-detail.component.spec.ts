/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { ApplicationsDetailComponent } from './applications-detail.component';

import { CoreProviderMock } from './../../../core/core.module';
import { AlertProviderMock } from './../../../modules/alert/alert.module';

import { SharedModule } from './../../../shared/shared.module';
import { DynamicFormModule } from './../../../modules/dynamic-form/dynamic-form.module';
import { ListModule } from './../../../modules/list/list.module';
import { FloatingModule } from './../../../modules/floating/floating.module';
import { ButtonModule } from './../../../modules/button/button.module';
import { OverlayModule } from './../../../modules/overlay/overlay.module';
import { TranslationProviderMock } from './../../../modules/translation/translation.module';

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
                FloatingModule,
                ButtonModule,
                OverlayModule
            ],
            providers: [
                ...CoreProviderMock,
                ...AlertProviderMock,
                ...TranslationProviderMock
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
