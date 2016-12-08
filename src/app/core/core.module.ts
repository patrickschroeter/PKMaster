import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from './../shared/shared.module';

import * as services from './services';
import * as components from './components';

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

        services.FormApiMock
    ],
    exports: [
        components.AlertComponent
    ]
})
export class CoreModule { }
