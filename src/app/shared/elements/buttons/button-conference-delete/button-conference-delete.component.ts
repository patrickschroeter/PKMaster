import { Component, Input, Output, EventEmitter } from '@angular/core';

/** Services */
import {
    ConferenceService
} from './../../../../core';
import { TranslationService } from './../../../../modules/translation';
import { ModalService } from './../../../../modules/overlay';

/** Models */
import { ConferenceDetailDto } from './../../../../swagger';

@Component({
    selector: 'pk-button-conference-delete',
    templateUrl: './button-conference-delete.component.html'
})
export class ButtonConferenceDeleteComponent {

    @Input() conference: ConferenceDetailDto;
    @Output() success: EventEmitter<ConferenceDetailDto> = new EventEmitter<ConferenceDetailDto>();

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
