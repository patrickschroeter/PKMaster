import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StyleguideComponent } from './';

const routes: Routes = [
    { path: '', component: StyleguideComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class StyleguideRouting { }
