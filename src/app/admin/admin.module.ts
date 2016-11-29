import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as admin from './';
import { AdminRouting } from './admin.routing';

import { SharedModule } from './../shared/shared.module';
import { ListModule } from './../modules/list/list.module';
import { FloatingModule } from './../modules/floating/floating.module';
import { DynamicFormModule } from './../modules/dynamic-form/dynamic-form.module';

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
        ListModule,
        FloatingModule,
        DynamicFormModule
    ],
    providers: [],
    exports: []
})
export class AdminModule { }
