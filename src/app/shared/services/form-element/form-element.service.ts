import { Injectable } from '@angular/core';
import { Observable, Observer, BehaviorSubject } from 'rxjs/Rx';

import { FormService } from './../form';
import { AlertService } from './../alert';
import { FormElement } from './../../../swagger';

@Injectable()
export class FormElementService {

    /** The current Element as FormElement[] */
    private element: FormElement[];
    /** The default view for adding new Element */
    private elementBase: FormElement[] = [];

    /** The Select Element for the Element Type */
    private selectTypeFormElement: FormElement = {};
    /** The current Selected Element Type */
    private selectedType: string;

    constructor(private formService: FormService, private alert: AlertService) {
        this.formService.onEditElement().subscribe((element?: FormElement) => {
            if (element) {
                if (!this.editExistingElement(element)) {
                    this.formService.editElementError(this.selectedType);
                }
            } else {
                this.editNewElement();
            }
        })

        this.getInputTypeOptions().subscribe(elementTypes => {
            this.selectTypeFormElement = elementTypes;
            this.elementBase = [this.selectTypeFormElement, { elementType: 'devider' }];
            this.resetElement();
        })
    }

    /**
     * @description Reset all Parameters of the Add Element View
     * @return {void}
     */
    resetElement(): void {
        delete this.selectTypeFormElement.value;
        delete this.selectTypeFormElement.formControl;
        this.selectedType = null;

        this.setElement(this.elementBase);
        this.setElementHasValidations(false);
        this.setElementHasStyles(false);
        this.setElementPreview([]);
    }

    /**
     * @description creates an empty view
     * @return {void}
     */
    editNewElement(): void {
        this.resetElement();
    }


    /**
     * @description create the Add Attribute View with from a given FormElement
     * @param {FormElement} element the FormElement to edit
     * @return {void}
     */
    editExistingElement(element: FormElement): boolean {

        this.resetElement();

        let type = element['elementType'];

        /** Check if the required Element Type exists in Select Options */
        let existing = false;
        let inputTypes = this.selectTypeFormElement.options;
        for (let i = 0, length = inputTypes ? inputTypes.length : 0; i < length; i++) {
            if (type === inputTypes[i].value) existing = true;
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
        let options, validations, styles;

        let numberOfRequests = 1; // always get options
        this.getOptionsOfInputType(type).subscribe((opt) => {
            returnedNumberOfRequests++;
            options = opt;
            update();
        });

        /** get Validation Options if required */
        if (element.validations && element.validations.length !== 0) {
            numberOfRequests++;
            this.getValidationsOfInputType(type).subscribe((opt) => { returnedNumberOfRequests++; validations = opt; update(); });
        }

        /** get Styles Options if required */
        if (element.styles && element.styles.length !== 0) {
            numberOfRequests++;
            this.getStyles(type).subscribe((opt) => { returnedNumberOfRequests++; styles = opt; update(); });
        }

        /** Update the Element if all Observers returned */
        let update = () => {
            if (returnedNumberOfRequests >= numberOfRequests) {
                let formElement = this.element.concat(options);

                /** Show submit button */
                this.setElementHasSubmit(true);

                /** Show Validation if existing */
                if (validations) {
                    formElement = formElement.concat(validations);
                    this.setElementHasValidations(true);
                }

                /** Show Styles if existing */
                if (styles) {
                    formElement = formElement.concat([styles]);
                    this.setElementHasStyles(true);
                }

                /** Add Element Valus to Form */
                for (let i = 0, length = formElement.length; i < length; i++) {
                    let input = formElement[i];
                    if (element[input.name] && input.name !== 'elementType') {
                        input.value = element[input.name];
                    }
                }

                this.setElement(formElement);
                this.setElementPreview([element]);
            }
        }

        return true;
    }


    /**
     * @description DynamicForm Change Event
     * @param {object} event The updated Form-Values
     */
    updateElement(form: FormElement): void {

        /** Load Type Options on change */
        let type = form.elementType;
        if (type && type !== this.selectedType) {
            this.selectedType = type;
            this.getOptionsOfInputType(type).subscribe((options) => {
                this.setElement(this.elementBase.concat(options))
                this.setElementHasSubmit(true);
            })
        }

        /** Create or remove Preview Element if name exists */
        if (form.name) {
            this.setElementPreview([form]);
        } else {
            this.setElementPreview([]);
        }
    }


    /**
     * @description Toggle the visibility of the Preview Element
     * @return {void}
     */
    toggleElementPreview(): void {
        this.setElementHasPreview(!this.elementHasPreviewRx.getValue());
    }


    /**
     * @description enable Validation in Add Element View
     * @return {void}
     */
    addValidations(): void {

        /** Check if Validation already exists */
        for (let i = 0, length = this.element.length; i < length; i++) {
            if (this.element[i].name === 'validations') return;
        }

        /** Get Validation Options */
        this.getValidationsOfInputType(this.selectedType).subscribe((validations) => {
            if (validations) // catch else case with message?
                this.setElement(this.element.concat(validations));
            this.setElementHasValidations(true);
        });
    }


    /**
     * @description enable Styles in Add Element View
     * @return {void}
     */
    addStyles(): void {

        /** Check if Styles already exists */
        for (let i = 0, length = this.element.length; i < length; i++) {
            if (this.element[i].name === 'styles') return;
        }

        /** Get Styles Options */
        this.getStyles(this.selectedType).subscribe((styles) => {
            if (styles) // catch else case with message?
                this.setElement(this.element.concat([styles]))
            this.setElementHasStyles(true);
        });
    }

    /**
     * @description remove the current element from the form
     * @return {void}
     */
    removeElement(): void {
        this.formService.removeElement(this.element);
        this.resetElement();
    }


    /**
     * @description Adds the element to the current Form
     * @param {FormElement} elmenent the element to add to the form
     * @return {void}
     */
    saveElement(element: FormElement): void {
        if (this.formService.addElementToForm(element)) {
            this.resetElement();
        } else {
            this.alert.setAlert('Error', 'The given name (ID) is already in use. Please choose a new unique one.');
        }
    }


    /**
     * @description Cancel the Editation or Creation of an Element
     * @return {void}
     */
    cancelElement(): void {
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
    getInputTypeOptions(): Observable<any> {
        let result = types();
        return new Observable(observer => {
            setTimeout(() => {
                observer.next(result);
                observer.complete();
            }, 2000)
        })
    }

    /**
     * @description cath all available options of the element type from the server
     * @param {string} elementType
     * @return {Observable}
     */
    getOptionsOfInputType(elementType: string): Observable<any> {
        let name = nm();
        let options = opts();
        return new Observable(observer => {
            setTimeout(() => {
                let devider = { elementType: 'devider' };
                let result = [].concat(name);
                let element = options[elementType];
                if (element) result = result.concat(element);
                result.push(devider);
                observer.next(result);
                observer.complete();
            }, 500)
        })
    }

    /**
     * @description cath all available validations of the element type from the server
     * @param {string} elementType
     * @return {Observable}
     */
    getValidationsOfInputType(elementType: string): Observable<any> {
        let options = validations();
        return new Observable(observer => {
            setTimeout(() => {
                observer.next(options[elementType]);
                observer.complete();
            }, 500)
        })
    }

    /**
     * @description cath all available styles of the element type from the server
     * @param {string} elementType
     * @return {Observable}
     */
    getStyles(elementType: string): Observable<any> {
        let options = styles();
        return new Observable(observer => {
            setTimeout(() => {
                observer.next(options);
                observer.complete();
            }, 500)
        })
    }

    /***************************************
     *
     *  Observables
     *
     */

    /**
     * @description BehaviorSubject for the element
     */
    private elementRx: BehaviorSubject<FormElement[]> = new BehaviorSubject(this.element);
    getElement(): Observable<FormElement[]> {
        return this.elementRx.asObservable();
    }
    setElement(element: FormElement[]): void {
        this.element = element;
        this.elementRx.next(this.element);
    }


    /**
     * @description BehaviorSubject for the preview element
     */
    private elementPreviewRx: BehaviorSubject<FormElement[]> = new BehaviorSubject(null);
    getElementPreview(): Observable<FormElement[]> {
        return this.elementPreviewRx.asObservable();
    }
    setElementPreview(element: FormElement[]): void {
        this.elementPreviewRx.next(element);
    }


    /**
     * @description BehaviorSubject for has Submit
     */
    private elementHasSubmitRx: BehaviorSubject<boolean> = new BehaviorSubject(false);
    getElementHasSubmit(): Observable<boolean> {
        return this.elementHasSubmitRx.asObservable();
    }
    setElementHasSubmit(hasSubmit: boolean): void {
        this.elementHasSubmitRx.next(hasSubmit);
    }


    /**
     * @description BehaviorSubject for has preview
     */
    private elementHasPreviewRx: BehaviorSubject<boolean> = new BehaviorSubject(false);
    getElementHasPreview(): Observable<boolean> {
        return this.elementHasPreviewRx.asObservable();
    }
    setElementHasPreview(hasPreview: boolean): void {
        this.elementHasPreviewRx.next(hasPreview);
    }


    /**
     * @description BehaviorSubject for has validations
     */
    private elementHasValidationsRx: BehaviorSubject<boolean> = new BehaviorSubject(false);
    getElementHasValidations(): Observable<boolean> {
        return this.elementHasValidationsRx.asObservable();
    }
    setElementHasValidations(hasValidations: boolean): void {
        this.elementHasValidationsRx.next(hasValidations);
    }


    /**
     * @description BehaviorSubject for has styles
     */
    private elementHasStylesRx: BehaviorSubject<boolean> = new BehaviorSubject(false);
    getElementHasStyles(): Observable<boolean> {
        return this.elementHasStylesRx.asObservable();
    }
    setElementHasStyles(hasStyles: boolean): void {
        this.elementHasStylesRx.next(hasStyles);
    }
}












function types() {

    var types = {
        elementType: 'select',
        name: 'elementType',
        label: 'Element Typ',
        required: true,
        multiple: false,
        options: [
            {
                value: 'input',
                label: 'Input',
            },
            {
                value: 'textarea',
                label: 'Textarea',
            },
            {
                value: 'checkbox',
                label: 'Checkbox',
            },
            {
                value: 'radio',
                label: 'Radiobutton',
            },
            {
                value: 'select',
                label: 'Selectbox',
            },
            {
                value: 'info',
                label: 'Infotext',
            },
            {
                value: 'h1',
                label: 'Headline (h1)',
            },
            {
                value: 'h2',
                label: 'Headline (h2)',
            },
            {
                value: 'h3',
                label: 'Headline (h3)',
            },
            {
                value: 'h4',
                label: 'Headline (h4)',
            },
            {
                value: 'devider',
                label: 'Devider',
            },
            {
                value: 'hiddenDevider',
                label: 'hidden Devider',
            }
        ]
    };
    return types;
}

function nm() {

    var nm = [{
        elementType: 'input',
        name: 'name',
        label: 'Unique Name (ID)',
        required: true,
        styles: [
            'small'
        ]
    },
    {
        elementType: 'checkbox',
        name: 'required',
        label: 'Required Field',
        styles: [
            'small', 'aligned'
        ]
    }];
    return nm;
}

function opts() {

    var opts = {
        input: [
            {
                elementType: 'input',
                name: 'label',
                label: 'Label of the Input',
                styles: [
                    'small'
                ]
            },
            {
                elementType: 'select',
                name: 'type',
                label: 'Type of Content',
                required: true,
                multiple: false,
                value: 'text',
                options: [
                    {
                        value: 'text',
                        label: 'Text'
                    },
                    {
                        value: 'password',
                        label: 'Password'
                    },
                    {
                        value: 'date',
                        label: 'Date'
                    },
                    {
                        value: 'number',
                        label: 'Number'
                    }
                ],
                styles: [
                    'small'
                ]
            }
        ],
        textarea: [
            {
                elementType: 'input',
                name: 'label',
                label: 'Label of the Input',
                styles: [
                    'small'
                ]
            },
            {
                elementType: 'input',
                name: 'placeholder',
                label: 'Placeholder'
            }
        ],
        checkbox: [
            {
                elementType: 'input',
                name: 'label',
                label: 'Label',
                required: true
            }
        ],
        radio: [
            {
                elementType: 'select',
                name: 'options',
                label: 'Available Options',
                required: true,
                multiple: true,
                options: [
                    {
                        value: 'text',
                        label: 'Text'
                    },
                    {
                        value: 'password',
                        label: 'Password'
                    },
                    {
                        value: 'date',
                        label: 'Date'
                    },
                    {
                        value: 'number',
                        label: 'Number'
                    }
                ]
            }

        ],
        select: [
            {
                elementType: 'input',
                name: 'label',
                label: 'Label',
            },
            {
                elementType: 'select',
                name: 'options',
                label: 'Available Options',
                required: true,
                multiple: true,
                options: [
                    {
                        value: 'text',
                        label: 'Text'
                    },
                    {
                        value: 'password',
                        label: 'Password'
                    },
                    {
                        value: 'date',
                        label: 'Date'
                    },
                    {
                        value: 'number',
                        label: 'Number'
                    }
                ]
            }
        ],
        info: [
            {
                elementType: 'textarea',
                name: 'value',
                label: 'Content',
                required: true
            }
        ],
        h1: [
            {
                elementType: 'textarea',
                name: 'value',
                label: 'Content',
                required: true
            }
        ],
        h2: [
            {
                elementType: 'textarea',
                name: 'value',
                label: 'Content',
                required: true
            }
        ],
        h3: [
            {
                elementType: 'textarea',
                name: 'value',
                label: 'Content',
                required: true
            }
        ],
        h4: [
            {
                elementType: 'textarea',
                name: 'value',
                label: 'Content',
                required: true
            }
        ],
        devider: [

        ],
        hiddenDevider: [

        ]
    };
    return opts;
}

function validations() {
    var validations = {
        input: [
            {
                elementType: 'select',
                name: 'validations',
                label: 'Validation Options',
                multiple: true,
                options: [
                    {
                        value: 'isEmail',
                        label: 'Email Validation'
                    },
                    {
                        value: 'useExternalEmail',
                        label: 'External Email Validation'
                    },
                    {
                        value: 'minLength',
                        label: 'min Length of 8'
                    },
                    {
                        value: 'maxLength',
                        label: 'max Length of 15'
                    },
                    {
                        value: 'toBeTrue',
                        label: 'Required'
                    }
                ],
                styles: [
                    'small'
                ]
            }
        ],
        textarea: [

        ]
    };
    return validations;
}

function styles() {
    var styles = {
        elementType: 'select',
        name: 'styles',
        label: 'Style Options',
        multiple: true,
        options: [
            {
                value: 'small',
                label: 'Small'
            }
        ],
        styles: [
            'small'
        ]
    };
    return styles;
}
