import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OverlayComponent, OverlayHeaderComponent, OverlayContentComponent } from './';

import { FloatingModule } from './../floating/floating.module';
import { ButtonModule } from './../button/button.module';

@NgModule({
    declarations: [
        OverlayComponent,
        OverlayHeaderComponent,
        OverlayContentComponent
    ],
    imports: [
        CommonModule,
        FloatingModule,
        ButtonModule
    ],
    providers: [

    ],
    exports: [
        OverlayComponent,
        OverlayHeaderComponent,
        OverlayContentComponent
    ]
})
export class OverlayModule { }
