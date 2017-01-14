/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { ConferencesDetailComponent } from './conferences-detail.component';

import {
    ConferenceService,
    ConferenceMock
} from './../../../core';

import { SharedModule } from './../../../shared/shared.module';
import { OverlayModule } from './../../../modules/overlay/overlay.module';
import { ListModule } from './../../../modules/list/list.module';

describe('ConferencesDetailComponent', () => {
    let component: ConferencesDetailComponent;
    let fixture: ComponentFixture<ConferencesDetailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ConferencesDetailComponent],
            imports: [
                SharedModule,
                OverlayModule,
                ListModule,
                RouterTestingModule.withRoutes([
                    { path: '', component: class { } },
                ]),
            ],
            providers: [
                { provide: ConferenceService, useClass: ConferenceMock }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ConferencesDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
