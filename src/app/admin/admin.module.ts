import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as admin from './';
import { AdminRouting } from './admin.routing';

import { SharedModule } from './../shared/shared.module';
import { ListModule } from './../modules/list/list.module';
import { FloatingModule } from './../modules/floating/floating.module';
import { DynamicFormModule } from './../modules/dynamic-form/dynamic-form.module';
import { ButtonModule } from './../modules/button/button.module';
import { OverlayModule } from './../modules/overlay/overlay.module';
import { AlertDirectiveModule } from './../modules/alert/alert.module';
import { AdminProfileEditComponent } from './admin-profile/admin-profile-edit/admin-profile-edit.component';
import { RolesDetailComponent } from './roles/roles-detail/roles-detail.component';
import { RolesEditComponent } from './roles/roles-edit/roles-edit.component';
import { UsersDetailComponent } from './users/users-detail/users-detail.component';
import { UsersEditComponent } from './users/users-edit/users-edit.component';

@NgModule({
    declarations: [
        admin.AdminComponent,
        admin.AdminProfileComponent,
        admin.RolesComponent,
        admin.PermissionsComponent,
        admin.UsersComponent,
        AdminProfileEditComponent,
        RolesDetailComponent,
        RolesEditComponent,
        UsersDetailComponent,
        UsersEditComponent
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
        AlertDirectiveModule
    ],
    providers: [],
    exports: []
})
export class AdminModule { }
