import { NgModule } from '@angular/core';

import { LoginComponent } from './';
import { LoginRouting } from './login.routing';

import { SharedModule } from './../shared/shared.module';

@NgModule({
    declarations: [
        LoginComponent,
    ],
    imports: [
        LoginRouting,
        SharedModule,
    ],
    providers: [],
    exports: []
})
export class LoginModule { }
