/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { UsersEditComponent } from './users-edit.component';

import { CoreProviderMock } from 'app/core/core.module';
import { AlertProviderMock } from 'app/modules/alert/alert.module';

describe('UsersEditComponent', () => {
    let component: UsersEditComponent;
    let fixture: ComponentFixture<UsersEditComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                UsersEditComponent
            ],
            providers: [
                ...CoreProviderMock,
                ...AlertProviderMock
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
        fixture = TestBed.createComponent(UsersEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
