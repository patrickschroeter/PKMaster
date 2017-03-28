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

import * as admin from './';
import { AdminRouting } from './admin.routing';

import { SharedModule } from 'app/shared/shared.module';
import { ListModule } from 'app/modules/list/list.module';
import { FloatingModule } from 'app/modules/floating/floating.module';
import { DynamicFormModule } from 'app/modules/dynamic-form/dynamic-form.module';
import { ButtonModule } from 'app/modules/button/button.module';
import { OverlayModule } from 'app/modules/overlay/overlay.module';
import { AlertDirectiveModule } from 'app/modules/alert/alert.module';
import { DeviderModule } from 'app/modules/devider/devider.module';

/**
 * AdminModule
 *
 * @export
 * @class AdminModule
 */
@NgModule({
    declarations: [
        admin.AdminComponent,
        admin.AdminProfileComponent,
        admin.RolesComponent,
        admin.PermissionsComponent,
        admin.UsersComponent,
        admin.AdminProfileEditComponent,
        admin.RolesDetailComponent,
        admin.UsersDetailComponent,
        admin.UsersEditComponent
    ],
    imports: [
        CommonModule,
        AdminRouting,
        SharedModule,
        ListModule,
        FloatingModule,
        DynamicFormModule,
        ButtonModule,
        OverlayModule,
        AlertDirectiveModule,
        DeviderModule
    ],
    providers: [],
    exports: []
})
export class AdminModule { }
