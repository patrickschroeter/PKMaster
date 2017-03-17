// tslint:disable:max-line-length
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs/Rx';

import { PermissionApiMock } from './PermissionApi.mock';
import { RoleDto } from './../../../swagger';

@Injectable()
export class RoleApiMock {

    /** One Role String */
    static ROLE = {
        All: [
            /** Permissions */
            // PermissionApiMock.PERMISSION.Permission.Read,
            // PermissionApiMock.PERMISSION.Permission.Edit, // requires Permission.Read
            /** Roles */
            // PermissionApiMock.PERMISSION.Roles.Read,
            // PermissionApiMock.PERMISSION.Roles.Edit,
            /** Users */
            // PermissionApiMock.PERMISSION.Users.Read,
            // PermissionApiMock.PERMISSION.Users.Edit,
            /** Applications */
            PermissionApiMock.PERMISSION.Application.Create,
            // PermissionApiMock.PERMISSION.Application.Read,
            // PermissionApiMock.PERMISSION.Application.Edit,
            // PermissionApiMock.PERMISSION.Application.Deactivate,
            // PermissionApiMock.PERMISSION.Application.Comment,
            // PermissionApiMock.PERMISSION.Application.Accept,
            // PermissionApiMock.PERMISSION.Application.Submit,
            // PermissionApiMock.PERMISSION.Application.Validate,
            /** Conference */
            // PermissionApiMock.PERMISSION.Conference.Read,
            // PermissionApiMock.PERMISSION.Conference.Edit,
            /** Forms */
            // PermissionApiMock.PERMISSION.Forms.Read,
            // PermissionApiMock.PERMISSION.Forms.Edit
        ],
        Admin: [
            PermissionApiMock.PERMISSION.Permission.Read,
            PermissionApiMock.PERMISSION.Permission.Edit,
            PermissionApiMock.PERMISSION.Roles.Read,
            PermissionApiMock.PERMISSION.Roles.Edit,
            PermissionApiMock.PERMISSION.Users.Read,
            PermissionApiMock.PERMISSION.Users.Edit
        ],
        Principal: [
            PermissionApiMock.PERMISSION.Application.Create,
            PermissionApiMock.PERMISSION.Application.Read,
            PermissionApiMock.PERMISSION.Application.Edit,
            PermissionApiMock.PERMISSION.Application.Deactivate,
            PermissionApiMock.PERMISSION.Application.Comment,
            PermissionApiMock.PERMISSION.Application.Accept,
            PermissionApiMock.PERMISSION.Application.Validate,
            PermissionApiMock.PERMISSION.Application.Submit,
            PermissionApiMock.PERMISSION.Conference.Read,
            PermissionApiMock.PERMISSION.Conference.Edit,
            PermissionApiMock.PERMISSION.Forms.Read,
            PermissionApiMock.PERMISSION.Forms.Edit
        ],
        Member: [
            PermissionApiMock.PERMISSION.Application.Create,
            PermissionApiMock.PERMISSION.Application.Read,
            PermissionApiMock.PERMISSION.Application.Comment,
            PermissionApiMock.PERMISSION.Application.Validate,
            PermissionApiMock.PERMISSION.Conference.Read
        ],
        Docent: [
            PermissionApiMock.PERMISSION.Application.Create
        ],
        Student: [
            PermissionApiMock.PERMISSION.Application.Create
        ],

        Observer: [
            PermissionApiMock.PERMISSION.Application.Read
        ],
        Secreteriat: [
            PermissionApiMock.PERMISSION.Application.Create,
            PermissionApiMock.PERMISSION.Application.Read,
            PermissionApiMock.PERMISSION.Application.Edit
        ]
    };

    /** One Role Object */
    static ROLES_OBJECTS = {
        All: {
            id: '1',
            name: 'All',
            rolePermissions: [
                /** Permissions */
                PermissionApiMock.PERMISSION_OBJECT.Permission.Read,
                PermissionApiMock.PERMISSION_OBJECT.Permission.Edit,
                /** Roles */
                PermissionApiMock.PERMISSION_OBJECT.Roles.Read,
                PermissionApiMock.PERMISSION_OBJECT.Roles.Edit,
                /** Users */
                PermissionApiMock.PERMISSION_OBJECT.Users.Read,
                PermissionApiMock.PERMISSION_OBJECT.Users.Edit,
                /** Applications */
                PermissionApiMock.PERMISSION_OBJECT.Application.Create,
                PermissionApiMock.PERMISSION_OBJECT.Application.Read,
                PermissionApiMock.PERMISSION_OBJECT.Application.Edit,
                PermissionApiMock.PERMISSION_OBJECT.Application.Deactivate,
                PermissionApiMock.PERMISSION_OBJECT.Application.Comment,
                PermissionApiMock.PERMISSION_OBJECT.Application.Accept,
                /** Conference */
                PermissionApiMock.PERMISSION_OBJECT.Conference.Read,
                PermissionApiMock.PERMISSION_OBJECT.Conference.Edit,
                /** Forms */
                PermissionApiMock.PERMISSION_OBJECT.Forms.Read,
                PermissionApiMock.PERMISSION_OBJECT.Forms.Edit,
            ]
        },
        Admin: {
            id: '2',
            name: 'Admin',
            rolePermissions: [
                PermissionApiMock.PERMISSION_OBJECT.Permission.Read,
                PermissionApiMock.PERMISSION_OBJECT.Permission.Edit,
                PermissionApiMock.PERMISSION_OBJECT.Roles.Read,
                PermissionApiMock.PERMISSION_OBJECT.Roles.Edit,
                PermissionApiMock.PERMISSION_OBJECT.Users.Read,
                PermissionApiMock.PERMISSION_OBJECT.Users.Edit,
            ]
        },
        Principal: {
            id: '3',
            name: 'Principal',
            rolePermissions: [
                PermissionApiMock.PERMISSION_OBJECT.Application.Create,
                PermissionApiMock.PERMISSION_OBJECT.Application.Read,
                PermissionApiMock.PERMISSION_OBJECT.Application.Edit,
                PermissionApiMock.PERMISSION_OBJECT.Application.Deactivate,
                PermissionApiMock.PERMISSION_OBJECT.Application.Comment,
                PermissionApiMock.PERMISSION_OBJECT.Application.Accept,
                PermissionApiMock.PERMISSION_OBJECT.Conference.Read,
                PermissionApiMock.PERMISSION_OBJECT.Conference.Edit,
                PermissionApiMock.PERMISSION_OBJECT.Forms.Read,
                PermissionApiMock.PERMISSION_OBJECT.Forms.Edit,
            ]
        },
        Member: {
            id: '4',
            name: 'Member',
            rolePermissions: [
                PermissionApiMock.PERMISSION_OBJECT.Application.Create,
                PermissionApiMock.PERMISSION_OBJECT.Application.Read,
                PermissionApiMock.PERMISSION_OBJECT.Application.Comment,
                PermissionApiMock.PERMISSION_OBJECT.Conference.Read,
                PermissionApiMock.PERMISSION_OBJECT.Forms.Read,
            ]
        },
        Docent: {
            id: '5',
            name: 'Docent',
            rolePermissions: [
                PermissionApiMock.PERMISSION_OBJECT.Application.Create,
                PermissionApiMock.PERMISSION_OBJECT.Conference.Read,
                PermissionApiMock.PERMISSION_OBJECT.Forms.Read,
            ]
        },
        Student: {
            id: '6',
            name: 'Student',
            rolePermissions: [
                PermissionApiMock.PERMISSION_OBJECT.Application.Create,
                PermissionApiMock.PERMISSION_OBJECT.Forms.Read,
            ]
        },

        Observer: {
            id: '7',
            name: 'Observer',
            rolePermissions: [
                PermissionApiMock.PERMISSION_OBJECT.Application.Read,
            ]
        },
        Secreteriat: {
            id: '8',
            name: 'Secreteriat',
            rolePermissions: [
                PermissionApiMock.PERMISSION_OBJECT.Application.Create,
                PermissionApiMock.PERMISSION_OBJECT.Application.Read,
                PermissionApiMock.PERMISSION_OBJECT.Application.Edit,
            ]
        }
    };
}
