import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';

/** Models */
import { Field } from './../../../swagger';
import { ConferenceConfig } from './../../../models';

/** Services */
import { AlertService } from './../../../modules/alert';
import { TranslationService } from './../../../modules/translation';

/** Components */
import { OverlayComponent } from './../../../modules/overlay';

@Component({
  selector: 'pk-modal-add-conference-entry',
  templateUrl: './modal-add-conference-entry.component.html',
  styleUrls: ['./modal-add-conference-entry.component.scss'],
  exportAs: 'addEntryOverlay'
})
export class ModalAddConferenceEntryComponent implements OnInit {

    @ViewChild('overlay') overlay: OverlayComponent;

    @Output() save: EventEmitter<ConferenceConfig<any>> = new EventEmitter();

    public newEntry: Field[];

    constructor(
        private alert: AlertService,
        private translationService: TranslationService
    ) { }

    ngOnInit() {
        this.initNewEntryForm();
    }

    /**
     * reset the form and open the overlay
     */
    public open() {
        this.initNewEntryForm();
        this.overlay.toggle();
    }

    /**
     * init the new entry form
     */
    private initNewEntryForm() {
        this.newEntry = [
            {
                fieldType: 'input',
                name: 'title',
                label: this.translationService.translate('title'),
                required: true
            },
            {
                fieldType: 'textarea',
                name: 'description',
                label: this.translationService.translate('description'),
                styles: [
                    'small'
                ]
            },
            {
                fieldType: 'textarea',
                name: 'footer',
                label: this.translationService.translate('footer'),
                styles: [
                    'small'
                ]
            },
            {
                fieldType: 'radio',
                name: 'type',
                label: this.translationService.translate('conferenceEntryType'),
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
        this.save.emit(entry);
        this.open();
    }
}

