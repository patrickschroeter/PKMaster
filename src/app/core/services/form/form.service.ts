import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs/Rx';
import * as _ from 'lodash';

import { AlertService } from './../../../modules/alert';
import { TranslationService } from './../../../modules/translation';
import { Field, Form, SingleFormDto } from './../../../swagger';

import { FormApi } from './../../../swagger/api/FormApi';

@Injectable()
export class FormService {

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
     * @description return the observable for the adding element status
     * @return {Observable}
     */
    public getAddingElement(): Observable<boolean> {
        if (!this.addingElementRx) { this.addingElementRx = new Observable((observer: Observer<any>) => { this.addingElement$ = observer; }); };
        return this.addingElementRx;
    }

    /**
     * @description emits the adding element observable
     * @param {boolean} addingElement
     * @return {void}
     */
    public setAddingElement(addingElement: boolean) {
        if (this.addingElement$) {
            this.addingElement$.next(addingElement);
        }
    }

    /**
     * @description return the observable for editing an element
     * @return {Observable}
     */
    public onEditElement(): Observable<Field> {
        if (!this.editElementRx) { this.editElementRx = new Observable((observer: Observer<any>) => { this.editElement$ = observer; }); };
        return this.editElementRx;
    }

    /**
     * @description returns the observable to get a form by the given id
     * @param {number} id
     * @return {Observable}
     */
    public getFormById(id: string): Observable<Form> {
        // TODO: load real data
        return this.formApi.getFormById(id).map(form => {
            return this.form = form;
        });
    }

    /**
     * @description get the form with the given id with optional sorting
     * @param {string} sort key to sort the result
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
     * @description returns the observable to get the new created form
     * @param {Form} submit to copy or new form
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
        return this.formApi.addForm(111, (newform as SingleFormDto)).map(form => {
            return this.form = form;
        });
    }

    /**
     * @description alert invlid type error
     * @param {string} type the invalid type
     * @return {void}
     */
    public editElementError(type: string): void {
        this.alert.setAlert(
            this.translationService.translate('headerWarning'),
            this.translationService.translate('elementTypeNotValid', [type])
        );
        this.setAddingElement(false);
    }

    /**
     * @description Open the Add Element View with the Element as preset
     * @param {FormElement} element the element to edit
     * @return {void}
     */
    public editElement(element?: Field): void {
        if (!this.form || !this.form.formHasField) { return this.editElement$.next(null); }

        this.editingElementIndex = -1;
        if (element && this.form) {
            for (let i = 0, length = this.form.formHasField.length; i < length; i++) {
                let formElement = this.form.formHasField[i];
                if (formElement && formElement.name === element.name) {
                    this.editingElementIndex = i;
                };
            }
        }

        this.setAddingElement(true);

        if (this.editingElementIndex !== -1) {
            this.editElement$.next(element);
        } else {
            this.editElement$.next(null);
        }
    }

    /**
     * @description Removes the selected Element from the form
     * @param {FormElement} element the element to remove
     * @return {void}
     */
    public removeElement(element?: Field, index?: number): boolean {
        if (typeof index !== 'undefined') {
            if (this.form.formHasField[index].name === element.name) {
                this.form.formHasField.splice(index, 1);
                this.alert.setSuccessHint('element_removed', this.translationService.translate('removedElement', [element.name]));
                this.setAddingElement(false);
                return true;
            }
        }
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
        this.alert.setAlert(
            this.translationService.translate('headerIdentifyingError'),
            this.translationService.translate('identifyingError')
        );
        return false;
    }

    /**
     * @description add the FormElement to the Form
     * @param {FormElement} element the FormElement as JSON
     * @return {boolean}
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
            if (this.editingElementIndex !== -1) {
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
     * @description adds a preset to the current form
     * @param {string} name the key/id/name of the preset
     * @return {void}
     */
    public addPresetToForm(name: string): boolean {
        this.editingElementIndex = -1;
        // TODO: load real data
        // tslint:disable-next-line:max-line-length
        return this.addElementToForm({ 'fieldType': 'input', 'name': 'matnr', 'required': true, 'label': 'Matrikelnummer', 'contentType': 'number', 'placeholder': '', 'styles': ['small'], 'value': '' }, 'clone');
    }

    /**
     * @description returns the template to edit form attributes
     * @param {number} id
     * @return {Observable}
     */
    public getEditFormTemplate(id?: number): Observable<any> {
        let formEdit = [
            {
                fieldType: 'input',
                name: 'title',
                label: 'Form Name:',
                value: id ? this.form.title : '',
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
                label: 'Restricted',
                value: id ? this.form.restrictedAccess : false,
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
     * @description save the attributes (title, etc) of the form
     * @param {Form} form the edit-form with the data to save
     * @return {Observable}
     */
    public saveFormAttributes(submit: Form): Observable<any> {
        // TODO: save real data
        let form = _.cloneDeep(this.form);

        form.title = submit.title;
        form.restrictedAccess = submit.restrictedAccess;

        this.alert.setLoading('saveFormAttributes', this.translationService.translate('saveForm'));
        return this.formApi.updateFormById(form.id, 80082, form).map(result => {
            this.alert.removeHint('saveFormAttributes');
            this.alert.setSuccessHint('saveFormAttributes', this.translationService.translate('savedForm'));
            return this.form = result;
        });
    }


    /**
     * @description Saves the changed Form
     * @return {void}
     */
    public saveForm(): Observable<any> {
        // TODO: save real data
        this.alert.setLoading('saveForm', this.translationService.translate('saveForm'));
        return this.formApi.updateFormById(this.form.id, 80082, this.form).map(form => {
            this.alert.removeHint('saveForm');
            if (form) {
                return this.form = form;
            } else {
                return this.form;
            }
        });
    }
}
