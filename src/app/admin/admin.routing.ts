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
    AccessUsersEdit
} from './../core';

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
                canActivate: [AccessUsers]
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

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class AdminRouting { }
