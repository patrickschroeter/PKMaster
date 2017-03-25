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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DndModule } from 'ng2-dnd';

import * as components from './components';
import * as elements from './elements';
import * as directives from './directives';
import * as services from './services';

import { FloatingModule } from 'app/modules/floating/floating.module';
import { ButtonModule } from 'app/modules/button/button.module';
import { DeviderModule } from 'app/modules/devider/devider.module';
import { OverlayModule } from 'app/modules/overlay/overlay.module';
import { ListModule } from 'app/modules/list/list.module';
import { AlertDirectiveModule } from 'app/modules/alert/alert.module';
import { DynamicFormModule } from 'app/modules/dynamic-form/dynamic-form.module';
import { StatusPipe } from './pipes';

/**
 * SharedModule
 *
 * @export
 * @class SharedModule
 */
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
        components.PaginationComponent,
        components.FilterComponent,
        components.ApplicationsListComponent,
        components.ApplicationsListOwnedComponent,
        components.ApplicationsListAssignedComponent,

        /** Conference */
        components.ConferenceEntryComponent,
        components.ConferenceEntryDetailComponent,
        elements.ConferenceEntryConfigComponent,
        elements.ConferenceEntryApplicationComponent,
        elements.ConferenceEntryListComponent,

        /** Components */
        components.CommentAddComponent,

        /** Elements */
        elements.LoadingComponent,
        elements.ButtonAnimationWrapperComponent,

        /** Buttons */
        elements.ButtonApplicationEditComponent,
        elements.ButtonApplicationUpdateComponent,
        elements.ButtonApplicationRescindComponent,
        elements.ButtonApplicationDeactivateComponent,
        elements.ButtonApplicationSubmitComponent,
        elements.ButtonApplicationValidateComponent,
        elements.ButtonApplicationAssignComponent,
        elements.ButtonApplicationUnassignComponent,

        elements.ButtonConferenceDeleteComponent,
        elements.ButtonConferenceEditComponent,
        elements.ButtonConferenceCloneComponent,

        elements.ButtonFormEditComponent,

        /** Directives */
        directives.AccessDirective,
        directives.SortDirective,

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
        components.PaginationComponent,
        components.FilterComponent,
        components.ApplicationsListComponent,
        components.ApplicationsListOwnedComponent,
        components.ApplicationsListAssignedComponent,

        /** Conference */
        components.ConferenceEntryComponent,
        components.ConferenceEntryDetailComponent,

        /** Components */
        components.CommentAddComponent,

        /** Elements */
        elements.LoadingComponent,
        elements.ButtonAnimationWrapperComponent,

        /** Buttons */
        elements.ButtonApplicationEditComponent,
        elements.ButtonApplicationUpdateComponent,
        elements.ButtonApplicationRescindComponent,
        elements.ButtonApplicationDeactivateComponent,
        elements.ButtonApplicationSubmitComponent,
        elements.ButtonApplicationValidateComponent,
        elements.ButtonApplicationAssignComponent,
        elements.ButtonApplicationUnassignComponent,

        elements.ButtonConferenceDeleteComponent,
        elements.ButtonConferenceEditComponent,
        elements.ButtonConferenceCloneComponent,

        elements.ButtonFormEditComponent,

        /** Directives */
        directives.AccessDirective,
        directives.SortDirective,

        /** Pipes */
        StatusPipe,

        /** 3rd Party */
        DndModule
    ]
})
export class SharedModule { }

export const SharedProviderMock = [
    { provide: services.WindowService, useClass: services.WindowMock },
    { provide: services.ListService, useClass: services.ListService }
];
