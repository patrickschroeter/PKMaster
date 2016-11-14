import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as admin from './';
import { AdminRouting } from './admin.routing';

import { SharedModule } from './../shared/shared.module';

@NgModule({
    declarations: [
        admin.AdminComponent,
        admin.AdminProfileComponent,
        admin.RolesComponent,
        admin.PermissionsComponent,
        admin.UsersComponent
    ],
    imports: [
        CommonModule,
        AdminRouting,
        SharedModule,
    ],
    providers: [],
    exports: []
})
export class AdminModule { }
