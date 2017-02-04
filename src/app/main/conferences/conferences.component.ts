import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';

/** Services */
import { ConferenceService } from './../../core';

/** Models */
import { Conference, Field } from './../../swagger';

@Component({
  selector: 'pk-conferences',
  templateUrl: './conferences.component.html',
  styleUrls: ['./conferences.component.scss']
})
export class ConferencesComponent implements OnInit {
    @HostBinding('class') classes = 'content--default';

    public conferences: Conference[];

    public newConference: Field[];

    constructor(
        private conferenceService: ConferenceService,
        private router: Router
    ) { }

    ngOnInit() {
        this.conferenceService.getConferences().subscribe(conferences => {
            this.conferences = conferences;
        });

        this.newConference = this.conferenceService.getConferenceForm();
    }

    /**
     * create a new conference from input
     */
    public createConference(form: Conference): void {
        this.conferenceService.createNewConference(form).subscribe(conference => {
            if (conference['id']) {
                this.router.navigate([`/conferences/`, conference['id'], 'edit']);
            }
        });
    }

    /**
     * clone conference
     */
    public cloneConference(conference: Conference) {
        const param = _.cloneDeep(conference);
        delete param.id;
        param.description = 'Copy of ' + param.description;
        this.createConference(param);
    }

}
