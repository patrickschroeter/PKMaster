import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './';
import { LoginRouting } from './login.routing';

import { SharedModule } from './../shared/shared.module';
import { DynamicFormModule } from './../modules/dynamic-form/dynamic-form.module';
import { ButtonModule } from './../modules/button/button.module';

@NgModule({
    declarations: [
        LoginComponent,
    ],
    imports: [
        LoginRouting,
        CommonModule,

        SharedModule,
        DynamicFormModule,
        ButtonModule
    ],
    providers: [],
    exports: []
})
export class LoginModule { }
