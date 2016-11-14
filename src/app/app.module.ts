import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { PkRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { LoginComponent } from './login';
import * as main from './main';
import * as admin from './admin';
import { StyleguideComponent } from './styleguide';

import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StyleguideComponent,

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

    PkRoutingModule,

    CoreModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
