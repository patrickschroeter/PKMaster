/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { ProfileEditComponent } from './profile-edit.component';

import {
    InputValidationService,
    InputValidationMock
} from './../../../core';

import {
    SharedModule
} from './../../../shared/shared.module';

describe('ProfileEditComponent', () => {
    let component: ProfileEditComponent;
    let fixture: ComponentFixture<ProfileEditComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ProfileEditComponent
            ],
            imports: [
                SharedModule,
                RouterTestingModule.withRoutes([
                    { path: '', component: class { } },
                ])
            ],
            providers: [
                { provide: InputValidationService, useClass: InputValidationMock }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProfileEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
