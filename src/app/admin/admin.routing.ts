import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent, AdminProfileComponent, RolesComponent, PermissionsComponent, UsersComponent } from './';

import { PermissionService } from './../core';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        canActivate: [PermissionService],
        children: [
            { path: 'profile', component: AdminProfileComponent },
            { path: 'roles', component: RolesComponent, canActivate: [PermissionService] },
            { path: 'permissions', component: PermissionsComponent, canActivate: [PermissionService] },
            { path: 'users', component: UsersComponent, canActivate: [PermissionService] },
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
