import { Component, OnInit, Input } from '@angular/core';

/** Models */
import { ConferenceConfig, Selectable } from './../../../models';

@Component({
    selector: 'pk-conference-entry-application',
    templateUrl: './conference-entry-application.component.html',
    styleUrls: ['./conference-entry-application.component.scss']
})
export class ConferenceEntryApplicationComponent implements OnInit {

    @Input() entry: ConferenceConfig<any>;
    @Input() forms: Selectable[];

    private cachedFormLabel: string;
    private cachedFormId: string;

    constructor() { }

    ngOnInit() {
    }

    /**
     * edit the displayed form fields
     */
    public editFormFields() {
        console.error('TODO');
    }

    /**
     * gets the label of the form with the given id
     * @param {String} id
     */
    public getLabelOfForm(id: string): string {
        if (this.cachedFormLabel && this.cachedFormId === id) { return this.cachedFormLabel; }
        if (!this.forms) { return this.cachedFormLabel; }
        for (let i = 0, length = this.forms.length; i < length; i++) {
            const form = this.forms[i];
            if (form.value === id) {
                this.cachedFormId = id;
                return this.cachedFormLabel = form.label;
            }
        }
        return this.cachedFormLabel;
    }

}
