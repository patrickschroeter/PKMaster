import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from './../shared/shared.module';

import * as services from './services';
import * as components from './components';

@NgModule({
    declarations: [
        components.NavbarComponent,
        components.NavbarAdminComponent
    ],
    imports: [
        RouterModule,

        SharedModule
    ],
    providers: [
        services.AuthenticationService,
        services.PermissionService,
        services.InputValidationService,
        services.FormService,
        services.AlertService
    ],
    exports: [
        components.NavbarComponent,
        components.NavbarAdminComponent
    ]
})
export class CoreModule { }
