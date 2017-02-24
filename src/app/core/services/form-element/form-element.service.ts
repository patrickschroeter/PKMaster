// tslint:disable:no-use-before-declare

import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, BehaviorSubject, Observer } from 'rxjs/Rx';
import * as _ from 'lodash';

import { UserApiMock } from './../../';

/** Services */
import { FormService } from './../form';
import { ConfigurationService } from './../configuration';
import { AlertService } from './../../../modules/alert';
import { TranslationService } from './../../../modules/translation';

/** Models */
import {
    FieldDto,
    UserDetailDto,
    FieldDefinitionDto,
    ValidationDto,
    StyleDto
} from './../../../swagger';
import { Fields, Selectable, FieldModel } from './../../../models';

/** Decorators */
import { Loading } from './../../../shared/decorators/loading.decorator';

/**
 * A Service taking care of on Form Element
 *
 * @export
 * @class FormElementService
 */
@Injectable()
export class FormElementService {

    /**
     * The current Element as FormElement[]
     *
     * @private
     * @type {FormGroup}
     * @memberOf FormElementService
     */
    private elementForm: FormGroup;

    /**
     * the form to display the element
     *
     * @private
     * @type {FieldDto[]}
     * @memberOf FormElementService
     */
    private element: FieldDto[];

    /**
     * The default view for adding new Element
     *
     * @private
     * @type {FieldDto[]}
     * @memberOf FormElementService
     */
    private elementBase: FieldDto[] = [];

    /**
     * The Select Element for the Element Type
     *
     * @private
     * @type {FieldDto}
     * @memberOf FormElementService
     */
    private selectTypeFormElement: FieldDto = new FieldDto();

    /**
     * The current Selected Element Type
     *
     * @private
     * @type {string}
     * @memberOf FormElementService
     */
    private selectedType: string;

    /**
     * the current selected option table
     *
     * @private
     * @type {string}
     * @memberOf FormElementService
     */
    private selectedOptionTable: string;

    /**
     * the number of the selected options
     *
     * @private
     * @type {number}
     * @memberOf FormElementService
     */
    private selectedOptionsLength: number;

    /**
     * The Element Observable
     *
     * @private
     * @type {BehaviorSubject<Array>}
     * @memberOf FormElementService
     */
    private elementRx: BehaviorSubject<FieldDto[]> = new BehaviorSubject(this.element);

    /**
     * The Element Preview Observable
     *
     * @private
     * @type {BehaviorSubject<Array>}
     * @memberOf FormElementService
     */
    private elementPreviewRx: BehaviorSubject<FieldDto[]> = new BehaviorSubject(null);

    /**
     * The HasSubmit Observable
     *
     * @private
     * @type {BehaviorSubject<boolean>}
     * @memberOf FormElementService
     */
    private elementHasSubmitRx: BehaviorSubject<boolean> = new BehaviorSubject(false);

    /**
     * The HasPreview Observable
     *
     * @private
     * @type {BehaviorSubject<boolean>}
     * @memberOf FormElementService
     */
    private elementHasPreviewRx: BehaviorSubject<boolean> = new BehaviorSubject(false);

    /**
     * The HasValidation Observable
     *
     * @private
     * @type {BehaviorSubject<boolean>}
     * @memberOf FormElementService
     */
    private elementHasValidationsRx: BehaviorSubject<boolean> = new BehaviorSubject(false);

    /**
     * the HasStyles Observable
     *
     * @private
     * @type {BehaviorSubject<boolean>}
     * @memberOf FormElementService
     */
    private elementHasStylesRx: BehaviorSubject<boolean> = new BehaviorSubject(false);

    /**
     * Creates an instance of FormElementService.
     *
     * @param {FormService} formService
     * @param {AlertService} alert
     * @param {TranslationService} translationService
     *
     * @memberOf FormElementService
     */
    constructor(
        /** Modules */
        private translationService: TranslationService,
        private alert: AlertService,
        /** Services */
        private formService: FormService,
        private configurationService: ConfigurationService
    ) {
        this.formService.onEditElement().subscribe((element?: FieldDto) => {
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
     * Reset all Parameters of the Add Element View
     *
     * @private
     *
     * @memberOf FormElementService
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
     * creates an empty view
     *
     * @private
     *
     * @memberOf FormElementService
     */
    private editNewElement(): void {
        this.resetElement();
    }

    /**
     * create the Add Attribute View with from a given FormElement
     *
     * @private
     * @param {FieldDto} element
     * @returns {boolean}
     *
     * @memberOf FormElementService
     */
    private editExistingElement(element: FieldDto): boolean {

        /**
         * Update the Element if all Observers returned
         */
        const update = () => {
            if (returnedNumberOfRequests >= numberOfRequests) {
                let generatedFormOfElement: FieldDto[] = this.element.concat(optionsOfElementType);

                /** Show submit button */
                this.setElementHasSubmit(true);

                /** Show Validation if existing */
                if (validationsOfElementType) {
                    generatedFormOfElement = generatedFormOfElement.concat(validationsOfElementType);
                    this.setElementHasValidations(true);
                }

                /** Show Styles if existing */
                if (stylesOfElementType) {
                    generatedFormOfElement = generatedFormOfElement.concat(stylesOfElementType);
                    this.setElementHasStyles(true);
                }

                /** Add Options to Form (radio, select) */
                let useCustomOptions = true;
                let optionFormElement: any;
                let formElementOptions: any;
                for (let i = 0; i < generatedFormOfElement.length; i++) {
                    const input: FieldDto = generatedFormOfElement[i];
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

        this.resetElement();

        if (!this.selectTypeFormElement.options) {
            return !!console.error('No FieldTypes Options loaded');
        }

        const type = element['fieldType'];

        /** Check if the required Element Type exists in Select Options */
        let existing = false;
        const inputTypes = this.selectTypeFormElement.options;
        for (let i = 0; i < (inputTypes ? inputTypes.length : 0); i++) {
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
        let optionsOfElementType: FieldDto[], validationsOfElementType: FieldDto[], stylesOfElementType: FieldDto[];

        let numberOfRequests = 1; // always get options

        /** get Validation Options if required */
        if (element.validationIds && element.validationIds.length !== 0) {
            numberOfRequests++;
            this.getValidationsOfInputType(type).subscribe((opt) => {
                returnedNumberOfRequests++; validationsOfElementType = opt; update();
            });
        }

        /** get Styles Options if required */
        if (element.styleIds && element.styleIds.length !== 0) {
            numberOfRequests++;
            this.getStylesOfInputType(type).subscribe((opt) => {
                returnedNumberOfRequests++; stylesOfElementType = opt; update();
            });
        }

        this.getOptionsOfElementType(type).subscribe((opt) => {
            returnedNumberOfRequests++;
            optionsOfElementType = opt;
            update();
        });

        return true;
    }

    /**
     * DynamicForm Change Event
     *
     * @param {FormGroup} formGroup
     *
     * @memberOf FormElementService
     */
    public updateElement(formGroup: FormGroup): void {
        this.elementForm = formGroup;
        const form = formGroup.value;
        /** Load Type Options on change */
        const type: string = form.fieldType;
        if (type && type !== this.selectedType && typeof type === 'string') {
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
                    for (let i = 0; i < this.element.length; i++) {
                        const element = this.element[i];
                        if (form[element.name]) {
                            element.value = form[element.name];
                        }
                    }
                }
            });
        }

        /** load optionTable */
        const optionTable: string = form.optionTable;
        if (optionTable && optionTable !== this.selectedOptionTable) {
            this.selectedOptionTable = optionTable;
            this.updateOptionsOfTable();
        }

        /** unset optionTable on option length change TODO: content change? */
        const options: any[] = form.options;
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
     * Get all Options from the selected TableName and set them as Options
     *
     * @private
     *
     * @memberOf FormElementService
     */
    private updateOptionsOfTable(): void {
        this.getOptionsOfTable(this.selectedOptionTable).subscribe((options: Selectable[]) => {
            if (!options) {
                this.selectedOptionsLength = 0;
                if (this.elementForm) { this.elementForm.controls['options'].setValue([]); }
                return;
            }
            this.selectedOptionsLength = options.length;
            if (this.elementForm) { this.elementForm.controls['options'].setValue(options); }
        });
    }

    /**
     * Toggle the visibility of the Preview Element
     *
     * @memberOf FormElementService
     */
    public toggleElementPreview(): void {
        this.setElementHasPreview(!this.elementHasPreviewRx.getValue());
    }


    /**
     * enable Validation in Add Element View
     *
     * @returns {void}
     *
     * @memberOf FormElementService
     */
    public addValidations(): void {

        /** Check if Validation already exists */
        for (let i = 0; i < this.element.length; i++) {
            if (this.element[i].name === 'validationIds') {
                return console.error('form-element.service:addValidations(): validations already exists');
            }
        }

        if (!this.selectedType) {
            return console.error('form-element.service:addValidations(): no selected type');
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
     * enable Styles in Add Element View
     *
     * @returns {void}
     *
     * @memberOf FormElementService
     */
    public addStyles(): void {

        /** Check if Styles already exists */
        for (let i = 0; i < this.element.length; i++) {
            if (this.element[i].name === 'styleIds') {
                return console.error('form-element.service:addStyles(): styles already exists');
            }
        }

        if (!this.selectedType) {
            return console.error('form-element.service:addStyles(): no selected type');
        }

        /** Get Styles Options */
        this.getStylesOfInputType(this.selectedType).subscribe((styles) => {
            if (this.selectedType) {
                if (styles) { // TODO: catch else case with message?
                    this.setElement(this.element.concat(styles));
                };
                this.setElementHasStyles(true);
            }
        });
    }

    /**
     * remove the current element from the form
     *
     *
     * @memberOf FormElementService
     */
    public removeElement(): void {
        let name: FieldDto;
        for (let i = 0; i < this.element.length; i++) {
            const formElement = this.element[i];
            if (formElement.name === 'name') {
                name = formElement;
            }
        }
        if (this.formService.removeElement(name)) {
            this.resetElement();
        }
    }

    /**
     * Adds the element to the current Form
     *
     * @param {FieldDto} element
     * @param {String} [mode] TODO: make ENUM
     *
     * @memberOf FormElementService
     */
    public saveElement(element: FieldDto, mode?: 'clone' | 'add'): void {
        if (this.formService.addElementToForm(element, mode)) {
            if (!mode || mode === 'add') {
                this.resetElement();
            }
            this.alert.setSuccessHint('save-element-no-reset', this.translationService.translate('addedElement'));
        } else {
            this.alert.setAlert(this.translationService.translate('headerError'), this.translationService.translate('usedId'));
        }
    }

    /**
     * Cancel the Editation or Creation of an Element
     *
     * @memberOf FormElementService
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
     * cath all available element types from the server
     *
     * @private
     * @returns {Observable<FieldDto>}
     *
     * @memberOf FormElementService
     */
    @Loading('getElementTypeOptions')
    private getElementTypeOptions(): Observable<FieldDto> {
        const options: FieldModel = new Fields.FieldType();
        return this.configurationService.getFieldDefinitions().map((result: FieldDefinitionDto[]) => {
            options.options = result.map((obj: FieldDefinitionDto) => new Selectable(obj.id, obj.description));
            options.options.sort((a, b) => a.label < b.label ? 1 : -1);
            return options;
        });
    }

    /**
     * get the options of the requested table
     *
     * @private
     * @param {String} name
     * @returns {Observable<Array>}
     *
     * @memberOf FormElementService
     */
    @Loading('getOptionsOfTable')
    private getOptionsOfTable(name: string): Observable<Selectable[]> {
        const result = options();
        return new Observable((observer: Observer<Selectable[]>) => {
            setTimeout(() => {
                observer.next(result[name]);
                observer.complete();
            }, 500);
        });
    }

    /**
     * cath all available options of the element type from the server
     *
     * @private
     * @param {String} fieldType
     * @returns {Observable<Array>}
     *
     * @memberOf FormElementService
     */
    @Loading('getOptionsOfElementType')
    private getOptionsOfElementType(id: string): Observable<FieldDto[]> {
        const name: FieldDto = new Fields.FieldName();
        return this.configurationService.getFieldDefinitionById(id).map((result: FieldDefinitionDto) => {
            let options = [].concat(name);
            const element = result.configs.map(obj => typeof obj === 'string' ? JSON.parse(obj) : obj);
            if (element) { options = options.concat(element); }
            options.push(new Fields.Devider());
            return options;
        });
    }

    /**
     * cath all available validations of the element type from the server
     *
     * @private
     * @param {String} fieldType
     * @returns {Observable<Array>}
     *
     * @memberOf FormElementService
     */
    @Loading('getValidationsOfInputType')
    private getValidationsOfInputType(id: string): Observable<FieldDto[]> {
        // TODO: filter by type

        return this.configurationService.getFieldValidations().map((result: ValidationDto[]) => {
            const param = new Fields.FieldValidation(null, {
                options: result.map(obj => new Selectable(obj.id, obj.description))
            });
            return [param];
        });
    }

    /**
     * cath all available styles of the element type from the server
     *
     * @private
     * @param {String} fieldType
     * @returns {Observable<Array>}
     *
     * @memberOf FormElementService
     */
    @Loading('getStylesOfInputType')
    private getStylesOfInputType(id: string): Observable<FieldDto[]> {
        // TODO: filter by type

        return this.configurationService.getFieldStyles().map((result: StyleDto[]) => {
            const param = new Fields.FieldStyles(null, {
                options: result.map(obj => new Selectable(obj.id, obj.description))
            });
            return [param];
        });
    }

    /***************************************
     *
     *  Observables
     *
     */

    /**
     * BehaviorSubject for the element
     *
     * @returns {Observable<Array>}
     *
     * @memberOf FormElementService
     */
    public getElement(): Observable<FieldDto[]> {
        return this.elementRx.asObservable();
    }

    /**
     * Set the current Element
     * TODO: set element() + get element()
     *
     * @param {FieldDto[]} element
     *
     * @memberOf FormElementService
     */
    public setElement(element: FieldDto[]): void {
        this.element = element;
        this.elementRx.next(this.element);
    }

    /**
     * BehaviorSubject for the preview element
     *
     * @returns {Observable<Array>}
     *
     * @memberOf FormElementService
     */
    public getElementPreview(): Observable<FieldDto[]> {
        return this.elementPreviewRx.asObservable();
    }

    /**
     * emit the element preview
     *
     * @param {FieldDto[]} element
     *
     * @memberOf FormElementService
     */
    public setElementPreview(element: FieldDto[]): void {
        this.elementPreviewRx.next(element);
    }

    /**
     * BehaviorSubject for has Submit
     *
     * @returns {Observable<boolean>}
     *
     * @memberOf FormElementService
     */
    public getElementHasSubmit(): Observable<boolean> {
        return this.elementHasSubmitRx.asObservable();
    }

    /**
     * emit the hasSubmit Flag
     *
     * @param {boolean} hasSubmit
     *
     * @memberOf FormElementService
     */
    public setElementHasSubmit(hasSubmit: boolean): void {
        this.elementHasSubmitRx.next(hasSubmit);
    }

    /**
     * BehaviorSubject for has preview
     *
     * @returns {Observable<boolean>}
     *
     * @memberOf FormElementService
     */
    public getElementHasPreview(): Observable<boolean> {
        return this.elementHasPreviewRx.asObservable();
    }

    /**
     * emit the hasPreview Flag
     *
     * @param {boolean} hasPreview
     *
     * @memberOf FormElementService
     */
    public setElementHasPreview(hasPreview: boolean): void {
        this.elementHasPreviewRx.next(hasPreview);
    }

    /**
     * BehaviorSubject for has validations
     *
     * @returns {Observable<boolean>}
     *
     * @memberOf FormElementService
     */
    public getElementHasValidations(): Observable<boolean> {
        return this.elementHasValidationsRx.asObservable();
    }

    /**
     * emit the hasValidations Flag
     *
     * @param {boolean} hasValidations
     *
     * @memberOf FormElementService
     */
    public setElementHasValidations(hasValidations: boolean): void {
        this.elementHasValidationsRx.next(hasValidations);
    }

    /**
     * BehaviorSubject for has styles
     *
     * @returns {Observable<boolean>}
     *
     * @memberOf FormElementService
     */
    public getElementHasStyles(): Observable<boolean> {
        return this.elementHasStylesRx.asObservable();
    }

    /**
     * emit the hasStyles Flag
     *
     * @param {boolean} hasStyles
     *
     * @memberOf FormElementService
     */
    public setElementHasStyles(hasStyles: boolean): void {
        this.elementHasStylesRx.next(hasStyles);
    }
}


/**
 * the option-options object
 *
 * @returns {Object}
 */
function options(): { [key: string]: Selectable[] } {
    return {
        fakultaet: [
            { value: 'gestaltung', label: 'Gestaltung' },
            { value: 'informatik', label: 'informatik' }
        ],
        user: UserApiMock.USERS.map((obj: UserDetailDto) => new Selectable(obj.id, `${obj.lastname}, ${obj.firstname}`)),
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
