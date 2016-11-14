import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './';

import { PermissionService } from './../core';

const routes: Routes = [
    { path: '', component: LoginComponent, canDeactivate: [PermissionService] },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class LoginRouting { }
