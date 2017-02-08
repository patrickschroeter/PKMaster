import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';

/** Services */
import { ConferenceService } from './../../core';
import { ModalService } from './../../modules/overlay';
import { TranslationService } from './../../modules/translation';

/** Models */
import { ConferenceDto, ConferenceCreateDto, FieldDto } from './../../swagger';

@Component({
  selector: 'pk-conferences',
  templateUrl: './conferences.component.html',
  styleUrls: ['./conferences.component.scss']
})
export class ConferencesComponent implements OnInit {
    @HostBinding('class') classes = 'content--default';

    public conferences: ConferenceDto[];

    public newConference: FieldDto[];

    constructor(
        /** Angular */
        private router: Router,
        /** Modules */
        private modalService: ModalService,
        private translationService: TranslationService,
        /** Services */
        private conferenceService: ConferenceService,
    ) { }

    ngOnInit() {
        this.conferenceService.getConferences().subscribe(conferences => {
            this.conferences = conferences;
        });

        this.newConference = this.conferenceService.getConferenceForm();
    }

    /**
     * create a new conference from input
     * @param {Conference} form
     */
    public createConference(form: ConferenceCreateDto): void {
        this.conferenceService.createNewConference(form).subscribe(conference => {
            if (conference['id']) {
                this.router.navigate([`/conferences/`, conference['id'], 'edit']);
            }
        });
    }

    /**
     * clone conference
     * @param {Conference} conference
     */
    public cloneConference(conference: ConferenceCreateDto) {
        const param = _.cloneDeep(conference);
        param.description = 'Copy of ' + param.description;
        this.createConference(param);
    }

    /**
     * Delete the conference
     * @param {Conference} conference
     */
     public deleteConference(conference: ConferenceDto) {
        this.modalService.createConfirmationModal({
            title: this.translationService.translate('confirmDeleteConferenceHeader'),
            message: this.translationService.translate('confirmDeleteConferenceContent'),
            confirm: () => {
                this.conferenceService.removeConference(conference.id).subscribe(result => {
                    const index = _.findIndex(this.conferences, obj => obj.id === conference.id);
                    if (result && index !== -1) {
                        this.conferences.splice(index, 1);
                    }
                    this.modalService.destroyModal();
                });
            }
        });
     }
}
