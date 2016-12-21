import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as main from './';

import {
    AccessService,
    AccessReadForms,
    AccessEditForms,
    AccessEditConferences,
    AccessReadConferences,
} from './../core';

const routes: Routes = [
    {
        path: '',
        component: main.MainComponent,
        canActivate: [AccessService],
        children: [
            {
                path: 'profile',
                component: main.ProfileComponent,
                pathMatch: 'full'
            },
            {
                path: 'profile/edit',
                component: main.ProfileEditComponent
            },
            {
                path: 'applications',
                component: main.ApplicationsComponent
            },
            {
                path: 'applications/:id',
                component: main.ApplicationsDetailComponent
            },
            {
                path: 'applications/:id/edit',
                component: main.ApplicationsEditComponent
            },
            {
                path: 'conferences',
                component: main.ConferencesComponent,
                canActivate: [AccessReadConferences]
            },
            {
                path: 'forms',
                component: main.FormsComponent,
                canActivate: [AccessReadForms],
                pathMatch: 'full'
            },
            {
                path: 'forms/:id/edit',
                component: main.FormsEditComponent,
                canActivate: [AccessEditForms]
            },
            {
                path: '', redirectTo: 'applications', pathMatch: 'full'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class MainRouting { }
