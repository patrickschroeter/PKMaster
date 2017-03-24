/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { RolesComponent } from './roles.component';

import { CoreProviderMock } from 'app/core/core.module';
import { AlertProviderMock } from 'app/modules/alert/alert.module';
import { TranslationProviderMock } from 'app/modules/translation/translation.module';

describe('RolesComponent', () => {
    let component: RolesComponent;
    let fixture: ComponentFixture<RolesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                RolesComponent
            ],
            imports: [
                RouterTestingModule.withRoutes([
                    { path: '', component: class { } },
                ])
            ],
            providers: [
                ...CoreProviderMock,
                ...AlertProviderMock,
                ...TranslationProviderMock
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RolesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
