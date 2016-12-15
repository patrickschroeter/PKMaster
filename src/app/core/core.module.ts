import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Http, XHRBackend, RequestOptions } from '@angular/http';

import { SharedModule } from './../shared/shared.module';

import * as services from './services';

import { FormApi } from './../swagger/api/FormApi';
import { ApplicationApi } from './../swagger/api/ApplicationApi';
import { UserApi } from './../swagger/api/UserApi';

@NgModule({
    declarations: [

    ],
    imports: [
        CommonModule,
        SharedModule
    ],
    providers: [
        services.AuthenticationService,
        services.AccessService,
        services.InputValidationService,
        services.FormService,
        services.ApplicationService,

        { provide: FormApi, useClass: services.FormEndpoint },
        { provide: ApplicationApi, useClass: services.ApplicationEndpoint },
        { provide: UserApi, useClass: services.UserEndpoint },
        {
            provide: Http,
            useFactory: (xhrBackend: XHRBackend, requestOptions: RequestOptions, authentication: services.AuthenticationService) =>
               new services.ExtendHttpService(xhrBackend, requestOptions, authentication),
            deps: [XHRBackend, RequestOptions, services.AuthenticationService]
        }
    ],
    exports: [

    ]
})
export class CoreModule { }
