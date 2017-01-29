import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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

    /** Services */
    ModalService
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
        ModalSelectlistComponent
    ],
    imports: [
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
        ModalSelectlistComponent
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
