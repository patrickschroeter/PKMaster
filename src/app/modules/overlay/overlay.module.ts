import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    ModalOutletComponent,
    OverlayComponent,

    OverlayHeaderComponent,
    OverlayContentComponent,

    ModalErrorComponent,

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

        ModalErrorComponent
    ],
    imports: [
        CommonModule,
        FloatingModule,
        ButtonModule
    ],
    providers: [
        ModalService
    ],
    exports: [
        ModalOutletComponent,
        OverlayComponent,

        OverlayHeaderComponent,
        OverlayContentComponent,

        ModalErrorComponent
    ]
})
export class OverlayModule { }
