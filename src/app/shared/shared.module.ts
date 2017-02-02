import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';

import * as components from './components';
import * as elements from './elements';
import * as directives from './directives';
import * as services from './services';

import { FloatingModule } from './../modules/floating/floating.module';
import { ButtonModule } from './../modules/button/button.module';
import { DeviderModule } from './../modules/devider/devider.module';
import { OverlayModule } from './../modules/overlay/overlay.module';
import { ListModule } from './../modules/list/list.module';
import { AlertDirectiveModule } from './../modules/alert/alert.module';
import { DynamicFormModule } from './../modules/dynamic-form/dynamic-form.module';

@NgModule({
    declarations: [
        components.NavbarComponent,
        components.NavbarAdminComponent,

        components.ModalChangePasswordComponent,
        components.ModalAcceptApplicationComponent,

        components.ConferenceEntryComponent,
        components.ModalAddConferenceEntryComponent,
        components.ModalAddConferenceTableEntryComponent,

        elements.LoadingComponent,

        directives.AccessDirective,

    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,

        FloatingModule,
        ButtonModule,
        DeviderModule,
        OverlayModule,
        DynamicFormModule,
        ListModule,
        AlertDirectiveModule
    ],
    providers: [
        services.WindowService
    ],
    exports: [
        components.NavbarComponent,
        components.NavbarAdminComponent,

        components.ModalChangePasswordComponent,
        components.ModalAcceptApplicationComponent,

        components.ConferenceEntryComponent,
        components.ModalAddConferenceEntryComponent,
        components.ModalAddConferenceTableEntryComponent,

        elements.LoadingComponent,

        directives.AccessDirective
    ]
})
export class SharedModule { }
