import { Component, OnInit, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import * as _ from 'lodash';

/** Services */
import {
    ApplicationService,
    AuthenticationService,
    PermissionService
} from 'app/core';
import { AlertService } from './../../../modules/alert';

/** Models */
import {
    FieldDto,
    CommentDto,
    ApplicationDetailDto,
    Status
} from './../../../swagger';
import { AcceptApplication } from './../../../models';

/** Decorators */
import { Access, OnAccess } from './../../../shared/decorators/access.decorator';

/** Components */
import { OverlayComponent } from './../../../modules/overlay';

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

    constructor(
        private auth: AuthenticationService,
        private applicationService: ApplicationService,
        public permission: PermissionService,
        public alert: AlertService
    ) { }

    ngOnInit() {

        this.initAcceptForm();
    }

    /**
     * Opens the Modal and sets the given application
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
     */
    public closeModal() {
        this.overlay.toggle(false);
    }

    /**
     * Create the Form to accept/decline the Application
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
     * @description accepts the application (with condition)
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
     * @description declines the application with reasons
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
     * @description adds the comment to the current application
     */
    public createNewComment(values: CommentDto) {
        const comment: CommentDto = values;
        if (comment.message) {
            this.applicationService.addCommentToApplication(comment).subscribe();
        }
    }

}
