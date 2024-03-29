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

import { Component } from '@angular/core';

/** Parent */
import { Button } from './../button.class';

/** Services */
import { ApplicationService } from 'app/core';
import { AlertService } from 'app/modules/alert';
import { TranslationService } from 'app/modules/translation';
import { ModalService } from 'app/modules/overlay';

/** Models */
import { ApplicationDetailDto } from 'app/swagger';

/**
 * ButtonApplicationRescindComponent
 *
 * @export
 * @class ButtonApplicationRescindComponent
 * @extends {Button}
 */
@Component({
  selector: 'pk-button-application-rescind',
  templateUrl: './button-application-rescind.component.html'
})
export class ButtonApplicationRescindComponent extends Button {

    public application: ApplicationDetailDto;

    constructor(
        private modalService: ModalService,
        private translationService: TranslationService,
        private applicationService: ApplicationService,
        private alert: AlertService
    ) {
        super();
    }

    /**
     * Creates a confirmation modal to confirm rescinding the selected application
     *
     * @param {ApplicationDetailDto} application
     *
     * @memberOf ApplicationsDetailComponent
     */
    public rescindApplicationModal(application: ApplicationDetailDto): void {
        this.modalService.createConfirmationModal({
            title: this.translationService.translate('confirmRescindApplicationHeader'),
            message: this.translationService.translate('confirmRescindApplicationContent'),
            confirm: () => {
                this.rescindApplication(application);
            }
        });
    }

    /**
     * Rescingd the selected application
     *
     * @private
     * @param {ApplicationDetailDto} application
     *
     * @memberOf ApplicationsDetailComponent
     */
    private rescindApplication(application: ApplicationDetailDto): void {
        this.applicationService.rescindApplication(application).subscribe(result => {
            this.alert.setSuccessHint(
                `rescindApplication${application.id}`,
                this.translationService.translate('applicationRescinded')
            );
            application.update(result);
            this.modalService.destroyModal();
        });
    }

}
