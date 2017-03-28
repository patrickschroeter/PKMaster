/**
 *
 * @author Patrick Schröter <patrick.schroeter@hotmail.de>
 *
 * @license CreativeCommons BY-NC-SA 4.0 2017
 *
 * This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/.
 *
 */

// tslint:disable:max-line-length
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs/Rx';


import { PermissionDto } from 'app/swagger';

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
            Deactivate: 'DeactivateApplications',
            Accept: 'AcceptApplications',
            Submit: 'SubmitApplications',
            Validate: 'ValidateApplications'
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
                description: 'Erlaubt dem Benutzer das Rechtesystem einzusehen'
            },
            Edit: {
                id: '2',
                name: PermissionApiMock.PERMISSION.Permission.Edit,
                description: 'Erlaubt dem Benutzer Rechte zu verändern'
            },
        },
        Roles: {
            Read: {
                id: '3',
                name: PermissionApiMock.PERMISSION.Roles.Read,
                description: 'Erlaubt dem Benutzer das Rollensystem einzusehen'
            },
            Edit: {
                id: '4',
                name: PermissionApiMock.PERMISSION.Roles.Edit,
                description: 'Erlaubt dem Benutzer Rollen zu bearbeiten'
            },
        },
        Users: {
            Read: {
                id: '5',
                name: PermissionApiMock.PERMISSION.Users.Read,
                description: 'Erlaubt dem Benutzer alle User einzusehen'
            },
            Edit: {
                id: '6',
                name: PermissionApiMock.PERMISSION.Users.Edit,
                description: 'Erlaubt dem Benutzer User zu bearbeiten'
            },
        },
        Application: {
            Create: {
                id: '7',
                name: PermissionApiMock.PERMISSION.Application.Create,
                description: 'Erlaubt dem Benutzer Anträge zu erstellen und eigene Anträge zu sehen und zu bearbeiten, einzureichen, zurückzuziehen und zu deaktivieren'
            },
            Read: {
                id: '8',
                name: PermissionApiMock.PERMISSION.Application.Read,
                description: 'Erlaubt dem Benutzer fremde Anträge zu sehen und zu lesen'
            },
            Edit: {
                id: '9',
                name: PermissionApiMock.PERMISSION.Application.Edit,
                description: 'Erlaubt dem Benutzer fremde Anträge zu bearbeiten (Inhaltlich sowie Zustand, mit Außnahmen)'
            },
            Comment: {
                id: '10',
                name: PermissionApiMock.PERMISSION.Application.Comment,
                description: 'Erlaubt dem Benutzer fremde Anträge zu Kommentieren'
            },
            Deactivate: {
                id: '11',
                name: PermissionApiMock.PERMISSION.Application.Deactivate,
                description: 'Erlaubt dem Benutzer fremde Anträge zu löschen/deaktivieren'
            },
            Accept: {
                id: '12',
                name: PermissionApiMock.PERMISSION.Application.Accept,
                description: 'Erlaubt dem Benutzer Anträge zu akzeptieren oder abzulehnen'
            },
            Submit: {
                id: '17',
                name: PermissionApiMock.PERMISSION.Application.Submit,
                description: 'Erlaubt dem Benutzer Anträge einzusehen'
            },
            Validate: {
                id: '18',
                name: PermissionApiMock.PERMISSION.Application.Validate,
                description: 'Erlaubt dem Benutzer Anträge zu verifizieren/validieren'
            },
        },
        Conference: {
            Read: {
                id: '13',
                name: PermissionApiMock.PERMISSION.Conference.Read,
                description: 'Erlaubt dem Benutzer alle Sitzungen zu sehen und zu lesen'
            },
            Edit: {
                id: '14',
                name: PermissionApiMock.PERMISSION.Conference.Edit,
                description: 'Erlaubt dem Benutzer Sitzungen zu bearbeiten'
            },
        },
        Forms: {
            Read: {
                id: '15',
                name: PermissionApiMock.PERMISSION.Forms.Read,
                description: 'Erlaubt dem Benutzer alle Formulare zu sehen'
            },
            Edit: {
                id: '16',
                name: PermissionApiMock.PERMISSION.Forms.Edit,
                description: 'Erlaubt dem Benutzer Formulare zu bearbeiten'
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
        PermissionApiMock.PERMISSION_OBJECT.Application.Deactivate,
        PermissionApiMock.PERMISSION_OBJECT.Application.Comment,
        PermissionApiMock.PERMISSION_OBJECT.Application.Accept,
        PermissionApiMock.PERMISSION_OBJECT.Application.Submit,
        PermissionApiMock.PERMISSION_OBJECT.Application.Validate,
        /** Conference */
        PermissionApiMock.PERMISSION_OBJECT.Conference.Read,
        PermissionApiMock.PERMISSION_OBJECT.Conference.Edit,
        /** Forms */
        PermissionApiMock.PERMISSION_OBJECT.Forms.Read,
        PermissionApiMock.PERMISSION_OBJECT.Forms.Edit
    ];
}
