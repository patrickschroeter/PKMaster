import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './';
import { LoginRouting } from './login.routing';

import { SharedModule } from './../shared/shared.module';
import { DynamicFormModule } from './../modules/dynamic-form/dynamic-form.module';

@NgModule({
    declarations: [
        LoginComponent,
    ],
    imports: [
        LoginRouting,
        CommonModule,

        SharedModule,
        DynamicFormModule
    ],
    providers: [],
    exports: []
})
export class LoginModule { }
