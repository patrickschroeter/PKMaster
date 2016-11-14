import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter, HostBinding } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { InputValidationService } from './../../../core';

import { FormElement } from './../../../swagger';

@Component({
    selector: 'pk-form',
    templateUrl: './dynamic-form.component.html',
    styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {

    @HostBinding('class.form') formClass = true;

    @Input() formElements: FormElement[];
    @Input() hasCancel: boolean;
    @Input() hasSubmit: boolean;
    @Input() editableElement: boolean;

    @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();
    @Output() onCancel: EventEmitter<any> = new EventEmitter<any>();
    @Output() onChange: EventEmitter<any> = new EventEmitter<any>();

    @Output() onEdit: EventEmitter<any> = new EventEmitter<any>();
    @Output() onRemove: EventEmitter<any> = new EventEmitter<any>();

    private form: FormGroup;

    constructor(private build: FormBuilder, private inputValidation: InputValidationService) {
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
        if (!input) input = this.formElements;
        if (!input) throw Error('this.formElements is not defined.');
        let options = {};
        /** For all Elements in Input[] */
        for (let i = 0, length = input.length; i < length; i++) {
            let element = input[i];
            /** Ignore Data withoud Name (ID) */
            if (!element || !element.name) continue;

            /** Create Array of ValidationFn */
            let activeValidations = this.inputValidation.generateValidationsFromKeys(element.validations);
            if (element.required) activeValidations.push(Validators.required)

            /** Create new FormControl if not existing */
            if (!element.formControl) {
                /** FIX for multiselect */
                if (!element.value) element.value = element.multiple ? null : '';
                element.formControl = new FormControl(element.value, Validators.compose(activeValidations));

            }

            /** Add new FormControl to FormBuilder-Options[] */
            options[element.name] = element.formControl;
        };

        /** Create new FormGroup from FormElements[] */
        this.form = this.build.group(options);

        /** Emit Form changes via @Output() */
        this.form.valueChanges.subscribe((event) => {
            this.onChange.emit(event);
        });
    }


    /**
     * @description Cancel Button onClick Event
     * @return {void}
     */
    cancel(): void {
        this.onCancel.emit();
    }


    /**
     * @description Submit Button onClick Event
     * @param {Object} element the Form as JSON
     * @return {void}
     */
    submit(element: Object): void {
        console.log(element);
        this.onSubmit.emit(element);
    }


    /**
     * @description Element Edit Button
     * @param {FormElement} element the clicked FormElement
     * @return {void}
     */
    edit(element: FormElement): void {
        this.onEdit.emit(element);
    }


    /**
     * @description Element Remove Button
     * @param {FormElement} element the clicked FormElement
     * @return {void}
     */
    remove(element: FormElement): void {
        this.onRemove.emit(element);
    }

}
