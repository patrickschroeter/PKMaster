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

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { AlertModule } from './modules/alert/alert.module';
import { TranslationModule } from './modules/translation/translation.module';
import { ModalModule } from './modules/overlay/overlay.module';

/**
 * AppModule
 *
 * @export
 * @class AppModule
 */
@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,

        AppRoutingModule,

        CoreModule,
        SharedModule,
        AlertModule,
        TranslationModule,
        ModalModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
