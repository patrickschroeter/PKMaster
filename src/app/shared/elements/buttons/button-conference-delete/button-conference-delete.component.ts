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

import { Component, Input, Output, EventEmitter } from '@angular/core';

/** Services */
import {
    ConferenceService
} from 'app/core';
import { TranslationService } from 'app/modules/translation';
import { ModalService } from 'app/modules/overlay';

/** Models */
import { ConferenceDetailDto } from 'app/swagger';

/**
 * ButtonConferenceDeleteComponent
 *
 * @export
 * @class ButtonConferenceDeleteComponent
 */
@Component({
    selector: 'pk-button-conference-delete',
    templateUrl: './button-conference-delete.component.html'
})
export class ButtonConferenceDeleteComponent {

    @Input() conference: ConferenceDetailDto;
    @Output() success: EventEmitter<ConferenceDetailDto> = new EventEmitter<ConferenceDetailDto>();

    /**
     * Creates an instance of ButtonConferenceDeleteComponent.
     * @param {ModalService} modalService
     * @param {TranslationService} translationService
     * @param {ConferenceService} conferenceService
     *
     * @memberOf ButtonConferenceDeleteComponent
     */
    constructor(
        private modalService: ModalService,
        private translationService: TranslationService,
        private conferenceService: ConferenceService
    ) {}

    /**
     * Delete the conference
     *
     * @param {ConferenceDto} conference
     *
     * @memberOf ConferencesComponent
     */
    public deleteConference() {
        const conference: ConferenceDetailDto = this.conference;
        this.modalService.createConfirmationModal({
            title: this.translationService.translate('confirmDeleteConferenceHeader'),
            message: this.translationService.translate('confirmDeleteConferenceContent'),
            confirm: () => {
                this.conferenceService.removeConference(conference.id).subscribe((result: string) => {
                    this.modalService.destroyModal();
                    this.success.emit(conference);
                });
            }
        });
    }

}
