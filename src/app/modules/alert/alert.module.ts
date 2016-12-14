import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertService, AlertComponent, AlertDirective } from './';

import { OverlayModule } from './../overlay/overlay.module';

@NgModule({
    declarations: [
        AlertComponent,
        AlertDirective
    ],
    imports: [
        CommonModule,
        OverlayModule
    ],
    providers: [
        AlertService
    ],
    exports: [
        AlertComponent,
        AlertDirective
    ]
})
export class AlertModule { }
