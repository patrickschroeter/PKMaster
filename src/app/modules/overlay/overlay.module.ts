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
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
    /** Main Components */
    ModalOutletComponent,
    OverlayComponent,

    /** Lego Components */
    OverlayHeaderComponent,
    OverlayContentComponent,

    /** Presets */
    ModalErrorComponent,
    ModalSelectlistComponent,
    ModalConfirmationComponent,

    /** Services */
    ModalService,
    ModalMock
} from './';

import { FloatingModule } from './../floating/floating.module';
import { ButtonModule } from './../button/button.module';

/**
 * OverlayModule
 *
 * @export
 * @class OverlayModule
 */
@NgModule({
    declarations: [
        ModalOutletComponent,
        OverlayComponent,

        OverlayHeaderComponent,
        OverlayContentComponent,

        ModalErrorComponent,
        ModalSelectlistComponent,
        ModalConfirmationComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        FloatingModule,
        ButtonModule
    ],
    providers: [],
    exports: [
        ModalOutletComponent,
        OverlayComponent,

        OverlayHeaderComponent,
        OverlayContentComponent,

        ModalErrorComponent,
        ModalSelectlistComponent,
        ModalConfirmationComponent
    ]
})
export class OverlayModule { }

/**
 * ModalModule
 *
 * @export
 * @class ModalModule
 */
@NgModule({
    imports: [
        OverlayModule
    ],
    providers: [
        ModalService
    ],
    exports: [
        ModalOutletComponent
    ]
})
export class ModalModule { }

export const ModalProviderMock = [
    { provide: ModalService, useClass: ModalMock }
];
