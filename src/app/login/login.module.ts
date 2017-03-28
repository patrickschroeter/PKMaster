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

import { LoginComponent } from './';
import { LoginRouting } from './login.routing';

import { SharedModule } from 'app/shared/shared.module';
import { DynamicFormModule } from 'app/modules/dynamic-form/dynamic-form.module';
import { ButtonModule } from 'app/modules/button/button.module';
import { FloatingModule } from 'app/modules/floating/floating.module';
import { RegisterComponent } from './register/register.component';
import { IdentifyComponent } from './identify/identify.component';

/**
 * LoginModule
 *
 * @export
 * @class LoginModule
 */
@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent,
        IdentifyComponent,
    ],
    imports: [
        LoginRouting,
        CommonModule,

        SharedModule,
        DynamicFormModule,
        ButtonModule,
        FloatingModule
    ],
    providers: [],
    exports: []
})
export class LoginModule { }
