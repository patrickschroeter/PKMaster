// tslint:disable:max-line-length
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs/Rx';


import { Permission } from './../../../swagger';

@Injectable()
export class PermissionApiMock {

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
}
