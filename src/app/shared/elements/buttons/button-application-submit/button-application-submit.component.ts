import { Component } from '@angular/core';

/** Parent */
import { Button } from './../button.class';

/** Services */
import {
    ApplicationService,
    PermissionService
} from './../../../../core';
import { AlertService } from './../../../../modules/alert';
import { TranslationService } from './../../../../modules/translation';
import { ModalService } from './../../../../modules/overlay';

/** Models */
import { ApplicationDetailDto } from './../../../../swagger';

/** Decorators */
import { Access, OnAccess } from './../../../decorators/access.decorator';

@Component({
    selector: 'pk-button-application-submit',
    templateUrl: './button-application-submit.component.html'
})
export class ButtonApplicationSubmitComponent extends Button implements OnAccess {

    public application: ApplicationDetailDto;

    constructor(
        public permission: PermissionService,
        public alert: AlertService,
        private modalService: ModalService,
        private translationService: TranslationService,
        private applicationService: ApplicationService
    ) {
        super();
    }

    /**
     * Creates a confirmation modal to confirm submitting the selected application
     * TODO: Prevent submit foreign application with Create & Read permission
     */
    @Access(['CreateApplications', 'EditApplications'])
    public submitApplicationModal(application: ApplicationDetailDto): void {
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
    private submitApplication(application: ApplicationDetailDto): void {
        this.applicationService.submitApplication(application).subscribe(result => {
            application.update(result);
            this.alert.setSuccessHint(`submitApplication${application.id}`, this.translationService.translate('applicationSubmitted'));
            this.modalService.destroyModal();
        });
    }

}
