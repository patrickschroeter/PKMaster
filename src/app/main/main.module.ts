import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import * as main from './';
import { MainRouting } from './main.routing';

import { SharedModule } from './../shared/shared.module';
import { ListModule } from './../modules/list/list.module';
import { FloatingModule } from './../modules/floating/floating.module';

@NgModule({
    declarations: [
        main.MainComponent,

        main.ProfileComponent,

        main.ApplicationsComponent,
        main.ApplicationsDetailComponent,
        main.ApplicationsEditComponent,

        main.ConferencesComponent,

        main.ProfileEditComponent,

        main.FormsComponent,
        main.FormsEditComponent,
        main.ElementEditComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MainRouting,
        SharedModule,
        ListModule,
        FloatingModule
    ],
    providers: [],
    exports: []
})
export class MainModule { }
