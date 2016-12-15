import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as main from './';

import { AccessService } from './../core';

const routes: Routes = [
    {
        path: '',
        component: main.MainComponent,
        canActivate: [AccessService],
        children: [
            { path: 'profile', component: main.ProfileComponent, pathMatch: 'full' },
            { path: 'profile/edit', component: main.ProfileEditComponent },
            { path: 'applications', component: main.ApplicationsComponent },
            { path: 'applications/:id', component: main.ApplicationsDetailComponent },
            { path: 'applications/:id/edit', component: main.ApplicationsEditComponent },
            { path: 'conferences', component: main.ConferencesComponent, canActivate: [AccessService] },
            { path: 'forms', component: main.FormsComponent, canActivate: [AccessService], pathMatch: 'full' },
            { path: 'forms/:id/edit', component: main.FormsEditComponent, canActivate: [AccessService] },
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
