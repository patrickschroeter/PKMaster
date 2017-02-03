import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';

import {
    ConferenceService
} from './../../core';
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
     * @description create a new conference from input
     */
    public createConference(form) {
        this.conferenceService.createNewConference(form).subscribe(conference => {
            if (conference['id']) {
                this.router.navigate([`/conferences/`, conference['id'], 'edit']);
            }
        });
    }

}
