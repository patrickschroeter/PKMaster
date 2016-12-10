import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';

import { SharedModule } from './../../shared/shared.module';
import { FloatingModule } from './../floating/floating.module';

import {
    DynamicFormComponent,
    DynamicFormCancelComponent,
    DynamicFormSubmitComponent,
    DynamicFormElementComponent,
    DynamicFormContentComponent,

    DynamicFormService,

    DynamicFormDefaultComponent,
    DynamicFormEditComponent,
    DynamicFormDisabledComponent,

    CheckboxComponent,
    DatalistComponent,
    InputComponent,
    RadioComponent,
    SelectComponent,
    TextareaComponent
} from './';

@NgModule({
    declarations: [
        CheckboxComponent,
        DatalistComponent,
        InputComponent,
        RadioComponent,
        SelectComponent,
        TextareaComponent,

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
        FormsModule,

        SharedModule,
        FloatingModule
    ],
    providers: [
        DynamicFormService,
        DynamicFormComponent
    ],
    exports: [
        DynamicFormDefaultComponent,
        DynamicFormEditComponent,
        DynamicFormDisabledComponent,

        DynamicFormComponent,
        DynamicFormCancelComponent,
        DynamicFormSubmitComponent,
        DynamicFormElementComponent,
        DynamicFormContentComponent,

        InputComponent
    ]
})
export class DynamicFormModule { }
