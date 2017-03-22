import { Component } from '@angular/core';

import { Button } from './../button.class';

/** Services */
import {
    ApplicationService,
    PermissionService
} from 'app/core';
import { AlertService } from 'app/modules/alert';
import { TranslationService } from 'app/modules/translation';
import { ModalService } from 'app/modules/overlay';

/** Models */
import { ApplicationDetailDto } from 'app/swagger';

@Component({
    selector: 'pk-button-application-validate',
    templateUrl: './button-application-validate.component.html'
})
export class ButtonApplicationValidateComponent extends Button {

    public application: ApplicationDetailDto;

    constructor(
        private modalService: ModalService,
        private translationService: TranslationService,
        private applicationService: ApplicationService
    ) {
        super();
    }

    /**
     * open the confirm dialog for the validation
     * @param {Application} application
     */
    public validateApplication(application: ApplicationDetailDto): void {
        this.modalService.createConfirmationModal({
            title: this.translationService.translate('confirmValidateApplicationHeader'),
            message: this.translationService.translate('confirmValidateApplicationHeader'),
            confirm: () => {
                this.applicationService.confirmApplication(true, application).subscribe(result => {
                    application.update(result);
                    this.modalService.destroyModal();
                });
            },
            cancel: () => {
                this.applicationService.confirmApplication(false, application).subscribe(result => {
                    application.update(result);
                    this.modalService.destroyModal();
                });
            },
            confirmText: this.translationService.translate('confirmValidateApplicationSave'),
            cancelText: this.translationService.translate('confirmValidateApplicationCancel')
        });
    }

}
