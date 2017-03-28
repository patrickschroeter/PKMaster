/**
 *
 * @author Patrick Schröter <patrick.schroeter@hotmail.de>
 *
 * @license CreativeCommons BY-NC-SA 4.0 2017
 *
 * This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/.
 *
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as main from './';

import {
    AccessMain,
    AccessApplications,
    AccessApplicationsDetail,
    AccessApplicationsEdit,
    AccessConferencesDetail,
    AccessConferencesEdit,
    AccessForms,
    AccessFormsEdit
} from 'app/core';

const routes: Routes = [
    {
        path: '',
        component: main.MainComponent,
        canActivate: [AccessMain],
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
                component: main.ApplicationsComponent,
                canActivate: [AccessApplications]
            },
            {
                path: 'applications/:id',
                component: main.ApplicationsDetailComponent,
                canActivate: [AccessApplicationsDetail]
            },
            {
                path: 'applications/:id/edit',
                component: main.ApplicationsEditComponent,
                canActivate: [AccessApplicationsEdit]
            },
            {
                path: 'conferences',
                component: main.ConferencesComponent
            },
            {
                path: 'conferences/:id',
                component: main.ConferencesDetailComponent,
                canActivate: [AccessConferencesDetail]
            },
            {
                path: 'conferences/:id/edit',
                component: main.ConferencesEditComponent,
                canActivate: [AccessConferencesEdit]
            },
            {
                path: 'forms',
                component: main.FormsComponent,
                canActivate: [AccessForms],
                pathMatch: 'full'
            },
            {
                path: 'forms/:id/edit',
                component: main.FormsEditComponent,
                canActivate: [AccessFormsEdit]
            },
            {
                path: '', redirectTo: 'applications', pathMatch: 'full'
            }
        ]
    }
];

/**
 * MainRouting
 *
 * @export
 * @class MainRouting
 */
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRouting { }
