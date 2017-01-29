import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs/Rx';
import * as _ from 'lodash';

import { AlertService } from './../../../modules/alert';
import { TranslationService } from './../../../modules/translation';
import { Field, Form, SingleFormDto } from './../../../swagger';

import { FormApi } from './../../../swagger/api/FormApi';

@Injectable()
export class FormService {

    static DEFAULT_TOKEN = 17;

    /** The form to edit */
    private form: Form;
    private forms: Form[];
    /** Index of editing Element */
    private editingElementIndex: number;

    private addingElement$: Observer<boolean>;
    private addingElementRx: Observable<any>;

    private editElementRx: Observable<any>;
    private editElement$: Observer<Field>;

    constructor(
        private alert: AlertService,
        private formApi: FormApi,
        private translationService: TranslationService
    ) { }

    /**
     * return the observable for the adding element status
     * @return {Observable}
     */
    public getAddingElement(): Observable<boolean> {
        if (!this.addingElementRx) { this.addingElementRx = new Observable((observer: Observer<any>) => { this.addingElement$ = observer; }); };
        return this.addingElementRx;
    }

    /**
     * emits the adding element observable
     * @param {Boolean} addingElement
     * @return {void}
     */
    public setAddingElement(addingElement: boolean) {
        if (this.addingElement$) {
            this.addingElement$.next(addingElement);
        }
    }

    /**
     * return the observable for editing an element
     * @return {Observable}
     */
    public onEditElement(): Observable<Field> {
        if (!this.editElementRx) { this.editElementRx = new Observable((observer: Observer<any>) => { this.editElement$ = observer; }); };
        return this.editElementRx;
    }

    /**
     * returns the observable to get a form by the given id
     * @param {String} id
     * @return {Observable}
     */
    public getFormById(id: string): Observable<Form> {
        // TODO: load real data
        return this.formApi.getFormById(id).map(form => {
            return this.form = form;
        });
    }

    /**
     * get the form with the given id with optional sorting
     * @param {String} sort - key to sort the result
     * @return {Observable}
     */
    public getForms(sort?: string): Observable<any> {
        let observable = this.formApi.getForms();
        // TODO: sort on Server
        if (sort) {
            return observable.map(element => {
                return element.sort(function (a, b) { return (a[sort] > b[sort]) ? 1 : ((b[sort] > a[sort]) ? -1 : 0); });
            });
        }
        // TODO: load real data
        return observable.map(forms => {
            return this.forms = forms;
        });
    }

    /**
     * returns the observable to get the new created form
     * @param {Form} submit - to copy or new form
     * @return {Observable}
     */
    public createNewForm(submit: Form): Observable<any> {
        let newform: Form = {
            title: submit.id ? 'Copy of ' + submit.title : submit.title,
            formHasField: submit.id ? submit.formHasField : [],
            restrictedAccess: submit.restrictedAccess,
            isPublic: true
        };

        // TODO: save real data
        return this.formApi.addForm(FormService.DEFAULT_TOKEN, (newform as SingleFormDto)).map(form => {
            return this.form = form;
        });
    }

    /**
     * alert invlid type error
     * @param {String} type - the invalid type
     * @return {void}
     */
    public editElementError(type: string): void {
        this.setAddingElement(false);
        this.alert.setAlert(
            this.translationService.translate('headerWarning'),
            this.translationService.translate('elementTypeNotValid', [type])
        );
    }

    /**
     * Open the Add Element View with the Element as preset
     * @param {FormElement} element - the element to edit
     * @return {void}
     */
    public editElementOfForm(element?: Field): void {
        if (!this.form || !this.form.formHasField) { return this.setEditElement(null); }

        this.editingElementIndex = -1;
        if (element && this.form) {
            for (let i = 0, length = this.form.formHasField.length; i < length; i++) {
                const formElement = this.form.formHasField[i];
                if (formElement && formElement.name === element.name) {
                    this.editingElementIndex = i;
                };
            }
        }

        this.setAddingElement(true);

        if (this.editingElementIndex !== -1) {
            this.setEditElement(element);
        } else {
            this.setEditElement(null);
        }
    }

    /**
     * Emits the given value if someone subscribed for it
     * @param {Field} [element]
     */
    private setEditElement(element?: Field): void {
        if (this.editElement$) {
            this.editElement$.next(element);
        }
    }

    /**
     * Removes the element from the form
     * if there is an index the element is checked by name
     * if there is no index the element is checked by value
     *
     * returns true if element was found and removed from form
     * returns false if element was not found or index didn't match the element
     *
     * @param {Field} [element] - the element to remove
     * @param {Number} [index] - the index of the element in the form
     */
    public removeElement(element?: Field, index?: number): boolean {
        if (!this.form || !this.form.formHasField) { return false; }
        if (typeof index !== 'undefined') {
            if (this.form.formHasField[index] && this.form.formHasField[index].name === element.name) {
                this.form.formHasField.splice(index, 1);
                this.alert.setSuccessHint('element_removed', this.translationService.translate('removedElement', [element.name]));
                this.setAddingElement(false);
                return true;
            }
        } else {
            index = -1;
            for (let i = 0, length = this.form.formHasField.length; i < length; i++) {
                let input = this.form.formHasField[i];
                if (input.name === element.value) {
                    index = i;
                }
            }
            if (index !== -1) {
                if (index === this.editingElementIndex) {
                    this.form.formHasField.splice(index, 1);
                    this.alert.setSuccessHint('element_removed', this.translationService.translate('removedElement', [element.name]));
                    this.setAddingElement(false);
                    return true;
                }
            }
        }
        this.alert.setAlert(
            this.translationService.translate('headerIdentifyingError'),
            this.translationService.translate('identifyingError')
        );
        return false;
    }

    /**
     * Adds a new Element to the Form or updates an existing one
     * @param {Field} element
     * @param {String} [mode] - the mode to add the element. default, clone or add
     */
    public addElementToForm(element: Field, mode?: 'clone' | 'add'): boolean {
        /** Forms don't have Presets yet */
        // delete element.value;
        if (!this.form || !this.form.formHasField) { return false; }
        /** Check if the element.name is Unique in the current Form */
        let index = -1;
        for (let i = 0, length = this.form.formHasField.length; i < length; i++) {
            let input = this.form.formHasField[i];
            if (input.name === element.name) {
                index = i;
            }
        }

        /** Add or Update Element to/in Form, otherwise display Error */
        if (index === -1) {
            if (this.editingElementIndex > -1) {
                this.form.formHasField[this.editingElementIndex] = element;
            } else {
                this.form.formHasField.push(element);
            }
        } else if (index === this.editingElementIndex) {
            this.form.formHasField[this.editingElementIndex] = element;
        } else {
            return false;
        }

        /** Reset the Add Attribute View */
        if (!mode) {
            this.setAddingElement(false);
        }
        this.editingElementIndex = -1;
        return true;
    }

    /**
     * adds a preset to the current form
     * @param {String} name - the key/id/name of the preset
     * @return {void}
     */
    public addPresetToForm(name: string): boolean {
        this.editingElementIndex = -1;
        // TODO: load real data
        // tslint:disable-next-line:max-line-length
        return this.addElementToForm({ 'fieldType': 'input', 'name': 'matnr', 'required': true, 'label': 'Matrikelnummer', 'contentType': 'number', 'placeholder': '', 'styles': ['small'], 'value': '' }, 'clone');
    }

    /**
     * returns the template to edit form attributes
     * @param {String} id
     * @return {Observable}
     */
    public getEditFormTemplate(id?: string): Observable<any> {
        let formEdit = [
            {
                fieldType: 'input',
                name: 'title',
                label: this.translationService.translate('formName'),
                value: (id && this.form) ? this.form.title : '',
                required: true,
                validations: [
                    'minLength'
                ],
                styles: [
                    'small'
                ]
            },
            {
                fieldType: 'checkbox',
                name: 'restrictedAccess',
                label: this.translationService.translate('restricted'),
                value: (id && this.form) ? this.form.restrictedAccess : false,
                styles: [
                    'small',
                    'aligned'
                ]
            }
        ];
        // TODO: load real data
        return new Observable((observer: Observer<any>) => {
            setTimeout(() => {
                observer.next(formEdit);
                observer.complete();
            }, 200);
        });
    }

    /**
     * save the attributes (title, etc) of the form
     * @param {Form} form - the edit-form with the data to save
     * @return {Observable}
     */
    public saveFormAttributes(submit: Form): Observable<any> {
        // TODO: save real data
        let form = _.cloneDeep(this.form);

        form.title = submit.title;
        form.restrictedAccess = submit.restrictedAccess;

        this.alert.setLoading('saveFormAttributes', this.translationService.translate('saveForm'));
        return this.formApi.updateFormById(form.id, FormService.DEFAULT_TOKEN, form).map(result => {
            this.alert.removeHint('saveFormAttributes');
            this.alert.setSuccessHint('saveFormAttributes', this.translationService.translate('savedForm'));
            return this.form = result;
        });
    }


    /**
     * Saves the changed Form
     * @return {void}
     */
    public saveForm(): Observable<any> {
        // TODO: save real data
        this.alert.setLoading('saveForm', this.translationService.translate('saveForm'));
        return this.formApi.updateFormById(this.form.id, FormService.DEFAULT_TOKEN, this.form).map(form => {
            this.alert.removeHint('saveForm');
            if (form) {
                return this.form = form;
            } else {
                return this.form;
            }
        });
    }
}
