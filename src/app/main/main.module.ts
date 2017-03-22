import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import * as main from './';
import { MainRouting } from './main.routing';

import { SharedModule } from 'app/shared/shared.module';
import { ListModule } from 'app/modules/list/list.module';
import { FloatingModule } from 'app/modules/floating/floating.module';
import { DynamicFormModule } from 'app/modules/dynamic-form/dynamic-form.module';
import { ButtonModule } from 'app/modules/button/button.module';
import { OverlayModule } from 'app/modules/overlay/overlay.module';
import { AlertDirectiveModule } from 'app/modules/alert/alert.module';
import { DeviderModule } from 'app/modules/devider/devider.module';

@NgModule({
    declarations: [
        main.MainComponent,

        main.ProfileComponent,

        main.ApplicationsComponent,
        main.ApplicationsDetailComponent,
        main.ApplicationsEditComponent,

        main.ConferencesComponent,
        main.ConferencesDetailComponent,
        main.ConferencesEditComponent,

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
        AlertDirectiveModule,
        DeviderModule
    ],
    providers: [],
    exports: []
})
export class MainModule { }
