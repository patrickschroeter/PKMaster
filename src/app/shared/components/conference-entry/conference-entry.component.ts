import { Component, OnInit, Input } from '@angular/core';

/** Models */
import { ConferenceConfig } from './../../../models';
import { Application } from './../../../swagger';

@Component({
    selector: 'pk-conference-entry',
    templateUrl: './conference-entry.component.html',
    styleUrls: ['./conference-entry.component.scss']
})
export class ConferenceEntryComponent implements OnInit {

    @Input() index: string;
    @Input() config: ConferenceConfig<Application>;

    constructor() { }

    ngOnInit() {
    }

}
