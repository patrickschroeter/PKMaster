import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { CommonModule } from '@angular/common';

import * as components from './components';
import * as elements from './elements';

@NgModule({
    declarations: [
        components.DynamicFormComponent,

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
        FormsModule,
        HttpModule,
        ReactiveFormsModule
    ],
    exports: [
        components.DynamicFormComponent,

        elements.OverlayComponent,
        elements.ButtonComponent,
        elements.DeviderComponent
    ]
})
export class SharedModule { }
