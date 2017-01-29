import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    OverlayOutletComponent,
    OverlayComponent,

    OverlayHeaderComponent,
    OverlayContentComponent,

    OverlayDefaultComponent,

    ModalService
} from './';

import { FloatingModule } from './../floating/floating.module';
import { ButtonModule } from './../button/button.module';

@NgModule({
    declarations: [
        OverlayOutletComponent,
        OverlayComponent,

        OverlayHeaderComponent,
        OverlayContentComponent,

        OverlayDefaultComponent
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
        OverlayOutletComponent,
        OverlayComponent,

        OverlayHeaderComponent,
        OverlayContentComponent,

        OverlayDefaultComponent
    ]
})
export class OverlayModule { }
