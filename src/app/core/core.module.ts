import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';

import * as services from './services';

@NgModule({
    declarations: [],
    imports: [
        SharedModule
    ],
    providers: [
        services.AuthenticationService,
        services.PermissionService,
        services.InputValidationService,
        services.FormService,
        services.AlertService
    ],
    exports: []
})
export class CoreModule { }
