/**
 *
 * @author Patrick Schröter <patrick.schroeter@hotmail.de>
 *
 * @license CreativeCommons BY-NC-SA 4.0 2017
 *
 * This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/.
 *
 */

import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { DndModule } from 'ng2-dnd';

import { ButtonModule } from './../button/button.module';
import { OverlayModule } from './../overlay/overlay.module';
import { DeviderModule } from './../devider/devider.module';
import { FloatingModule } from './../floating/floating.module';
import { TranslationModule } from './../translation/translation.module';

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

/**
 * DynamicFormModule
 *
 * @export
 * @class DynamicFormModule
 */
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
        FloatingModule,
        TranslationModule,

        DndModule.forRoot()
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
    { provide: InputValidationService, useClass: InputValidationMock }
];
