/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { ButtonConferenceCloneComponent } from './button-conference-clone.component';

import { CoreProviderMock } from './../../../../core/core.module';

describe('ButtonConferenceCloneComponent', () => {
    let component: ButtonConferenceCloneComponent;
    let fixture: ComponentFixture<ButtonConferenceCloneComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ButtonConferenceCloneComponent],
            imports: [
                RouterTestingModule.withRoutes([
                    { path: '', component: class { } },
                ])
            ],
            providers: [
                ...CoreProviderMock
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ButtonConferenceCloneComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
