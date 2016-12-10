import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from './../shared/shared.module';

import * as services from './services';
import * as components from './components';

import { FormApi } from './../swagger/api/FormApi';
import { ApplicationApi } from './../swagger/api/ApplicationApi';

@NgModule({
    declarations: [
        components.AlertComponent
    ],
    imports: [
        CommonModule,
        SharedModule
    ],
    providers: [
        services.AuthenticationService,
        services.PermissionService,
        services.InputValidationService,
        services.FormService,
        services.AlertService,
        services.ApplicationService,

        { provide: FormApi, useClass: services.FormApiMock },
        { provide: ApplicationApi, useClass: services.ApplicationApiMock }
    ],
    exports: [
        components.AlertComponent
    ]
})
export class CoreModule { }
