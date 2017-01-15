import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';

import * as components from './components';
import * as elements from './elements';
import * as directives from './directives';

import { FloatingModule } from './../modules/floating/floating.module';
import { ButtonModule } from './../modules/button/button.module';
import { DeviderModule } from './../modules/devider/devider.module';

@NgModule({
    declarations: [
        components.NavbarComponent,
        components.NavbarAdminComponent,

        elements.LoadingComponent,

        directives.AccessDirective
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
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

        elements.LoadingComponent,

        directives.AccessDirective
    ]
})
export class SharedModule { }
