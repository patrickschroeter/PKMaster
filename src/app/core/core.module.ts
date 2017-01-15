import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Http, XHRBackend, RequestOptions } from '@angular/http';

import { SharedModule } from './../shared/shared.module';

import * as services from './services';
import { ExtendHttpService } from './services/extend-http/extend-http.service';

import { FormApi } from './../swagger/api/FormApi';
import { ApplicationApi } from './../swagger/api/ApplicationApi';
import { UserApi } from './../swagger/api/UserApi';
import { ConferenceApi } from './../swagger/api/ConferenceApi';

const BASEPATH = 'http://pk.multimedia.hs-augsburg.de:8000';

@NgModule({
    declarations: [

    ],
    imports: [
        CommonModule,
        SharedModule
    ],
    providers: [
        services.AuthenticationService,
        services.InputValidationService,
        services.FormService,
        services.ApplicationService,
        services.PermissionService,
        services.ConferenceService,

        // AuthGuards

        services.AccessService,
        services.AccessReadApplications,
        services.AccessEditApplications,
        services.AccessReadForms,
        services.AccessEditForms,
        services.AccessEditConferences,
        services.AccessReadConferences,
        services.AccessAdmin,
        services.AccessEditRoles,
        services.AccessReadRoles,
        services.AccessEditPermissions,
        services.AccessReadPermissions,
        services.AccessEditUsers,
        services.AccessReadUsers,

        // Mock API
        // FormApi,
        // {
        //     provide: FormApi,
        //     useFactory: extendFormApi,
        //     deps: [Http]
        // },
        { provide: FormApi, useClass: services.FormEndpoint },
        // ApplicationApi,
        // {
        //     provide: ApplicationApi,
        //     useFactory: extendApplicationApi,
        //     deps: [Http]
        // },
        { provide: ApplicationApi, useClass: services.ApplicationEndpoint },
        { provide: UserApi, useClass: services.UserEndpoint },
        { provide: ConferenceApi, useClass: services.ConferenceEndpoint},

        // Extend HTTP
        {
            provide: Http,
            useFactory: extendHttp,
            deps: [XHRBackend, RequestOptions, services.AuthenticationService]
        }
    ],
    exports: [

    ]
})
export class CoreModule { }

/**
 * Factory Functions
 */
export function extendHttp(xhrBackend: XHRBackend, requestOptions: RequestOptions, authentication: services.AuthenticationService) {
    return new ExtendHttpService(xhrBackend, requestOptions, authentication);
}

export function extendFormApi(http) {
    return new FormApi(http, BASEPATH);
}

export function extendApplicationApi(http) {
    return new ApplicationApi(http, BASEPATH);
}
