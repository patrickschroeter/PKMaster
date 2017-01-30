import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent, AdminProfileComponent, RolesComponent, PermissionsComponent, UsersComponent } from './';

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
                component: AdminProfileComponent
            },
            {
                path: 'roles',
                component: RolesComponent,
                canActivate: [AccessRoles]
            },
            {
                path: 'roles/:id',
                component: RolesComponent,
                canActivate: [AccessRoles]
            },
            {
                path: 'roles/:id/edit',
                component: RolesComponent,
                canActivate: [AccessRolesEdit]
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
                component: UsersComponent,
                canActivate: [AccessUsers]
            },
            {
                path: 'users/:id/edit',
                component: UsersComponent,
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
