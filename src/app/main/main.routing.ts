import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as main from './';

import { PermissionService } from './../core';

const routes: Routes = [
    {
        path: '',
        component: main.MainComponent,
        canActivate: [PermissionService],
        canActivateChild: [PermissionService],
        children: [
            { path: 'profile', component: main.ProfileComponent, pathMatch: 'full' },
            { path: 'profile/edit', component: main.ProfileEditComponent },
            { path: 'applications', component: main.ApplicationsComponent },
            { path: 'applications/:id', component: main.ApplicationsDetailComponent },
            { path: 'conferences', component: main.ConferencesComponent, canActivate: [PermissionService] },
            { path: 'forms', component: main.FormsComponent, canActivate: [PermissionService], pathMatch: 'full' },
            { path: 'forms/:id/edit', component: main.FormsEditComponent },
            { path: '', redirectTo: 'applications', pathMatch: 'full' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class MainRouting { }
