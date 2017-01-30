// tslint:disable:max-line-length
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs/Rx';

import { PermissionApiMock } from './PermissionApi.mock';
import { Role } from './../../../swagger';

@Injectable()
export class RoleApiMock {

    static ROLE = {
        All: [
            /** Permissions */
            PermissionApiMock.PERMISSION.Permission.Read,
            PermissionApiMock.PERMISSION.Permission.Edit,
            /** Roles */
            PermissionApiMock.PERMISSION.Roles.Read,
            PermissionApiMock.PERMISSION.Roles.Edit,
            /** Users */
            PermissionApiMock.PERMISSION.Users.Read,
            PermissionApiMock.PERMISSION.Users.Edit,
            /** Applications */
            PermissionApiMock.PERMISSION.Application.Create,
            PermissionApiMock.PERMISSION.Application.Read,
            PermissionApiMock.PERMISSION.Application.Edit,
            PermissionApiMock.PERMISSION.Application.Delete,
            PermissionApiMock.PERMISSION.Application.Comment,
            PermissionApiMock.PERMISSION.Application.Accept,
            /** Conference */
            PermissionApiMock.PERMISSION.Conference.Read,
            PermissionApiMock.PERMISSION.Conference.Edit,
            /** Forms */
            PermissionApiMock.PERMISSION.Forms.Read,
            PermissionApiMock.PERMISSION.Forms.Edit,
        ],
        Admin: [
            PermissionApiMock.PERMISSION.Permission.Read,
            PermissionApiMock.PERMISSION.Permission.Edit,
            PermissionApiMock.PERMISSION.Roles.Read,
            PermissionApiMock.PERMISSION.Roles.Edit,
            PermissionApiMock.PERMISSION.Users.Read,
            PermissionApiMock.PERMISSION.Users.Edit,
        ],
        Principal: [
            PermissionApiMock.PERMISSION.Application.Create,
            PermissionApiMock.PERMISSION.Application.Read,
            PermissionApiMock.PERMISSION.Application.Edit,
            PermissionApiMock.PERMISSION.Application.Delete,
            PermissionApiMock.PERMISSION.Application.Comment,
            PermissionApiMock.PERMISSION.Application.Accept,
            PermissionApiMock.PERMISSION.Conference.Read,
            PermissionApiMock.PERMISSION.Conference.Edit,
            PermissionApiMock.PERMISSION.Forms.Read,
            PermissionApiMock.PERMISSION.Forms.Edit,
        ],
        Member: [
            PermissionApiMock.PERMISSION.Application.Create,
            PermissionApiMock.PERMISSION.Application.Read,
            PermissionApiMock.PERMISSION.Application.Comment,
            PermissionApiMock.PERMISSION.Conference.Read,
            PermissionApiMock.PERMISSION.Forms.Read,
        ],
        Docent: [
            PermissionApiMock.PERMISSION.Application.Create,
            PermissionApiMock.PERMISSION.Conference.Read,
            PermissionApiMock.PERMISSION.Forms.Read,
        ],
        Student: [
            PermissionApiMock.PERMISSION.Application.Create,
            PermissionApiMock.PERMISSION.Forms.Read,
        ],

        Observer: [
            PermissionApiMock.PERMISSION.Application.Read,
        ],
        Secreteriat: [
            PermissionApiMock.PERMISSION.Application.Create,
            PermissionApiMock.PERMISSION.Application.Read,
            PermissionApiMock.PERMISSION.Application.Edit,
        ]
    };
}
