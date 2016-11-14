import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import * as main from './main';
import * as admin from './admin';

import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';

@NgModule({
    declarations: [
        AppComponent,

        main.MainComponent,
        main.ProfileComponent,
        main.ApplicationsComponent,
        main.ConferencesComponent,
        main.ProfileEditComponent,
        main.FormsComponent,
        main.FormsEditComponent,
        main.ElementEditComponent,

        admin.AdminComponent,
        admin.AdminProfileComponent,
        admin.RolesComponent,
        admin.PermissionsComponent,
        admin.UsersComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ReactiveFormsModule,

        AppRoutingModule,

        CoreModule,
        SharedModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
