import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent, AdminProfileComponent, RolesComponent, PermissionsComponent, UsersComponent } from './';

import {
    AccessAdmin,
    AccessEditRoles,
    AccessReadRoles,
    AccessEditPermissions,
    AccessReadPermissions,
    AccessEditUsers,
    AccessReadUsers
} from './../core';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        canActivate: [AccessAdmin],
        children: [
            { path: 'profile', component: AdminProfileComponent },
            { path: 'roles', component: RolesComponent, canActivate: [AccessReadRoles] },
            { path: 'permissions', component: PermissionsComponent, canActivate: [AccessReadPermissions] },
            { path: 'users', component: UsersComponent, canActivate: [AccessReadUsers] },
            { path: '', redirectTo: 'roles', pathMatch: 'full' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class AdminRouting { }
