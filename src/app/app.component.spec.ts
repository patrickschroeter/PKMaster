/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';

import { AlertService, AlertMock, AlertComponent } from './modules/alert';

import { SharedModule } from './shared/shared.module';

describe('App: Pk', () => {
    let fixture: ComponentFixture<any>;
    let component: AppComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                AlertComponent
            ],
            providers: [
                { provide: AlertService, useClass: AlertMock }
            ],
            imports: [
                SharedModule,
                RouterTestingModule.withRoutes([
                    { path: '', component: class { } },
                ])
            ]
        });

        TestBed.compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
    });

    it('should create the app', async(() => {
        expect(component).toBeTruthy();
    }));

});
