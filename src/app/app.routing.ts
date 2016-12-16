import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccessService } from './core';

const routes: Routes = [
    { path: 'styleguide', loadChildren: 'app/styleguide/styleguide.module#StyleguideModule' },
    { path: 'login', loadChildren: 'app/login/login.module#LoginModule' },
    { path: '', loadChildren: 'app/main/main.module#MainModule' },
    { path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule', canActivate: [AccessService], }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule { }
