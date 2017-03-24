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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
    AdminComponent,
    AdminProfileComponent,
    AdminProfileEditComponent,
    RolesComponent,
    RolesDetailComponent,
    PermissionsComponent,
    UsersComponent,
    UsersEditComponent,
    UsersDetailComponent
} from './';

import {
    AccessAdmin,
    AccessRoles,
    AccessRolesEdit,
    AccessPermissions,
    AccessUsers,
    AccessUsersDetail,
    AccessUsersEdit
} from 'app/core';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        canActivate: [AccessAdmin],
        children: [
            {
                path: 'profile',
                component: AdminProfileComponent
            },
            {
                path: 'profile/edit',
                component: AdminProfileEditComponent
            },
            {
                path: 'roles',
                component: RolesComponent,
                canActivate: [AccessRoles]
            },
            {
                path: 'roles/:id',
                component: RolesDetailComponent,
                canActivate: [AccessRoles]
            },
            {
                path: 'permissions',
                component: PermissionsComponent,
                canActivate: [AccessPermissions]
            },
            {
                path: 'users',
                component: UsersComponent,
                canActivate: [AccessUsers]
            },
            {
                path: 'users/:id',
                component: UsersDetailComponent,
                canActivate: [AccessUsersDetail]
            },
            {
                path: 'users/:id/edit',
                component: UsersEditComponent,
                canActivate: [AccessUsersEdit]
            },
            {
                path: '',
                redirectTo: 'roles',
                pathMatch: 'full'
            }
        ]
    }
];

/**
 * AdminRouting
 *
 * @export
 * @class AdminRouting
 */
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class AdminRouting { }
