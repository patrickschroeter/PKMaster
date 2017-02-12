import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';

/** Services */
import {
    ApplicationService,
    FormService,
    PermissionService,
    AuthenticationService
} from './../../../core';
import { AlertService } from './../../../modules/alert';
import { TranslationService } from './../../../modules/translation';
import { ModalService } from './../../../modules/overlay';

/** Models */
import { ApplicationDto, UserDto } from './../../../swagger';
import { Selectable } from './../../../models';

/** Decorators */
import { Access } from './../../../shared/decorators/access.decorator';

@Component({
    selector: 'pk-applications-list',
    templateUrl: './applications-list.component.html',
    styleUrls: ['./applications-list.component.scss']
})
export class ApplicationsListComponent implements OnInit {

    @Input() applications: ApplicationDto[];
    @Input() user: UserDto;

    constructor(
        private modalService: ModalService,
        private translationService: TranslationService,
        private applicationService: ApplicationService,
        private alert: AlertService,
        private permission: PermissionService
    ) { }

    ngOnInit() {
    }

    /**
     * update the application in the applications list
     * @param {Application} application
     */
    private updateApplication(application: ApplicationDto): void {
        const index = _.findIndex(this.applications, obj => obj.id === application.id);
        if (index !== -1) {
            this.applications[index] = application;
        }
    }

    /**
     * Creates a confirmation modal to confirm deactivating the selected application
     * TODO: Prevent deactivate foreign application with Create & Read permission
     */
    @Access(['CreateApplications', 'DeactivateApplications'])
    public deactivateApplicationModal(application: ApplicationDto): void {
        this.modalService.createConfirmationModal({
            title: this.translationService.translate('confirmDeactivateApplicationHeader'),
            message: this.translationService.translate('confirmDeactivateApplicationContent'),
            confirm: () => {
                this.deactivateApplication(application);
            }
        });
    }

    /**
     * Deactivate the selected application
     * TODO: Prevent deactivate foreign application with Create & Read permission
     */
    @Access(['CreateApplications', 'DeactivateApplications'])
    private deactivateApplication(application: ApplicationDto): void {
        this.applicationService.deactivateApplication(application).subscribe(result => {
            this.updateApplication(result);
            this.alert.setSuccessHint(`deactivateApplication${application.id}`,
                this.translationService.translate('applicationDeactivated')
            );
            this.modalService.destroyModal();
        });
    }

    /**
     * Creates a confirmation modal to confirm rescinding the selected application
     * TODO: Prevent rescind foreign application with Create & Read permission
     */
    @Access(['CreateApplications', 'EditApplications'])
    public rescindApplicationModal(application: ApplicationDto): void {
        this.modalService.createConfirmationModal({
            title: this.translationService.translate('confirmRescindApplicationHeader'),
            message: this.translationService.translate('confirmRescindApplicationContent'),
            confirm: () => {
                this.rescindApplication(application);
            }
        });
    }

    /**
     * Rescind the selected application
     * TODO: Prevent rescind foreign application with Create & Read permission
     */
    @Access(['CreateApplications', 'EditApplications'])
    private rescindApplication(application: ApplicationDto): void {
        this.applicationService.rescindApplication(application).subscribe(result => {
            this.updateApplication(result);
            this.alert.setSuccessHint(`rescindApplication${application.id}`, this.translationService.translate('applicationRescinded'));
            this.modalService.destroyModal();
        });
    }

    /**
     * Creates a confirmation modal to confirm submitting the selected application
     * TODO: Prevent submit foreign application with Create & Read permission
     */
    @Access(['CreateApplications', 'EditApplications'])
    public submitApplicationModal(application: ApplicationDto): void {
        this.modalService.createConfirmationModal({
            title: this.translationService.translate('confirmSubmitApplicationHeader'),
            message: this.translationService.translate('confirmSubmitApplicationContent'),
            confirm: () => {
                this.submitApplication(application);
            }
        });
    }

    /**
     * Submit the selected application
     * TODO: Prevent submit foreign application with Create & Read permission
     */
    @Access(['CreateApplications', 'EditApplications'])
    private submitApplication(application: ApplicationDto): void {
        this.applicationService.submitApplication(application).subscribe(result => {
            this.updateApplication(result);
            this.alert.setSuccessHint(`submitApplication${application.id}`, this.translationService.translate('applicationSubmitted'));
            this.modalService.destroyModal();
        });
    }

    /**
     * open the confirm dialog for the validation
     * @param {Application} application
     */
    public validateApplication(application: ApplicationDto): void {
        this.modalService.createConfirmationModal({
            title: this.translationService.translate('confirmValidateApplicationHeader'),
            message: this.translationService.translate('confirmValidateApplicationHeader'),
            confirm: () => {
                this.applicationService.confirmApplication(true, application).subscribe(result => {
                    this.updateApplication(result);
                    this.modalService.destroyModal();
                });
            },
            cancel: () => {
                this.applicationService.confirmApplication(false, application).subscribe(result => {
                    this.updateApplication(result);
                    this.modalService.destroyModal();
                });
            },
            confirmText: this.translationService.translate('confirmValidateApplicationSave'),
            cancelText: this.translationService.translate('confirmValidateApplicationCancel')
        });
    }

}

@Component({
    selector: 'pk-applications-list-owned',
    templateUrl: './applications-list-owned.component.html'
})
export class ApplicationsListOwnedComponent extends ApplicationsListComponent {

    public validateApplication(application: ApplicationDto): void {
        super.validateApplication(application);
    }

}

@Component({
    selector: 'pk-applications-list-assigned',
    templateUrl: './applications-list-assigned.component.html'
})
export class ApplicationsListAssignedComponent extends ApplicationsListComponent {

    public deactivateApplicationModal(application: ApplicationDto): void {
        super.deactivateApplicationModal(application);
    }

    public submitApplicationModal(application: ApplicationDto): void {
        super.submitApplicationModal(application);
    }

    public rescindApplicationModal(application: ApplicationDto): void {
        super.rescindApplicationModal(application);
    }

}
