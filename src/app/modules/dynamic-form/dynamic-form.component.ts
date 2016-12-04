import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter, OnChanges, HostBinding } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { InputValidationService } from './../../core';

import { DynamicFormService } from './services';

import { Field } from './../../swagger';

@Component({
    selector: 'pk-dynamic-form',
    templateUrl: './dynamic-form.component.html',
    styleUrls: ['./dynamic-form.component.scss'],
    exportAs: 'dynamicForm'
})
export class DynamicFormComponent implements OnInit, OnChanges {

    @HostBinding('class.form') formClass = true;

    @Input() formElements: Field[];

    @Output() onChange: EventEmitter<any> = new EventEmitter<any>();

    private form: FormGroup;
    private isFormValidationVisible: boolean = false;

    constructor(
        private build: FormBuilder,
        private inputValidation: InputValidationService,
        private dynamicForm: DynamicFormService) {
    }


    /**
     * @description Create Form on Init
     * @return {void}
     */
    ngOnInit(): void {
        this.generateFormFromInput();
    }


    /**
     * @description Recreate Form on Changes
     * @param {SimpleChanges} changes the Object with changes
     * @return {void}
     */
    ngOnChanges(changes: SimpleChanges): void {
        this.generateFormFromInput();
    }


    /**
     * @description Generate the Form Object using FormBuilder.
     * @param {array} input an FormElement[] as alternative Base for the Form creation
     * @return {void}
     */
    generateFormFromInput(input?): void {
        /** Use this.formElements if not Input is given */
        if (!this.formElements) { return; }
        if (!input) { input = this.formElements; }
        if (!input) { throw Error('this.formElements is not defined.'); }

        /** Create new FormGroup from FormElements[] */
        this.form = this.dynamicForm.generateFormFromInput(input);

        /** Emit Form changes via @Output() */
        this.form.valueChanges.subscribe((event) => {
            this.onChange.emit(event);
        });
    }


    /**
     * @description shows the validation of the formgroup
     * @param {FormGroup} element the formgroup to validate
     * @return {void}
     */
    showFormValidation(form: FormGroup) {
        // if (this.disabled) { return; } // TODO
        this.isFormValidationVisible = true;
        this.dynamicForm.showValidation(form);
    }

    /**
     * @description hides the validation of form
     * @return {void}
     */
    hideFormValidation() {
        this.isFormValidationVisible = false;
    }

}
