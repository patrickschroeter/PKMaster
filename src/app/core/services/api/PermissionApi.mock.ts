// tslint:disable:max-line-length
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs/Rx';


import { Permission } from './../../../swagger';

@Injectable()
export class PermissionApiMock {

    /** One Permission String */
    static PERMISSION = {
        Permission: {
            Read: 'ReadPermissions',
            Edit: 'EditPermissions'
        },
        Roles: {
            Read: 'ReadRoles',
            Edit: 'EditRoles'
        },
        Users: {
            Read: 'ReadUsers',
            Edit: 'EditUsers'
        },
        Application: {
            Create: 'CreateApplications',
            Read: 'ReadApplications',
            Edit: 'EditApplications',
            Comment: 'CommentApplications',
            Delete: 'DeleteApplications',
            Accept: 'AcceptApplications'
        },
        Conference: {
            Read: 'ReadConferences',
            Edit: 'EditConferences'
        },
        Forms: {
            Read: 'ReadForms',
            Edit: 'EditForms'
        }
    };

    /** One Permission Object */
    static PERMISSION_OBJECT = {
        Permission: {
            Read: {
                id: '1',
                name: PermissionApiMock.PERMISSION.Permission.Read,
                description: 'Allows the user to read the permissions'
            },
            Edit: {
                id: '2',
                name: PermissionApiMock.PERMISSION.Permission.Edit
            },
        },
        Roles: {
            Read: {
                id: '3',
                name: PermissionApiMock.PERMISSION.Roles.Read
            },
            Edit: {
                id: '4',
                name: PermissionApiMock.PERMISSION.Roles.Edit
            },
        },
        Users: {
            Read: {
                id: '5',
                name: PermissionApiMock.PERMISSION.Users.Read
            },
            Edit: {
                id: '6',
                name: PermissionApiMock.PERMISSION.Users.Edit
            },
        },
        Application: {
            Create: {
                id: '7',
                name: PermissionApiMock.PERMISSION.Application.Create
            },
            Read: {
                id: '8',
                name: PermissionApiMock.PERMISSION.Application.Read
            },
            Edit: {
                id: '9',
                name: PermissionApiMock.PERMISSION.Application.Edit
            },
            Comment: {
                id: '10',
                name: PermissionApiMock.PERMISSION.Application.Comment
            },
            Delete: {
                id: '11',
                name: PermissionApiMock.PERMISSION.Application.Delete
            },
            Accept: {
                id: '12',
                name: PermissionApiMock.PERMISSION.Application.Accept
            },
        },
        Conference: {
            Read: {
                id: '13',
                name: PermissionApiMock.PERMISSION.Conference.Read
            },
            Edit: {
                id: '14',
                name: PermissionApiMock.PERMISSION.Conference.Edit
            },
        },
        Forms: {
            Read: {
                id: '15',
                name: PermissionApiMock.PERMISSION.Forms.Read
            },
            Edit: {
                id: '16',
                name: PermissionApiMock.PERMISSION.Forms.Edit
            },
        }
    };

    static PERMISSIONS = [
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
        PermissionApiMock.PERMISSION_OBJECT.Application.Delete,
        PermissionApiMock.PERMISSION_OBJECT.Application.Comment,
        PermissionApiMock.PERMISSION_OBJECT.Application.Accept,
        /** Conference */
        PermissionApiMock.PERMISSION_OBJECT.Conference.Read,
        PermissionApiMock.PERMISSION_OBJECT.Conference.Edit,
        /** Forms */
        PermissionApiMock.PERMISSION_OBJECT.Forms.Read,
        PermissionApiMock.PERMISSION_OBJECT.Forms.Edit
    ]
}
