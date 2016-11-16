/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ProfileEditComponent } from './profile-edit.component';
import { DynamicFormComponent, InputComponent, CheckboxComponent, SelectComponent, DeviderComponent, RadioComponent, DatalistComponent, TextareaComponent, ButtonComponent, OverlayComponent, FormValidationComponent } from './../../../shared';

describe('ProfileEditComponent', () => {
    let component: ProfileEditComponent;
    let fixture: ComponentFixture<ProfileEditComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ProfileEditComponent,
                DynamicFormComponent,
                InputComponent, CheckboxComponent, SelectComponent, DeviderComponent, RadioComponent, DatalistComponent, TextareaComponent, ButtonComponent, OverflowEvent, FormValidationComponent
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
