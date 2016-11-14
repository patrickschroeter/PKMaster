import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent, ProfileComponent, ProfileEditComponent, ApplicationsComponent, ConferencesComponent, FormsComponent, FormsEditComponent } from './main';
import { AdminComponent, AdminProfileComponent, RolesComponent, PermissionsComponent, UsersComponent } from './admin';

import { PermissionService } from './core';

const routes: Routes = [
    { path: 'styleguide', loadChildren: 'app/styleguide/styleguide.module#StyleguideModule' },
    { path: 'login', loadChildren: 'app/login/login.module#LoginModule' },
    {
        path: '',
        component: MainComponent,
        canActivate: [PermissionService],
        canActivateChild: [PermissionService],
        children: [
            { path: 'profile', component: ProfileComponent, pathMatch: 'full' },
            { path: 'profile/edit', component: ProfileEditComponent },
            { path: 'applications', component: ApplicationsComponent },
            { path: 'conferences', component: ConferencesComponent, canActivate: [PermissionService] },
            { path: 'forms', component: FormsComponent, canActivate: [PermissionService], pathMatch: 'full' },
            { path: 'forms/:id/edit', component: FormsEditComponent },
            { path: '', redirectTo: 'applications', pathMatch: 'full' }
        ]
    },
    {
        path: 'admin',
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
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule { }
