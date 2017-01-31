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
import { RoleApi } from './../swagger/api/RoleApi';
import {
    FormEndpoint,
    ApplicationEndpoint,
    UserEndpoint,
    ConferenceEndpoint,
    RoleEndpoint,
    PermissionEndpoint
} from './services/api';

const BASEPATH = 'http://pk.multimedia.hs-augsburg.de:8000';
const API = false;

@NgModule({
    declarations: [

    ],
    imports: [
        CommonModule,
        SharedModule
    ],
    providers: [
        services.AuthenticationService,
        services.FormService,
        services.ApplicationService,
        services.PermissionService,
        services.ConferenceService,
        services.RoleService,

        // AuthGuards

        services.AccessMain,
        services.AccessApplications,
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

        { provide: UserApi, useClass: UserEndpoint },
        // TODO: fix cycling provider error
        // {
        //     provide: UserApi,
        //     useFactory: extendUserApi,
        //     deps: [Http]
        // },

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

        PermissionEndpoint,
        // TODO: wait for permission api
        // {
        //     provide: PermissionEndpoint,
        //     useFactory: extendPermissionApi,
        //     deps: [Http]
        // },

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

/** Export all Providers with mock */
export const CoreProviderMock = [
    { provide: services.AuthenticationService, useClass: services.AuthenticationMock },
    { provide: services.FormService, useClass: services.FormMock },
    { provide: services.ApplicationService, useClass: services.ApplicationMock },
    { provide: services.PermissionService, useClass: services.PermissionMock },
    { provide: services.ConferenceService, useClass: services.ConferenceMock },
    { provide: services.FormElementService, useClass: services.FormElementMock },
    { provide: services.RoleService, useClass: services.RoleMock },

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
export function extendHttp(xhrBackend: XHRBackend, requestOptions: RequestOptions, authentication: services.AuthenticationService) {
    return new ExtendHttpService(xhrBackend, requestOptions, authentication);
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

export function extendUserApi(http: Http) {
    return API ? new UserApi(http, BASEPATH) : new UserEndpoint();
}

export function extendRoleApi(http: Http, permissionApi: PermissionEndpoint) {
    return API ? new RoleApi(http, BASEPATH) : new RoleEndpoint(permissionApi);
}

export function extendPermissionApi(http: Http) {
    // TODO: wait for permission api
    // return API ? new PermissionApi(http, BASEPATH) : new PermissionEndpoint();
}
