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

import { Component, OnInit, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import * as _ from 'lodash';

/** Services */
import {
    ApplicationService,
    AuthenticationService,
    PermissionService
} from 'app/core';
import { AlertService } from 'app/modules/alert';

/** Models */
import {
    FieldDto,
    CommentDto,
    ApplicationDetailDto,
    Status
} from 'app/swagger';
import { AcceptApplication } from 'app/models';

/** Decorators */
import { Access, OnAccess } from 'app/shared/decorators/access.decorator';

/** Components */
import { OverlayComponent } from 'app/modules/overlay';

/**
 * ModalAcceptApplicationComponent
 *
 * @export
 * @class ModalAcceptApplicationComponent
 * @implements {OnInit}
 * @implements {OnAccess}
 */
@Component({
    selector: 'pk-modal-accept-application',
    templateUrl: './modal-accept-application.component.html',
    styleUrls: ['./modal-accept-application.component.scss'],
    exportAs: 'acceptModal'
})
export class ModalAcceptApplicationComponent implements OnInit, OnAccess {

    @ViewChild('overlay') overlay: OverlayComponent;

    @Output() callback: EventEmitter<ApplicationDetailDto> = new EventEmitter();

    public acceptForm: FieldDto[];

    public application: ApplicationDetailDto;

    /**
     * Creates an instance of ModalAcceptApplicationComponent.
     * @param {AuthenticationService} auth
     * @param {ApplicationService} applicationService
     * @param {PermissionService} permission
     * @param {AlertService} alert
     *
     * @memberOf ModalAcceptApplicationComponent
     */
    constructor(
        private auth: AuthenticationService,
        private applicationService: ApplicationService,
        public permission: PermissionService,
        public alert: AlertService
    ) { }

    /**
     * implements OnInit
     *
     *
     * @memberOf ModalAcceptApplicationComponent
     */
    ngOnInit() {
        this.initAcceptForm();
    }

    /**
     * Opens the Modal and sets the given application
     *
     * @param {ApplicationDetailDto} application
     *
     * @memberOf ModalAcceptApplicationComponent
     */
    public openModal(application: ApplicationDetailDto): void {
        this.application = application;
        this.applicationService.setApplication(application);
        setTimeout(() => {
            this.overlay.toggle(true);
        }, 0);
    }

    /**
     * close the overlay modal
     *
     * @memberOf ModalAcceptApplicationComponent
     */
    public closeModal() {
        this.overlay.toggle(false);
    }

    /**
     * Create the Form to accept/decline the Application
     *
     * @memberOf ModalAcceptApplicationComponent
     */
    public initAcceptForm() {
        this.acceptForm = [
            {
                fieldType: 'textarea',
                name: 'accept_message',
                label: 'Add Comment:',
                required: true
            },
            {
                fieldType: 'checkbox',
                name: 'accept_requiresChanges',
                label: 'Requires Changes',
                styleIds: [
                    'small'
                ]
            }
        ];
    }

    /**
     * accepts the application (with condition)
     *
     * @param {AcceptApplication} form
     *
     * @memberOf ModalAcceptApplicationComponent
     */
    @Access('AcceptApplications')
    public acceptApplication(form: AcceptApplication) {
        /** TODO */ this.createNewComment({ message: form.accept_message, requiresChanges: form.accept_requiresChanges, isPrivate: false });
        this.applicationService.updateStatusOfApplication(Status.ACCEPTED).subscribe(result => {
            this.application.update(result);
            this.callback.emit(result);
            this.overlay.toggle(false);
            this.initAcceptForm();
        });
    }

    /**
     * declines the application with reasons
     *
     * @param {AcceptApplication} form
     *
     * @memberOf ModalAcceptApplicationComponent
     */
    @Access('AcceptApplications')
    public declineApplication(form: AcceptApplication) {
        /** TODO */ this.createNewComment({ message: form.accept_message, requiresChanges: form.accept_requiresChanges, isPrivate: false });
        this.applicationService.updateStatusOfApplication(Status.DENIED).subscribe(result => {
            this.application.update(result);
            this.callback.emit(result);
            this.overlay.toggle(false);
            this.initAcceptForm();
        });
    }

    /**
     * adds the comment to the current application
     *
     * @param {CommentDto} values
     *
     * @memberOf ModalAcceptApplicationComponent
     */
    public createNewComment(values: CommentDto) {
        const comment: CommentDto = values;
        if (comment.message) {
            this.applicationService.addCommentToApplication(comment).subscribe();
        }
    }

}
