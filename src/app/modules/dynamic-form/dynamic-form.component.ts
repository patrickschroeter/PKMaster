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

import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter, OnChanges, HostBinding } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as _ from 'lodash';

import { DynamicFormService, InputValidationService } from './services';

import { FieldDto } from 'app/swagger';

/**
 * DynamicFormComponent
 *
 * @export
 * @class DynamicFormComponent
 * @implements {OnInit}
 * @implements {OnChanges}
 */
@Component({
    selector: 'pk-dynamic-form',
    templateUrl: './dynamic-form.component.html',
    styleUrls: ['./dynamic-form.component.scss'],
    exportAs: 'dynamicForm'
})
export class DynamicFormComponent implements OnInit, OnChanges {

    @HostBinding('class.form') formClass = true;

    @Input() formElements: FieldDto[];
    @Input() formGroup: FormGroup;

    @Output() onChange: EventEmitter<any> = new EventEmitter<any>();

    private _form: FormGroup;
    get form() { return this._form; }
    set form(formGroup: FormGroup) { this._form = formGroup; }

    private _isFormValidationVisible = false;
    get isFormValidationVisible() { return this._isFormValidationVisible; }
    set isFormValidationVisible(isOpen: boolean) { this._isFormValidationVisible = isOpen; }

    /**
     * Creates an instance of DynamicFormComponent.
     *
     * @param {FormBuilder} build
     * @param {InputValidationService} inputValidation
     * @param {DynamicFormService} dynamicForm
     *
     * @memberOf DynamicFormComponent
     */
    constructor(
        private build: FormBuilder,
        private inputValidation: InputValidationService,
        private dynamicForm: DynamicFormService) {
    }

    /**
     * implements OnInit
     *
     * @memberOf DynamicFormComponent
     */
    ngOnInit(): void {
        // this.generateFormFromInput();
    }

    /**
     * Recreate Form on Changes
     *
     * @param {SimpleChanges} changes
     *
     * @memberOf DynamicFormComponent
     */
    ngOnChanges(changes: SimpleChanges): void {
        if (this.formGroup) {
            this.form = this.formGroup;
        } else {
            this.generateFormFromInput();
        }
    }

    /**
     * Generate the Form Object using FormBuilder.
     *
     * @param {FieldDto[]} [input]
     * @returns {void}
     *
     * @memberOf DynamicFormComponent
     */
    private generateFormFromInput(input?: FieldDto[]): void {
        /** Use this.formElements if not Input is given */
        if (!this.formElements) { return; }
        if (!input) { input = this.formElements; }
        if (!input) { throw Error('this.formElements is not defined.'); }

        /** Create new FormGroup from FormElements[] */
        if (this.form) {
            this.dynamicForm.updateFormFromInput(this.form, input);
        } else {
            this.form = this.dynamicForm.generateFormFromInput(input);

            /** Emit Form changes via @Output() */
            this.form.valueChanges.subscribe(() => {
                this.onChange.emit(this.form);
            });
        }
    }

    /**
     * shows the validation of the formgroup
     *
     * @param {FormGroup} form
     *
     * @memberOf DynamicFormComponent
     */
    public showFormValidation(form: FormGroup) {
        // if (this.disabled) { return; } // TODO
        this.isFormValidationVisible = true;
        this.dynamicForm.showValidation(form);
    }

    /**
     * hides the validation of form
     *
     * @memberOf DynamicFormComponent
     */
    public hideFormValidation() {
        this.isFormValidationVisible = false;
    }

}
