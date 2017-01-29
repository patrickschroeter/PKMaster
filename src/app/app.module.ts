import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { AlertModule } from './modules/alert/alert.module';
import { TranslationModule } from './modules/translation/translation.module';
import { ModalModule } from './modules/overlay/overlay.module';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
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
