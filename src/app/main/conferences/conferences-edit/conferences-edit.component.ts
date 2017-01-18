import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ConferenceService } from './../../../core';
import { AlertService } from './../../../modules/alert';

import { Conference } from './../../../swagger';

@Component({
    selector: 'pk-conferences-edit',
    templateUrl: './conferences-edit.component.html',
    styleUrls: ['./conferences-edit.component.scss']
})
export class ConferencesEditComponent implements OnInit {
    @HostBinding('class') classes = 'content--default';

    public conference: Conference;

    constructor(
        private activatedRoute: ActivatedRoute,
        private conferenceService: ConferenceService,
        private router: Router,
        private alert: AlertService
    ) { }

    ngOnInit() {

        /** Read Route Param and GET conference with param ID */
        this.activatedRoute.params.forEach((params: Params) => {
            this.conferenceService.getConferenceById(params['id']).subscribe(conference => {
                if (!conference) {
                    return this.onError(params['id']);
                } else {
                    this.conference = conference;
                }
            }, error => {
                console.error(error);
                return this.onError(params['id']);
            });
        });

    }

    private onError(id: string) {
        this.router.navigate(['/conferences']);
        this.alert.setErrorHint('no-conference-found', `The is no conference with the requested Id: ${id}`, 2000);
    }

    public deleteConference() {
        console.error('TODO');
    }

}
