import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent, AdminProfileComponent, RolesComponent, PermissionsComponent, UsersComponent } from './';

import { AccessService } from './../core';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        canActivate: [AccessService],
        children: [
            { path: 'profile', component: AdminProfileComponent, canActivate: [AccessService] },
            { path: 'roles', component: RolesComponent, canActivate: [AccessService] },
            { path: 'permissions', component: PermissionsComponent, canActivate: [AccessService] },
            { path: 'users', component: UsersComponent, canActivate: [AccessService] },
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
