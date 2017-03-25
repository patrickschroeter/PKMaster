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

import { Component, Output, EventEmitter } from '@angular/core';

/** Parent */
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

/** Decorators */
import { Access, OnAccess } from './../../../decorators/access.decorator';

/**
 * ButtonApplicationDeactivateComponent
 *
 * @export
 * @class ButtonApplicationDeactivateComponent
 * @extends {Button}
 * @implements {OnAccess}
 */
@Component({
    selector: 'pk-button-application-deactivate',
    templateUrl: './button-application-deactivate.component.html'
})
export class ButtonApplicationDeactivateComponent extends Button implements OnAccess {

    @Output() success: EventEmitter<ApplicationDetailDto> = new EventEmitter<ApplicationDetailDto>();

    public application: ApplicationDetailDto;

    /**
     * Creates an instance of ButtonApplicationDeactivateComponent.
     * @param {ModalService} modalService
     * @param {TranslationService} translationService
     * @param {ApplicationService} applicationService
     * @param {AlertService} alert
     * @param {PermissionService} permission
     *
     * @memberOf ButtonApplicationDeactivateComponent
     */
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
     *
     * @param {ApplicationDetailDto} application
     *
     * @memberOf ButtonApplicationDeactivateComponent
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
     *
     * @private
     * @param {ApplicationDetailDto} application
     *
     * @memberOf ButtonApplicationDeactivateComponent
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
