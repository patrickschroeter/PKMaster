import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';

import * as components from './components';
import * as elements from './elements';

import { FloatingModule } from './../modules/floating/floating.module';
import { ButtonModule } from './../modules/button/button.module';
import { DeviderModule } from './../modules/devider/devider.module';

@NgModule({
    declarations: [
        components.NavbarComponent,
        components.NavbarAdminComponent,

        elements.LoadingComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        HttpModule,
        ReactiveFormsModule,

        FloatingModule,
        ButtonModule,
        DeviderModule
    ],
    providers: [

    ],
    exports: [
        components.NavbarComponent,
        components.NavbarAdminComponent,

        elements.LoadingComponent
    ]
})
export class SharedModule { }
