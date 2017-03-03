import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DndModule } from 'ng2-dnd';

import * as components from './components';
import * as elements from './elements';
import * as directives from './directives';
import * as services from './services';

import { FloatingModule } from './../modules/floating/floating.module';
import { ButtonModule } from './../modules/button/button.module';
import { DeviderModule } from './../modules/devider/devider.module';
import { OverlayModule } from './../modules/overlay/overlay.module';
import { ListModule } from './../modules/list/list.module';
import { AlertDirectiveModule } from './../modules/alert/alert.module';
import { DynamicFormModule } from './../modules/dynamic-form/dynamic-form.module';
import { StatusPipe } from './pipes';

@NgModule({
    declarations: [
        /** Navbar */
        components.NavbarComponent,
        components.NavbarAdminComponent,

        /** Modal */
        components.ModalChangePasswordComponent,
        components.ModalAcceptApplicationComponent,
        components.ModalAddConferenceEntryComponent,
        components.ModalAddConferenceListComponent,

        /** Application Lists */
        components.ApplicationsListComponent,
        components.ApplicationsListOwnedComponent,
        components.ApplicationsListAssignedComponent,

        /** Conference */
        components.ConferenceEntryComponent,
        components.ConferenceEntryDetailComponent,
        elements.ConferenceEntryConfigComponent,
        elements.ConferenceEntryApplicationComponent,
        elements.ConferenceEntryListComponent,

        /** Elements */
        elements.LoadingComponent,
        elements.ButtonAnimationWrapperComponent,

        /** Buttons */
        elements.ButtonApplicationEditComponent,
        elements.ButtonApplicationUpdateComponent,
        elements.ButtonApplicationRescindComponent,
        elements.ButtonApplicationDeactivateComponent,

        /** Directives */
        directives.AccessDirective,

        /** Pipes */
        StatusPipe
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,

        FloatingModule,
        ButtonModule,
        DeviderModule,
        OverlayModule,
        DynamicFormModule,
        ListModule,
        AlertDirectiveModule,

        DndModule.forRoot()
    ],
    providers: [
        services.WindowService
    ],
    exports: [
        /** Navbar */
        components.NavbarComponent,
        components.NavbarAdminComponent,

        /** Modal */
        components.ModalChangePasswordComponent,
        components.ModalAcceptApplicationComponent,
        components.ModalAddConferenceEntryComponent,
        components.ModalAddConferenceListComponent,

        /** Application Lists */
        components.ApplicationsListComponent,
        components.ApplicationsListOwnedComponent,
        components.ApplicationsListAssignedComponent,

        /** Conference */
        components.ConferenceEntryComponent,
        components.ConferenceEntryDetailComponent,

        /** Elements */
        elements.LoadingComponent,
        elements.ButtonAnimationWrapperComponent,

        /** Buttons */
        elements.ButtonApplicationEditComponent,
        elements.ButtonApplicationUpdateComponent,
        elements.ButtonApplicationRescindComponent,
        elements.ButtonApplicationDeactivateComponent,

        /** Directives */
        directives.AccessDirective,

        /** Pipes */
        StatusPipe,

        /** 3rd Party */
        DndModule
    ]
})
export class SharedModule { }

export const SharedProviderMock = [
    { provide: services.WindowService, useClass: services.WindowMock }
];
