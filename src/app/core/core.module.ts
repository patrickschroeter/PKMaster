import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Http, XHRBackend, RequestOptions, HttpModule } from '@angular/http';
import { Router } from '@angular/router';

import { environment } from 'app/../environments/environment';

import { SharedModule } from 'app/shared/shared.module';

import * as services from './services';
import { ExtendHttpService } from './services/extend-http/extend-http.service';

import { FormApi } from 'app/swagger/api/FormApi';
import { ApplicationApi } from 'app/swagger/api/ApplicationApi';
import { UserApi } from 'app/swagger/api/UserApi';
import { ConferenceApi } from 'app/swagger/api/ConferenceApi';
import { RoleApi } from 'app/swagger/api/RoleApi';
import { ConfigurationApi } from 'app/swagger/api/ConfigurationApi';
import {
    PermissionEndpoint,
    FormEndpoint,
    ApplicationEndpoint,
    UserEndpoint,
    ConferenceEndpoint,
    RoleEndpoint,
} from './services/api';

const BASEPATH = 'http://pk.multimedia.hs-augsburg.de:8000';
const API = !!environment.api;

@NgModule({
    declarations: [

    ],
    imports: [
        CommonModule,
        SharedModule,
        HttpModule
    ],
    providers: [
        services.AuthenticationService,
        services.FormService,
        services.ApplicationService,
        services.PermissionService,
        services.ConferenceService,
        services.RoleService,
        services.UserService,
        services.ConfigurationService,

        // AuthGuards

        services.AccessMain,
        services.AccessApplications,
        services.AccessApplicationsDetail,
        services.AccessApplicationsEdit,
        services.AccessConferencesDetail,
        services.AccessConferencesEdit,
        services.AccessForms,
        services.AccessFormsEdit,
        services.AccessAdmin,
        services.AccessPermissions,
        services.AccessRoles,
        services.AccessRolesEdit,
        services.AccessUsers,
        services.AccessUsersDetail,
        services.AccessUsersEdit,

        // Mock API
        {
            provide: FormApi,
            useFactory: extendFormApi,
            deps: [Http]
        },
        {
            provide: ApplicationApi,
            useFactory: extendApplicationApi,
            deps: [Http, FormApi, ConferenceApi, UserApi]
        },
        {
            provide: UserApi,
            useFactory: extendUserApi,
            deps: [Http, RoleApi]
        },
        {
            provide: ConferenceApi,
            useFactory: extendConferenceApi,
            deps: [Http]
        },
        {
            provide: RoleApi,
            useFactory: extendRoleApi,
            deps: [Http, PermissionEndpoint]
        },
        {
            provide: ConfigurationApi,
            useFactory: extendConfigurationApi,
            deps: [Http]
        },

        // TODO: wait for permission api
        {
            provide: PermissionEndpoint,
            useFactory: extendPermissionApi,
            deps: [Http]
        },

        // Extend HTTP
        {
            provide: Http,
            useFactory: extendHttp,
            deps: [XHRBackend, RequestOptions, Router]
        }
    ],
    exports: [

    ]
})
export class CoreModule { }

/** Export all Providers with mock */
export const CoreProviderMock = [
    { provide: services.ConfigurationService, useClass: services.ConfigurationMock },
    { provide: services.AuthenticationService, useClass: services.AuthenticationMock },
    { provide: services.FormService, useClass: services.FormMock },
    { provide: services.ApplicationService, useClass: services.ApplicationMock },
    { provide: services.PermissionService, useClass: services.PermissionMock },
    { provide: services.ConferenceService, useClass: services.ConferenceMock },
    { provide: services.FormElementService, useClass: services.FormElementMock },
    { provide: services.RoleService, useClass: services.RoleMock },
    { provide: services.UserService, useClass: services.UserMock },

    { provide: FormApi, useClass: services.FormApiMock },
    { provide: ApplicationApi, useClass: services.ApplicationApiMock },
    { provide: UserApi, useClass: services.UserApiMock },
    { provide: ConferenceApi, useClass: services.ConferenceApiMock },
    { provide: RoleApi, useClass: services.RoleApiMock },
    // TODO: wait for permission api
    { provide: PermissionEndpoint, useClass: services.PermissionApiMock }
];

/**
 * Factory Functions
 */
export function extendHttp(xhrBackend: XHRBackend, requestOptions: RequestOptions, router: Router) {
    return new ExtendHttpService(xhrBackend, requestOptions, router);
}

/**
 *  Add Http Basepath
 */
export function extendFormApi(http: Http) {
    return API ? new FormApi(http, BASEPATH) : new FormEndpoint();
}

export function extendApplicationApi(http: Http, formApi: FormApi, conferenceApi: ConferenceApi, userApi: UserApi) {
    return API ? new ApplicationApi(http, BASEPATH) : new ApplicationEndpoint(formApi, conferenceApi, userApi);
}

export function extendConferenceApi(http: Http) {
    return API ? new ConferenceApi(http, BASEPATH) : new ConferenceEndpoint();
}

export function extendUserApi(http: Http, roleApi: RoleApi) {
    return API ? new UserApi(http, BASEPATH) : new UserEndpoint(roleApi);
}

export function extendRoleApi(http: Http, permissionApi: PermissionEndpoint) {
    return API ? new RoleApi(http, BASEPATH) : new RoleEndpoint(permissionApi);
}
export function extendConfigurationApi(http: Http) {
    return new ConfigurationApi(http, BASEPATH);
}

export function extendPermissionApi(http: Http) {
    return new PermissionEndpoint();
    // TODO: wait for permission api
    // return API ? new PermissionApi(http, BASEPATH) : new PermissionEndpoint();
}
