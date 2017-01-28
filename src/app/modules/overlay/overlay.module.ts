import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    OverlayOutletComponent,
    OverlayComponent,

    OverlayHeaderComponent,
    OverlayContentComponent,

    OverlayDefaultComponent,

    OverlayService
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
        OverlayService
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
