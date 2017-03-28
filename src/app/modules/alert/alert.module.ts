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

import { AlertService, AlertMock, AlertComponent, AlertDirective } from './';

import { OverlayModule } from './../overlay/overlay.module';

/**
 * AlertModule
 *
 * @export
 * @class AlertModule
 */
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

/**
 * AlertDirectiveModule
 *
 * @export
 * @class AlertDirectiveModule
 */
@NgModule({
    declarations: [
        AlertDirective
    ],
    exports: [
        AlertDirective
    ]
})
export class AlertDirectiveModule { }

export const AlertProviderMock = [
    { provide: AlertService, useClass: AlertMock }
];
