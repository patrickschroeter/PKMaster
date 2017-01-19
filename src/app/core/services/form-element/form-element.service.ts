// tslint:disable:no-use-before-declare

import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, BehaviorSubject, Observer } from 'rxjs/Rx';

import { FormService } from './../form';
import { AlertService } from './../../../modules/alert';
import { Field } from './../../../swagger';
import { Fields } from './../../../models';

@Injectable()
export class FormElementService {

    /** The current Element as FormElement[] */
    private elementForm: FormGroup;
    private element: Field[];
    /** The default view for adding new Element */
    private elementBase: Field[] = [];

    /** The Select Element for the Element Type */
    private selectTypeFormElement: Field = {};
    /** The current Selected Element Type */
    private selectedType: string;

    private selectedOptionTable: string;
    private selectedOptionsLength: Array<Object>;

    /** BehaviorSubjects */
    private elementRx: BehaviorSubject<Field[]> = new BehaviorSubject(this.element);
    private elementPreviewRx: BehaviorSubject<Field[]> = new BehaviorSubject(null);
    private elementHasSubmitRx: BehaviorSubject<boolean> = new BehaviorSubject(false);
    private elementHasPreviewRx: BehaviorSubject<boolean> = new BehaviorSubject(false);
    private elementHasValidationsRx: BehaviorSubject<boolean> = new BehaviorSubject(false);
    private elementHasStylesRx: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor(private formService: FormService, private alert: AlertService) {
        this.formService.onEditElement().subscribe((element?: Field) => {
            if (element) {
                if (!this.editExistingElement(element)) {
                    this.formService.editElementError(this.selectedType);
                }
            } else {
                this.editNewElement();
            }
        });

        this.getElementTypeOptions().subscribe(fieldTypes => {
            this.selectTypeFormElement = fieldTypes;
            this.elementBase = [this.selectTypeFormElement];
            this.resetElement();
        });
    }

    /**
     * @description Reset all Parameters of the Add Element View
     * @return {void}
     */
    private resetElement(): void {
        delete this.selectTypeFormElement.value;
        this.selectedType = null;
        this.selectedOptionTable = null;

        this.setElement(this.elementBase);
        this.setElementHasValidations(false);
        this.setElementHasStyles(false);
        this.setElementPreview([]);
    }

    /**
     * @description creates an empty view
     * @return {void}
     */
    private editNewElement(): void {
        this.resetElement();
    }


    /**
     * @description create the Add Attribute View with from a given FormElement
     * @param {FormElement} element the FormElement to edit
     * @return {void}
     */
    private editExistingElement(element: Field): boolean {

        this.resetElement();

        let type = element['fieldType'];

        /** Check if the required Element Type exists in Select Options */
        let existing = false;
        let inputTypes = this.selectTypeFormElement.options;
        for (let i = 0, length = inputTypes ? inputTypes.length : 0; i < length; i++) {
            if (type === inputTypes[i].value) { existing = true; }
        }

        /** Set type as Select Value */
        this.selectTypeFormElement.value = type;
        this.selectedType = type;

        /** Reset if type not exists */
        if (!existing) {
            return false;
        }

        /** Request all Options of the selected Type */
        let returnedNumberOfRequests = 0;
        let optionsOfElementType: any[], validationsOfElementType: any[], stylesOfElementType: any[];

        let numberOfRequests = 1; // always get options
        this.getOptionsOfElementType(type).subscribe((opt) => {
            returnedNumberOfRequests++;
            optionsOfElementType = opt;
            update();
        });

        /** get Validation Options if required */
        if (element.validations && element.validations.length !== 0) {
            numberOfRequests++;
            this.getValidationsOfInputType(type).subscribe((opt) => {
                returnedNumberOfRequests++; validationsOfElementType = opt; update();
            });
        }

        /** get Styles Options if required */
        if (element.styles && element.styles.length !== 0) {
            numberOfRequests++;
            this.getStylesOfInputType(type).subscribe((opt) => {
                returnedNumberOfRequests++; stylesOfElementType = opt; update();
            });
        }

        /** Update the Element if all Observers returned */
        let update = () => {
            if (returnedNumberOfRequests >= numberOfRequests) {
                let generatedFormOfElement = this.element.concat(optionsOfElementType);

                /** Show submit button */
                this.setElementHasSubmit(true);

                /** Show Validation if existing */
                if (validationsOfElementType) {
                    generatedFormOfElement = generatedFormOfElement.concat(validationsOfElementType);
                    this.setElementHasValidations(true);
                }

                /** Show Styles if existing */
                if (stylesOfElementType) {
                    generatedFormOfElement = generatedFormOfElement.concat([stylesOfElementType]);
                    this.setElementHasStyles(true);
                }

                /** Add Options to Form (radio, select) */
                let useCustomOptions: boolean = true;
                let optionFormElement: any;
                let formElementOptions: any;
                for (let i = 0, length = generatedFormOfElement.length; i < length; i++) {
                    let input = generatedFormOfElement[i];
                    if (element[input.name] && input.name !== 'fieldType') {
                        input.value = element[input.name];
                        if (input.name === 'optionTable') {
                            useCustomOptions = false;
                            this.selectedOptionTable = element[input.name];
                            this.updateOptionsOfTable();
                        } else if (input.name === 'options') {
                            formElementOptions = element[input.name];
                            optionFormElement = input;
                        }
                    }
                }

                /** Add values if no optionTable is set */
                if (useCustomOptions && formElementOptions && optionFormElement) {
                    optionFormElement.options = formElementOptions;
                    optionFormElement.value = formElementOptions;
                }

                /** Set Element and generate View */
                this.setElement(generatedFormOfElement);
                this.setElementPreview([element]);
            }
        };

        return true;
    }


    /**
     * @description DynamicForm Change Event
     * @param {object} event The updated Form-Values
     */
    public updateElement(formGroup: FormGroup): void {
        this.elementForm = formGroup;
        let form = formGroup.value;
        /** Load Type Options on change */
        let type = form.fieldType;
        if (type && type !== this.selectedType) {
            this.selectedType = type;
            this.getOptionsOfElementType(type).subscribe((options) => {
                if (this.selectedType) {
                    this.setElement(this.elementBase.concat(options));
                    this.selectedOptionTable = null;
                    this.setElementHasSubmit(true);
                    this.setElementHasValidations(false);
                    this.setElementHasStyles(false);
                    this.setElementHasPreview(false);
                    this.setElementPreview([form]);
                    for (let i = 0, length = this.element.length; i < length; i++) {
                        let element = this.element[i];
                        if (form[element.name]) {
                            element.value = form[element.name];
                        }
                    }
                }
            });
        }

        /** load optionTable */
        let optionTable = form.optionTable;
        if (optionTable && optionTable !== this.selectedOptionTable) {
            this.selectedOptionTable = optionTable;
            this.updateOptionsOfTable();
        }

        /** unset optionTable on option length change TODO: content change? */
        let options = form.options;
        if (options && options.length !== this.selectedOptionsLength) {
            this.selectedOptionsLength = options.length;
            this.elementForm.controls['optionTable'].setValue('');
        }

        /** Create or remove Preview Element if name exists */
        if (form.name) {
            this.setElementPreview([form]);
        } else {
            this.setElementPreview([]);
        }
    }

    /**
     * @description Get all Options from the selected TableName and set them as Options
     * @return {void}
     */
    private updateOptionsOfTable() {
        this.getOptionsOfTable(this.selectedOptionTable).subscribe(options => {
            this.selectedOptionsLength = options.length;
            this.elementForm.controls['options'].setValue(options);
        });
    }

    /**
     * @description Toggle the visibility of the Preview Element
     * @return {void}
     */
    public toggleElementPreview(): void {
        this.setElementHasPreview(!this.elementHasPreviewRx.getValue());
    }


    /**
     * @description enable Validation in Add Element View
     * @return {void}
     */
    public addValidations(): void {

        /** Check if Validation already exists */
        for (let i = 0, length = this.element.length; i < length; i++) {
            if (this.element[i].name === 'validations') { return; }
        }

        /** Get Validation Options */
        this.getValidationsOfInputType(this.selectedType).subscribe((validations) => {
            if (this.selectedType) {
                if (validations) { // catch else case with message?
                    this.setElement(this.element.concat(validations));
                };
                this.setElementHasValidations(true);
            }
        });
    }


    /**
     * @description enable Styles in Add Element View
     * @return {void}
     */
    public addStyles(): void {

        /** Check if Styles already exists */
        for (let i = 0, length = this.element.length; i < length; i++) {
            if (this.element[i].name === 'styles') { return; }
        }

        /** Get Styles Options */
        this.getStylesOfInputType(this.selectedType).subscribe((styles) => {
            if (this.selectedType) {
                if (styles) { // catch else case with message?
                    this.setElement(this.element.concat([styles]));
                };
                this.setElementHasStyles(true);
            }
        });
    }

    /**
     * @description remove the current element from the form
     * @return {void}
     */
    public removeElement(): void {
        let name: Field;
        for (let i = 0, length = this.element.length; i < length; i++) {
            let formElement = this.element[i];
            if (formElement.name === 'name') {
                name = formElement;
            }
        }
        if (this.formService.removeElement(name)) {
            this.resetElement();
        }
    }


    /**
     * @description Adds the element to the current Form
     * @param {FormElement} elmenent the element to add to the form
     * @param {Number} reset 0: add, reset, close; 1:add, reset; 3: add
     * @return {void}
     */
    public saveElement(element: Field, mode?: 'clone' | 'add'): void {
        if (this.formService.addElementToForm(element, mode)) {
            if (!mode || mode === 'add') {
                this.resetElement();
            }
            this.alert.setSuccessHint('save-element-no-reset', 'Element added successful');
        } else {
            this.alert.setAlert('Error', 'The given name (ID) is already in use. Please choose a new unique one.');
        }
    }


    /**
     * @description Cancel the Editation or Creation of an Element
     * @return {void}
     */
    public cancelElement(): void {
        this.resetElement();
        this.formService.setAddingElement(false);
    }

    /***************************************
     *
     *  HTTPs
     *
     */

    /**
     * @description cath all available element types from the server
     * @return {Observable}
     */
    private getElementTypeOptions(): Observable<any> {
        let result: Field = new Fields.FieldType();
        this.alert.setLoading('getInputTypeOptions', 'Loading Type Options...');
        return new Observable((observer: Observer<any>) => {
            setTimeout(() => {
                this.alert.removeHint('getInputTypeOptions');
                observer.next(result);
                observer.complete();
            }, 500);
        });
    }

    private getOptionsOfTable(name: string): Observable<any> {
        let result: Field = options();
        this.alert.setLoading('getOptionsOfTable', `${name.toUpperCase()}: Loading Options...`);
        return new Observable((observer: Observer<any>) => {
            setTimeout(() => {
                this.alert.removeHint('getOptionsOfTable');
                observer.next(result[name]);
                observer.complete();
            }, 500);
        });
    }

    /**
     * @description cath all available options of the element type from the server
     * @param {string} fieldType
     * @return {Observable}
     */
    private getOptionsOfElementType(fieldType: string): Observable<any> {
        let name: Field = new Fields.FieldName();
        let options: Field = opts();
        this.alert.setLoading('getOptionsOfInputType', `${fieldType.toUpperCase()}: Loading Options...`);
        return new Observable((observer: Observer<any>) => {
            setTimeout(() => {
                this.alert.removeHint('getOptionsOfInputType');
                let result = [].concat(name);
                let element = options[fieldType];
                if (element) { result = result.concat(element); }
                result.push(new Fields.Devider());
                observer.next(result);
                observer.complete();
            }, 500);
        });
    }

    /**
     * @description cath all available validations of the element type from the server
     * @param {string} fieldType
     * @return {Observable}
     */
    private getValidationsOfInputType(fieldType: string): Observable<any> {
        let options: Field = validations();
        this.alert.setLoading('getValidationsOfInputType', `${fieldType.toUpperCase()}: Loading Validations...`);
        return new Observable((observer: Observer<any>) => {
            setTimeout(() => {
                this.alert.removeHint('getValidationsOfInputType');
                observer.next(options[fieldType]);
                observer.complete();
            }, 500);
        });
    }

    /**
     * @description cath all available styles of the element type from the server
     * @param {string} fieldType
     * @return {Observable}
     */
    private getStylesOfInputType(fieldType: string): Observable<any> {
        let options: Field = styles();
        this.alert.setLoading('getStyles', `${fieldType.toUpperCase()}: Loading Styles...`);
        return new Observable((observer: Observer<any>) => {
            setTimeout(() => {
                this.alert.removeHint('getStyles');
                observer.next(options);
                observer.complete();
            }, 500);
        });
    }

    /***************************************
     *
     *  Observables
     *
     */

    /**
     * @description BehaviorSubject for the element
     */
    public getElement(): Observable<Field[]> {
        return this.elementRx.asObservable();
    }
    public setElement(element: Field[]): void {
        this.element = element;
        this.elementRx.next(this.element);
    }


    /**
     * @description BehaviorSubject for the preview element
     */
    public getElementPreview(): Observable<Field[]> {
        return this.elementPreviewRx.asObservable();
    }
    public setElementPreview(element: Field[]): void {
        this.elementPreviewRx.next(element);
    }


    /**
     * @description BehaviorSubject for has Submit
     */
    public getElementHasSubmit(): Observable<boolean> {
        return this.elementHasSubmitRx.asObservable();
    }
    public setElementHasSubmit(hasSubmit: boolean): void {
        this.elementHasSubmitRx.next(hasSubmit);
    }


    /**
     * @description BehaviorSubject for has preview
     */
    public getElementHasPreview(): Observable<boolean> {
        return this.elementHasPreviewRx.asObservable();
    }
    public setElementHasPreview(hasPreview: boolean): void {
        this.elementHasPreviewRx.next(hasPreview);
    }


    /**
     * @description BehaviorSubject for has validations
     */
    public getElementHasValidations(): Observable<boolean> {
        return this.elementHasValidationsRx.asObservable();
    }
    public setElementHasValidations(hasValidations: boolean): void {
        this.elementHasValidationsRx.next(hasValidations);
    }


    /**
     * @description BehaviorSubject for has styles
     */
    public getElementHasStyles(): Observable<boolean> {
        return this.elementHasStylesRx.asObservable();
    }
    public setElementHasStyles(hasStyles: boolean): void {
        this.elementHasStylesRx.next(hasStyles);
    }
}




function opts() {

    let opts = {
        input: [
            new Fields.FieldRequired(null, { styles: ['small', 'aligned']}),
            new Fields.FieldLabel(),
            new Fields.FieldContentType('text'),
            new Fields.FieldPlaceholder()
        ],
        textarea: [
            new Fields.FieldRequired(null, { styles: ['small', 'aligned']}),
            new Fields.FieldLabel(),
            new Fields.FieldPlaceholder()
        ],
        checkbox: [
            new Fields.FieldRequired(null, { styles: ['small', 'aligned']}),
            new Fields.FieldLabel(),
        ],
        radio: [
            new Fields.FieldRequired(null, { styles: ['small', 'aligned']}),
            new Fields.FieldLabel(null, { required: true }),
            new Fields.Devider(),
            new Fields.H4('Create a custom List or use an existing one.', { styles: [] }),
            new Fields.FieldOptionTable(null, {
                /** TODO: load real data */
                options: [
                    { value: 'fakultaet', label: 'Fakultaeten' },
                    { value: 'user', label: 'Users' },
                    { value: 'language', label: 'Languages' }
                ]
            }),
            new Fields.FieldOptions()
        ],
        select: [
            new Fields.FieldRequired(null, { styles: ['small', 'aligned']}),
            new Fields.FieldLabel(),
            new Fields.FieldPlaceholder(),
            new Fields.FieldMultipleSelect(),
            new Fields.Devider(),
            new Fields.H4('Create a custom List or use an existing one.', { styles: [] }),
            new Fields.FieldOptionTable(null, {
                /** TODO: load real data */
                options: [
                    { value: 'fakultaet', label: 'Fakultaeten' },
                    { value: 'user', label: 'Users' },
                    { value: 'language', label: 'Languages' }
                ]
            }),
            new Fields.FieldOptions()
        ],
        info: [
            new Fields.FieldValue(null, { fieldType: 'textarea' })
        ],
        h1: [
            new Fields.FieldValue()
        ],
        h2: [
            new Fields.FieldValue()
        ],
        h3: [
            new Fields.FieldValue()
        ],
        h4: [
            new Fields.FieldValue()
        ],
        // devider: [

        // ],
        // hiddenDevider: [

        // ]
    };
    return opts;
}

function validations() {
    let validations = {
        input: [
            new Fields.FieldValidation(null, {
                /** TODO: load real data */
                options: [
                    { value: 'isEmail', label: 'Email Validation' },
                    { value: 'useExternalEmail', label: 'External Email Validation' },
                    { value: 'minLength', label: 'min Length of 8' },
                    { value: 'maxLength', label: 'max Length of 15' },
                    { value: 'toBeTrue', label: 'Required' }
                ]
            })
        ]
    };
    return validations;
}

function styles() {
    let styles = new Fields.FieldStyles(null, {
        options: [
            { value: 'small', label: 'Small' },
            { value: 'aligned', label: 'Aligned ( + 1 rem at top)' }
        ]
    });
    return styles;
}


function options() {
    return {
        fakultaet: [
            { value: 'gestaltung', label: 'Gestaltung' },
            { value: 'informatik', label: 'informatik' }
        ],
        user: [
            { value: 'sf', label: 'Stephan Reichinger' },
            { value: 'ps', label: 'Patrick Schröter' }
        ],
        language: [
            { value: 'de', label: 'Deutschland' },
            { value: 'fr', label: 'Frankreich' },
            { value: 'es', label: 'Spanien' },
            { value: 'it', label: 'Italien' },
            { value: 'ir', label: 'Irland' },
            { value: 'bel', label: 'Belgien' },
            { value: 'cr', label: 'Croatien' },
            { value: 'en', label: 'USA' }
        ]
    };
}
