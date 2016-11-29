import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';

import * as components from './components';
import * as elements from './elements';
import * as directives from './directives';

import { FloatingModule } from './../modules/floating/floating.module';

@NgModule({
    declarations: [
        components.NavbarComponent,
        components.NavbarAdminComponent,

        elements.OverlayComponent,
        elements.ButtonComponent,
        elements.DeviderComponent,

        directives.AlertDirective
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        HttpModule,
        ReactiveFormsModule,

        FloatingModule
    ],
    providers: [

    ],
    exports: [
        components.NavbarComponent,
        components.NavbarAdminComponent,

        elements.OverlayComponent,
        elements.ButtonComponent,
        elements.DeviderComponent,

        directives.AlertDirective
    ]
})
export class SharedModule { }
