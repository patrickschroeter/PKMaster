import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';

/** Services */
import { AlertService } from './../../../modules/alert';
import { TranslationService } from './../../../modules/translation';

/** Models */
import { Field } from './../../../swagger';
import { ConferenceConfig } from './../../../models';

/** Components */
import { OverlayComponent } from './../../../modules/overlay';

/** Interfaces */
import { Window } from './../../';

@Component({
  selector: 'pk-modal-add-conference-entry',
  templateUrl: './modal-add-conference-entry.component.html',
  styleUrls: ['./modal-add-conference-entry.component.scss'],
  exportAs: 'addEntryModal'
})
export class ModalAddConferenceEntryComponent implements OnInit, Window {

    @ViewChild('overlay') overlay: OverlayComponent;

    public save: Function;

    public newEntry: Field[];

    constructor(
        private alert: AlertService,
        private translationService: TranslationService
    ) { }

    ngOnInit() {
        this.initEntryForm();
    }

    /**
     * reset the form and open the overlay
     * @param {Object} options
     * @param {ConferenceConfig} options.[values]
     */
    public open(options: {
        values: ConferenceConfig<any>
    }) {
        this.initEntryForm(options ? options.values : null);
        this.overlay.toggle();
    }

    /**
     * init the new entry form
     * @param {ConferenceConfig} values
     */
    private initEntryForm(values?: ConferenceConfig<any>) {
        this.newEntry = [
            {
                fieldType: 'input',
                name: 'title',
                label: this.translationService.translate('title'),
                required: true,
                value: values ? values.title : ''
            },
            {
                fieldType: 'textarea',
                name: 'description',
                label: this.translationService.translate('description'),
                value: values ? values.description : '',
                styles: [
                    'small'
                ]
            },
            {
                fieldType: 'textarea',
                name: 'footer',
                label: this.translationService.translate('footer'),
                value: values ? values.footer : '',
                styles: [
                    'small'
                ]
            },
            {
                fieldType: 'radio',
                name: 'type',
                label: this.translationService.translate('conferenceEntryType'),
                value: values ? values.type : '',
                options: [
                    {
                        value: 'config',
                        label: this.translationService.translate('conferenceElementConfig')
                    },
                    {
                        value: 'application',
                        label: this.translationService.translate('conferenceElementApplication')
                    },
                    {
                        value: 'table',
                        label: this.translationService.translate('conferenceElementTable')
                    }
                ]
            }
        ];
    }

    /**
     * emit the save event of the component
     * @param {ConferenceConfig} entry
     */
    public addNewEntry(entry: ConferenceConfig<any>) {
        if (this.save) {
            this.save(entry);
        }
        this.overlay.toggle(false);
    }
}

