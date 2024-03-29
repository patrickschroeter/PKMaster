/**
 *
 * @author Patrick Schröter <patrick.schroeter@hotmail.de>
 *
 * @license CreativeCommons BY-NC-SA 4.0 2017
 *
 * This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/.
 *
 */

import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';

/** Services */
import { AlertService } from 'app/modules/alert';
import { TranslationService } from 'app/modules/translation';

/** Models */
import { FieldDto } from 'app/swagger';
import { ConferenceConfig, Window } from 'app/models';

/** Components */
import { OverlayComponent } from 'app/modules/overlay';

/**
 * ModalAddConferenceEntryComponent
 *
 * @export
 * @class ModalAddConferenceEntryComponent
 * @implements {OnInit}
 * @implements {Window}
 */
@Component({
  selector: 'pk-modal-add-conference-entry',
  templateUrl: './modal-add-conference-entry.component.html',
  styleUrls: ['./modal-add-conference-entry.component.scss'],
  exportAs: 'addEntryModal'
})
export class ModalAddConferenceEntryComponent implements OnInit, Window {

    @ViewChild('overlay') overlay: OverlayComponent;

    public save: Function;

    public newEntry: FieldDto[];

    /**
     * Creates an instance of ModalAddConferenceEntryComponent.
     * @param {AlertService} alert
     * @param {TranslationService} translationService
     *
     * @memberOf ModalAddConferenceEntryComponent
     */
    constructor(
        private alert: AlertService,
        private translationService: TranslationService
    ) { }

    /**
     * implements OnInit
     *
     * @memberOf ModalAddConferenceEntryComponent
     */
    ngOnInit() {
        this.initEntryForm();
    }

    /**
     * reset the form and open the overlay
     *
     * @param {{
     *         values: ConferenceConfig
     *     }} options
     *
     * @memberOf ModalAddConferenceEntryComponent
     */
    public open(options: {
        values: ConferenceConfig
    }) {
        this.initEntryForm(options ? options.values : null);
        this.overlay.toggle();
    }

    /**
     * init the new entry form
     *
     * @private
     * @param {ConferenceConfig} [values]
     *
     * @memberOf ModalAddConferenceEntryComponent
     */
    private initEntryForm(values?: ConferenceConfig) {
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
                styleIds: [
                    'small'
                ]
            },
            {
                fieldType: 'textarea',
                name: 'footer',
                label: this.translationService.translate('footer'),
                value: values ? values.footer : '',
                styleIds: [
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
                        value: 'list',
                        label: this.translationService.translate('conferenceElementList')
                    }
                ]
            }
        ];
    }

    /**
     * emit the save event of the component
     *
     * @param {ConferenceConfig} entry
     *
     * @memberOf ModalAddConferenceEntryComponent
     */
    public addNewEntry(entry: ConferenceConfig) {
        if (this.save) {
            this.save(entry);
        }
        this.overlay.toggle(false);
    }
}

