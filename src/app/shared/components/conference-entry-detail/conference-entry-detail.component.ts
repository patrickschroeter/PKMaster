import { Component, OnInit, Input } from '@angular/core';

/** Models */
import { ConferenceConfig } from './../../../models';

@Component({
    selector: 'pk-conference-entry-detail',
    templateUrl: './conference-entry-detail.component.html',
    styleUrls: ['./conference-entry-detail.component.scss']
})
export class ConferenceEntryDetailComponent implements OnInit {

    @Input() index: string;
    @Input() entry: ConferenceConfig<any>;

    constructor() { }

    ngOnInit() {
    }

    /**
     * ngFor trackByFn
     */
    public trackByFn(index, item) {
        return index;
    }

}
