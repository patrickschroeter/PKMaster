import { Component, OnInit, Input, ViewChild } from '@angular/core';

/** Services */
import {
    PermissionService
} from 'app/core';
import { AlertService } from 'app/modules/alert';

/** Models */
import { ConferenceConfig } from './../../../models';
import { ApplicationDetailDto, Status } from './../../../swagger';
import { ModalAcceptApplicationComponent } from './../../';

import { Access, OnAccess } from './../../decorators/access.decorator';

@Component({
    selector: 'pk-conference-entry-detail',
    templateUrl: './conference-entry-detail.component.html',
    styleUrls: ['./conference-entry-detail.component.scss']
})
export class ConferenceEntryDetailComponent implements OnInit, OnAccess {

    @ViewChild('acceptModal') acceptModal: ModalAcceptApplicationComponent;

    @Input() index: string;
    @Input() entry: ConferenceConfig;

    public status = Status;

    constructor(
        public permission: PermissionService,
        public alert: AlertService
    ) { }

    ngOnInit() {
    }

    /**
     * ngFor trackByFn
     */
    public trackByFn(index: number, item: any) {
        return index;
    }

    /**
     * select the current application
     */
    @Access('EditApplications')
    public updateApplication(application: ApplicationDetailDto) {
        for (let i = 0; i < this.entry.entries.length; i++) {
            if (this.entry.entries[i].id === application.id) {
                this.entry.entries[i] = application;
            }
        }
    }

}
