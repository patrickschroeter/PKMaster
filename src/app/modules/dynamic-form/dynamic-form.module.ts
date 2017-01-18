import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';

import { ButtonModule } from './../button/button.module';
import { OverlayModule } from './../overlay/overlay.module';
import { DeviderModule } from './../devider/devider.module';
import { FloatingModule } from './../floating/floating.module';

import {
    DynamicFormComponent,
    DynamicFormCancelComponent,
    DynamicFormSubmitComponent,
    DynamicFormElementComponent,
    DynamicFormContentComponent,

    DynamicFormService,
    DynamicFormMock,
    InputValidationService,
    InputValidationMock,

    DynamicFormDefaultComponent,
    DynamicFormEditComponent,
    DynamicFormDisabledComponent,
    DynamicFormOverlayComponent,

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
        DynamicFormDisabledComponent,
        DynamicFormOverlayComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,

        OverlayModule,
        ButtonModule,
        DeviderModule,
        FloatingModule
    ],
    providers: [
        DynamicFormService,
        DynamicFormComponent,
        InputValidationService
    ],
    exports: [
        DynamicFormDefaultComponent,
        DynamicFormEditComponent,
        DynamicFormDisabledComponent,
        DynamicFormOverlayComponent,

        DynamicFormComponent,
        DynamicFormCancelComponent,
        DynamicFormSubmitComponent,
        DynamicFormElementComponent,
        DynamicFormContentComponent,

        InputComponent
    ]
})
export class DynamicFormModule { }

export const DynamicFormProviderMock = [
    { provide: DynamicFormService, useClass: DynamicFormMock },
    { provide: InputValidationService, useClass: InputValidationService }
]
