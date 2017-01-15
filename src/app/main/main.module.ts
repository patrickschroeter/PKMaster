import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import * as main from './';
import { MainRouting } from './main.routing';

import { SharedModule } from './../shared/shared.module';
import { ListModule } from './../modules/list/list.module';
import { FloatingModule } from './../modules/floating/floating.module';
import { DynamicFormModule } from './../modules/dynamic-form/dynamic-form.module';
import { ButtonModule } from './../modules/button/button.module';
import { OverlayModule } from './../modules/overlay/overlay.module';
import { AlertDirectiveModule } from './../modules/alert/alert.module';

@NgModule({
    declarations: [
        main.MainComponent,

        main.ProfileComponent,

        main.ApplicationsComponent,
        main.ApplicationsDetailComponent,
        main.ApplicationsEditComponent,

        main.ConferencesComponent,
        main.ConferencesDetailComponent,

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

        DynamicFormModule,
        ListModule,
        ButtonModule,
        FloatingModule,
        OverlayModule,
        AlertDirectiveModule
    ],
    providers: [],
    exports: []
})
export class MainModule { }
