/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { UsersDetailComponent } from './users-detail.component';

/** Provider */
import { CoreProviderMock } from './../../../core/core.module';
import { ModalProviderMock } from './../../../modules/overlay/overlay.module';
import { TranslationProviderMock } from './../../../modules/translation/translation.module';

describe('UsersDetailComponent', () => {
    let component: UsersDetailComponent;
    let fixture: ComponentFixture<UsersDetailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                UsersDetailComponent
                ],
            providers: [
                ...CoreProviderMock,
                ...ModalProviderMock,
                ...TranslationProviderMock
            ],
            imports: [
                RouterTestingModule.withRoutes([
                    { path: '', component: class { } },
                ])
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UsersDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
