import { Component, OnInit, HostBinding } from '@angular/core';

import {
    ConferenceService
} from './../../core';
import { Conference } from './../../swagger';

@Component({
  selector: 'pk-conferences',
  templateUrl: './conferences.component.html',
  styleUrls: ['./conferences.component.scss']
})
export class ConferencesComponent implements OnInit {
    @HostBinding('class') classes = 'content--default';

    public conferences: Conference[];

    constructor(
        private conferenceService: ConferenceService
    ) { }

    ngOnInit() {
        this.conferenceService.getConferences().subscribe(conferences => {
            this.conferences = conferences;
        })
    }
}
