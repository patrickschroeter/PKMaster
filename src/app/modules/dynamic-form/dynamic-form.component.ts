import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter, OnChanges, HostBinding } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { DynamicFormService, InputValidationService } from './services';

import { FieldDto } from './../../swagger';

/**
 *
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

    /**
     * Default Layout class
     *
     * @memberOf DynamicFormComponent
     */
    @HostBinding('class.form') formClass = true;

    /**
     * Input: Array of Fields
     *
     * @type {FieldDto[]}
     * @memberOf DynamicFormComponent
     */
    @Input() formElements: FieldDto[];

    /**
     * Input: The FormGroup
     *
     * @type {FormGroup}
     * @memberOf DynamicFormComponent
     */
    @Input() formGroup: FormGroup;

    /**
     * Emitter for Changes
     *
     * @type {EventEmitter<any>}
     * @memberOf DynamicFormComponent
     */
    @Output() onChange: EventEmitter<any> = new EventEmitter<any>();

    /**
     * the FormGroup
     *
     * @private
     * @type {FormGroup}
     * @memberOf DynamicFormComponent
     */
    private _form: FormGroup;

    /**
     * get FormGroup
     *
     * @memberOf DynamicFormComponent
     */
    get form() { return this._form; }

    /**
     * set FormGroup
     *
     * @memberOf DynamicFormComponent
     */
    set form(formGroup: FormGroup) { this._form = formGroup; }

    /**
     * Flag to display the form validation on hover
     *
     * @private
     *
     * @memberOf DynamicFormComponent
     */
    private _isFormValidationVisible = false;

    /**
     * get isFormValidationVisible
     *
     * @memberOf DynamicFormComponent
     */
    get isFormValidationVisible() { return this._isFormValidationVisible; }

    /**
     * set isFormValidationVisible
     *
     * @memberOf DynamicFormComponent
     */
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
    generateFormFromInput(input?: FieldDto[]): void {
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
    showFormValidation(form: FormGroup) {
        // if (this.disabled) { return; } // TODO
        this.isFormValidationVisible = true;
        this.dynamicForm.showValidation(form);
    }

    /**
     * hides the validation of form
     *
     * @memberOf DynamicFormComponent
     */
    hideFormValidation() {
        this.isFormValidationVisible = false;
    }

}
