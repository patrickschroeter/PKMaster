/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

/** Components */
import { ApplicationsEditComponent } from './applications-edit.component';

/** Services */
import { CoreProviderMock } from './../../../core/core.module';
import { AlertProviderMock } from './../../../modules/alert/alert.module';
import { TranslationProviderMock } from './../../../modules/translation/translation.module';
import { ModalProviderMock } from './../../../modules/overlay/overlay.module';
import { StatusPipe } from './../../../shared';

describe('ApplicationsEditComponent', () => {
    let component: ApplicationsEditComponent;
    let fixture: ComponentFixture<ApplicationsEditComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ApplicationsEditComponent,
                StatusPipe
            ],
            imports: [
                RouterTestingModule.withRoutes([
                    { path: '', component: class { } },
                ])
            ],
            providers: [
                ...CoreProviderMock,
                ...AlertProviderMock,
                ...TranslationProviderMock,
                ...ModalProviderMock
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ApplicationsEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
