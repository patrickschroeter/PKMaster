import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
    LoginComponent,
    RegisterComponent,
    IdentifyComponent
} from './';

const routes: Routes = [
    { path: '', component: LoginComponent, pathMatch: 'full' },
    { path: 'register', component: RegisterComponent },
    { path: 'identify', component: IdentifyComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class LoginRouting { }
