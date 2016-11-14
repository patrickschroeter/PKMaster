import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent, ProfileComponent, ProfileEditComponent, ApplicationsComponent, ConferencesComponent, FormsComponent, FormsEditComponent } from './main';

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
    { path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule', canActivate: [PermissionService], }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule { }
