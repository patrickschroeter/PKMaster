// tslint:disable:max-line-length
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs/Rx';

import { PermissionApiMock } from './PermissionApi.mock';
import { Role } from './../../../swagger';

@Injectable()
export class RoleApiMock {

    /** One Role String */
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

    /** One Role Object */
    static ROLES = {
        All: [
            /** Permissions */
            PermissionApiMock.PERMISSIONS.Permission.Read,
            PermissionApiMock.PERMISSIONS.Permission.Edit,
            /** Roles */
            PermissionApiMock.PERMISSIONS.Roles.Read,
            PermissionApiMock.PERMISSIONS.Roles.Edit,
            /** Users */
            PermissionApiMock.PERMISSIONS.Users.Read,
            PermissionApiMock.PERMISSIONS.Users.Edit,
            /** Applications */
            PermissionApiMock.PERMISSIONS.Application.Create,
            PermissionApiMock.PERMISSIONS.Application.Read,
            PermissionApiMock.PERMISSIONS.Application.Edit,
            PermissionApiMock.PERMISSIONS.Application.Delete,
            PermissionApiMock.PERMISSIONS.Application.Comment,
            PermissionApiMock.PERMISSIONS.Application.Accept,
            /** Conference */
            PermissionApiMock.PERMISSIONS.Conference.Read,
            PermissionApiMock.PERMISSIONS.Conference.Edit,
            /** Forms */
            PermissionApiMock.PERMISSIONS.Forms.Read,
            PermissionApiMock.PERMISSIONS.Forms.Edit,
        ],
        Admin: [
            PermissionApiMock.PERMISSIONS.Permission.Read,
            PermissionApiMock.PERMISSIONS.Permission.Edit,
            PermissionApiMock.PERMISSIONS.Roles.Read,
            PermissionApiMock.PERMISSIONS.Roles.Edit,
            PermissionApiMock.PERMISSIONS.Users.Read,
            PermissionApiMock.PERMISSIONS.Users.Edit,
        ],
        Principal: [
            PermissionApiMock.PERMISSIONS.Application.Create,
            PermissionApiMock.PERMISSIONS.Application.Read,
            PermissionApiMock.PERMISSIONS.Application.Edit,
            PermissionApiMock.PERMISSIONS.Application.Delete,
            PermissionApiMock.PERMISSIONS.Application.Comment,
            PermissionApiMock.PERMISSIONS.Application.Accept,
            PermissionApiMock.PERMISSIONS.Conference.Read,
            PermissionApiMock.PERMISSIONS.Conference.Edit,
            PermissionApiMock.PERMISSIONS.Forms.Read,
            PermissionApiMock.PERMISSIONS.Forms.Edit,
        ],
        Member: [
            PermissionApiMock.PERMISSIONS.Application.Create,
            PermissionApiMock.PERMISSIONS.Application.Read,
            PermissionApiMock.PERMISSIONS.Application.Comment,
            PermissionApiMock.PERMISSIONS.Conference.Read,
            PermissionApiMock.PERMISSIONS.Forms.Read,
        ],
        Docent: [
            PermissionApiMock.PERMISSIONS.Application.Create,
            PermissionApiMock.PERMISSIONS.Conference.Read,
            PermissionApiMock.PERMISSIONS.Forms.Read,
        ],
        Student: [
            PermissionApiMock.PERMISSIONS.Application.Create,
            PermissionApiMock.PERMISSIONS.Forms.Read,
        ],

        Observer: [
            PermissionApiMock.PERMISSIONS.Application.Read,
        ],
        Secreteriat: [
            PermissionApiMock.PERMISSIONS.Application.Create,
            PermissionApiMock.PERMISSIONS.Application.Read,
            PermissionApiMock.PERMISSIONS.Application.Edit,
        ]
    };
}
