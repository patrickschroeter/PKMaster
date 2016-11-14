import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as main from './';
import { MainRouting } from './main.routing';

import { SharedModule } from './../shared/shared.module';

@NgModule({
    declarations: [
        main.MainComponent,
        main.ProfileComponent,
        main.ApplicationsComponent,
        main.ConferencesComponent,
        main.ProfileEditComponent,
        main.FormsComponent,
        main.FormsEditComponent,
        main.ElementEditComponent,
    ],
    imports: [
        CommonModule,
        MainRouting,
        SharedModule,
    ],
    providers: [],
    exports: []
})
export class MainModule { }
