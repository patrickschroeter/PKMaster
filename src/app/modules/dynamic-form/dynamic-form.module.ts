import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';

import { SharedModule } from './../../shared/shared.module';
import { FloatingModule } from './../floating/floating.module';

import {
    DynamicFormComponent,
    DynamicFormCancelComponent,
    DynamicFormSubmitComponent,
    DynamicFormElementComponent,
    DynamicFormContentComponent,

    DynamicFormService
} from './';
import { DynamicFormDefaultComponent } from './dynamic-form-default/dynamic-form-default.component';
import { DynamicFormEditComponent } from './dynamic-form-edit/dynamic-form-edit.component';
import { DynamicFormDisabledComponent } from './dynamic-form-disabled/dynamic-form-disabled.component';

@NgModule({
    declarations: [
        DynamicFormComponent,
        DynamicFormCancelComponent,
        DynamicFormSubmitComponent,
        DynamicFormElementComponent,
        DynamicFormContentComponent,

        DynamicFormDefaultComponent,
        DynamicFormEditComponent,
        DynamicFormDisabledComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,

        SharedModule,
        FloatingModule
    ],
    providers: [
        DynamicFormService
    ],
    exports: [
        DynamicFormDefaultComponent,
        DynamicFormEditComponent,
        DynamicFormDisabledComponent,

        DynamicFormComponent,
        DynamicFormCancelComponent,
        DynamicFormSubmitComponent,
        DynamicFormElementComponent,
        DynamicFormContentComponent
    ]
})
export class DynamicFormModule { }
