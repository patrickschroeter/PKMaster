import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccessMain, AccessAdmin } from './core';

const routes: Routes = [
    { path: 'styleguide', loadChildren: 'app/styleguide/styleguide.module#StyleguideModule' },
    { path: 'login', loadChildren: 'app/login/login.module#LoginModule' },
    { path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule', canLoad: [AccessAdmin], },
    { path: '', loadChildren: 'app/main/main.module#MainModule', canLoad: [AccessMain] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule { }
