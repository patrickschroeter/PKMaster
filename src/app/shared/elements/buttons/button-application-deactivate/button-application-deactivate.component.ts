import { Component, Output, EventEmitter } from '@angular/core';

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
    selector: 'pk-button-application-deactivate',
    templateUrl: './button-application-deactivate.component.html'
})
export class ButtonApplicationDeactivateComponent extends Button implements OnAccess {

    @Output() success: EventEmitter<ApplicationDetailDto> = new EventEmitter<ApplicationDetailDto>();

    public application: ApplicationDetailDto;

    constructor(
        private modalService: ModalService,
        private translationService: TranslationService,
        private applicationService: ApplicationService,
        public alert: AlertService,
        public permission: PermissionService
    ) {
        super();
    }

    /**
     * Creates a confirmation modal to confirm deactivating the selected application
     * TODO: Prevent deactivate foreign application with Create & Read permission
     */
    @Access(['CreateApplications', 'DeactivateApplications'])
    public deactivateApplicationModal(application: ApplicationDetailDto): void {
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
    private deactivateApplication(application: ApplicationDetailDto): void {
        this.applicationService.deactivateApplication(application).subscribe(result => {
            application.update(result);
            this.alert.setSuccessHint(`deactivateApplication${application.id}`,
                this.translationService.translate('applicationDeactivated')
            );
            this.modalService.destroyModal();
            this.success.emit(application);
        });
    }

}
