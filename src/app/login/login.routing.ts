import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './';

import { AccessService } from './../core';

const routes: Routes = [
    { path: '', component: LoginComponent, canDeactivate: [AccessService] },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class LoginRouting { }
