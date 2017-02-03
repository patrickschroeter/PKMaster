import { Component, OnInit, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import * as _ from 'lodash';

/** Services */
import {
    ApplicationService,
    AuthenticationService,
    PermissionService
} from './../../../core';

/** Models */
import { Field, Comment, Application } from './../../../swagger';

/** Decorators */
import { Access } from './../../../shared';

/** Components */
import { OverlayComponent } from './../../../modules/overlay';

@Component({
    selector: 'pk-modal-accept-application',
    templateUrl: './modal-accept-application.component.html',
    styleUrls: ['./modal-accept-application.component.scss'],
    exportAs: 'acceptModal'
})
export class ModalAcceptApplicationComponent implements OnInit {

    @ViewChild('overlay') overlay: OverlayComponent;

    @Output() change: EventEmitter<Application> = new EventEmitter();

    public acceptForm: Field[];

    public application: Application;

    constructor(
        private auth: AuthenticationService,
        private applicationService: ApplicationService,
        private permission: PermissionService
    ) { }

    ngOnInit() {

        this.initAcceptForm();
    }

    /**
     * Opens the Modal and sets the given application
     */
    public openModal(application: Application): void {
        this.application = application;
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
                styles: [
                    'small'
                ]
            }
        ];
    }

    /**
     * @description accepts the application (with condition)
     */
    @Access('EditApplications')
    public acceptApplication(form) {
        /** TODO */ this.createNewComment({ message: form.accept_message, requiresChanges: form.accept_requiresChanges, isPrivate: false });
        /** TODO */ const param = _.cloneDeep(this.application);
        /** TODO */ param.status = { name: 'accepted' };
        this.applicationService.updateApplication(param).subscribe(result => {
            this.application = result;
            this.change.emit(result);
            this.overlay.toggle(false);
            this.initAcceptForm();
        });
    }

    /**
     * @description declines the application with reasons
     */
    @Access('EditApplications')
    public declineApplication(form) {
        /** TODO */ this.createNewComment({ message: form.accept_message, requiresChanges: form.accept_requiresChanges, isPrivate: false });
        /** TODO */ const param = _.cloneDeep(this.application);
        /** TODO */ param.status = { name: 'denied' };
        this.applicationService.updateApplication(param).subscribe(result => {
            this.application = result;
            this.change.emit(result);
            this.overlay.toggle(false);
            this.initAcceptForm();
        });
    }

    /**
     * @description adds the comment to the current application
     */
    public createNewComment(values: Comment) {
        const comment: Comment = values;
        comment.created = new Date();
        this.auth.getUser().subscribe(user => {
            comment.user = user;
            comment.userId = user.id;
            // TODO: send to server
            if (!this.application.comments) {
                this.application.comments = [];
            }
            setTimeout(() => {
                this.application.comments.push(comment);
            }, 500);
        });
    }

}
