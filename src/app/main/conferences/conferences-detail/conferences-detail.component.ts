import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import {
    ConferenceService
} from './../../../core';
import { Conference } from './../../../swagger';

@Component({
    selector: 'pk-conferences-detail',
    templateUrl: './conferences-detail.component.html',
    styleUrls: ['./conferences-detail.component.scss']
})
export class ConferencesDetailComponent implements OnInit {
    @HostBinding('class') classes = 'content--default';

    public conference: Conference;

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private conferenceService: ConferenceService
    ) { }

    ngOnInit() {
        /** Read Route Param and GET Application with param ID */
        this.activatedRoute.params.forEach((params: Params) => {
            this.conferenceService.getConferenceById(params['id']).subscribe(conference => {
                if (!conference) { return this.router.navigate(['/conferences']); };
                this.conference = conference;
            }, error => {
                console.error(error);
                this.router.navigate(['/conferences']);
            });
        });
    }

}
