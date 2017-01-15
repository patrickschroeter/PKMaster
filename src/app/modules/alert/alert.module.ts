import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertService, AlertComponent, AlertDirective } from './';

import { OverlayModule } from './../overlay/overlay.module';

@NgModule({
    declarations: [
        AlertComponent,
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
    ]
})
export class AlertModule { }

@NgModule({
    declarations: [
        AlertDirective
    ],
    exports: [
        AlertDirective
    ]
})
export class AlertDirectiveModule { }
