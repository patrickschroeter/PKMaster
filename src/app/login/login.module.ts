import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './';
import { LoginRouting } from './login.routing';

import { SharedModule } from './../shared/shared.module';
import { DynamicFormModule } from 'app/modules/dynamic-form/dynamic-form.module';
import { ButtonModule } from 'app/modules/button/button.module';
import { FloatingModule } from 'app/modules/floating/floating.module';
import { RegisterComponent } from './register/register.component';
import { IdentifyComponent } from './identify/identify.component';

@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent,
        IdentifyComponent,
    ],
    imports: [
        LoginRouting,
        CommonModule,

        SharedModule,
        DynamicFormModule,
        ButtonModule,
        FloatingModule
    ],
    providers: [],
    exports: []
})
export class LoginModule { }
