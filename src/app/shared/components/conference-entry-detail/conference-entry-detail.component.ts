import { Component, OnInit, Input, ViewChild } from '@angular/core';

/** Models */
import { ConferenceConfig } from './../../../models';
import { ApplicationDto } from './../../../swagger';
import { ModalAcceptApplicationComponent } from './../../';

@Component({
    selector: 'pk-conference-entry-detail',
    templateUrl: './conference-entry-detail.component.html',
    styleUrls: ['./conference-entry-detail.component.scss']
})
export class ConferenceEntryDetailComponent implements OnInit {

    @ViewChild('acceptModal') acceptModal: ModalAcceptApplicationComponent;

    @Input() index: string;
    @Input() entry: ConferenceConfig;

    constructor() { }

    ngOnInit() {
    }

    /**
     * ngFor trackByFn
     */
    public trackByFn(index, item) {
        return index;
    }

    /**
     * select the current application
     */
    public updateApplication(application: ApplicationDto) {
        for (let i = 0, length = this.entry.entries.length; i < length; i++) {
            if (this.entry.entries[i].id === application.id) {
                this.entry.entries[i] = application;
            }
        }
    }

}
