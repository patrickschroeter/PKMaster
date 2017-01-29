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
