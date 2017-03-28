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

import { Component, Input } from '@angular/core';

/** Services */
import { FormService } from 'app/core';
import { ModalService } from 'app/modules/overlay';
import { TranslationService } from 'app/modules/translation';

/** Models */
import { ConferenceConfig, Selectable } from 'app/models';

/**
 * ConferenceEntryApplicationComponent
 *
 * @export
 * @class ConferenceEntryApplicationComponent
 */
@Component({
    selector: 'pk-conference-entry-application',
    templateUrl: './conference-entry-application.component.html',
    styleUrls: ['./conference-entry-application.component.scss']
})
export class ConferenceEntryApplicationComponent {

    @Input() entry: ConferenceConfig;
    @Input() forms: Selectable[];

    private cachedFormLabel: string;
    private cachedFormId: string;

    /**
     * Creates an instance of ConferenceEntryApplicationComponent.
     * @param {FormService} formService
     * @param {ModalService} modalService
     * @param {TranslationService} translationService
     *
     * @memberOf ConferenceEntryApplicationComponent
     */
    constructor(
        private formService: FormService,
        private modalService: ModalService,
        private translationService: TranslationService
    ) { }

    /**
     * edit the displayed form fields
     *
     * @returns
     *
     * @memberOf ConferenceEntryApplicationComponent
     */
    public editFormFields() {
        if (!this.entry.formId) { return; }
        this.formService.getFormById(this.entry.formId).subscribe(result => {
            console.log(result);
            const fields: Selectable[] = [];
            for (let i = 0; i < result.formHasField.length; i++) {
                const field = result.formHasField[i];
                fields.push(new Selectable(field.name, field.name));
            }
            this.modalService.createListModal({
                title: this.translationService.translate('editFormFieldsHeader'),
                list: fields,
                click: this.toggleFormField.bind(this),

                emptyText: this.translationService.translate('editFormFieldsEmpty'),
                selectedValues: this.entry.fields
            });
        });
    }

    /**
     * set/remove the selected element from the displayed fields
     *
     * @param {Selectable} element
     *
     * @memberOf ConferenceEntryApplicationComponent
     */
    public toggleFormField(element: Selectable): void {
        if (!this.entry.fields) {
            this.entry.fields = [];
        }
        const fields = this.entry.fields;
        let index = -1;
        for (let i = 0; i < fields.length; i++) {
            const field = fields[i];
            if (field === element.value) {
                index = i;
            }
        }
        if (index === -1) {
            fields.push(element.value);
        } else {
            fields.splice(index, 1);
        }
        this.modalService.updateSelectedValues(fields);
    }

    /**
     * gets the label of the form with the given id
     * TODO: Known bug if id belongs to a form that !isCurrent -> no label to displayed
     *
     * @param {string} id
     * @returns {string}
     *
     * @memberOf ConferenceEntryApplicationComponent
     */
    public getLabelOfForm(id: string): string {
        if (this.cachedFormLabel && this.cachedFormId === id) { return this.cachedFormLabel; }
        if (!this.forms) { return this.cachedFormLabel; }
        for (let i = 0; i < this.forms.length; i++) {
            const form = this.forms[i];
            if (form.value === id) {
                this.cachedFormId = id;
                return this.cachedFormLabel = form.label;
            }
        }
        return this.cachedFormLabel;
    }

}
