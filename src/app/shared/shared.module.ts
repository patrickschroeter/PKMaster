import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';

import * as components from './components';
import * as elements from './elements';
import * as services from './services';

@NgModule({
    declarations: [
        components.DynamicFormComponent,
        components.NavbarComponent,
        components.NavbarAdminComponent,

        elements.OverlayComponent,
        elements.ButtonComponent,
        elements.DeviderComponent,

        elements.InputComponent,
        elements.CheckboxComponent,
        elements.SelectComponent,
        elements.RadioComponent,
        elements.TextareaComponent,
        elements.DatalistComponent,

        elements.FormValidationComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        HttpModule,
        ReactiveFormsModule
    ],
    providers: [
        services.DynamicFormService
    ],
    exports: [
        components.DynamicFormComponent,
        components.NavbarComponent,
        components.NavbarAdminComponent,

        elements.OverlayComponent,
        elements.ButtonComponent,
        elements.DeviderComponent
    ]
})
export class SharedModule { }
