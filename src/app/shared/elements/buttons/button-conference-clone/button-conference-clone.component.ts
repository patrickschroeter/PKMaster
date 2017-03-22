import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

/** Services */
import {
    ConferenceService
} from 'app/core';
import { TranslationService } from 'app/modules/translation';
import { ModalService } from 'app/modules/overlay';

/** Models */
import {
    ConferenceDetailDto,
    ConferenceListDto,
    ConferenceCreateDto
} from 'app/swagger';

@Component({
    selector: 'pk-button-conference-clone',
    templateUrl: './button-conference-clone.component.html'
})
export class ButtonConferenceCloneComponent {

    @Input() conference: ConferenceDetailDto;

    constructor(
        private conferenceService: ConferenceService,
        private router: Router
    ) { }

    /**
     * clone conference
     *
     * @param {ConferenceCreateDto} conference
     *
     * @memberOf ConferencesComponent
     */
    public cloneConference() {
        const conference: ConferenceDetailDto = this.conference;
        this.conferenceService.getConferenceById(conference.id).subscribe((result: ConferenceDetailDto) => {
            result.description = 'Copy of ' + result.description;
            this.createConference(result);
        });
    }

    /**
     * create a new conference from input
     *
     * @param {ConferenceCreateDto} form
     *
     * @memberOf ConferencesComponent
     */
    private createConference(form: ConferenceCreateDto): void {
        this.conferenceService.createNewConference(form).subscribe((conference: ConferenceDetailDto) => {
            this.router.navigate([`/conferences/`, conference.id, 'edit']);
        });
    }

}
