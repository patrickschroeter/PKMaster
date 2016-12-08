import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs/Rx';

import { AlertService } from './../alert';
import { Field, Form } from './../../../swagger';

import { FormApiMock } from './../api';

@Injectable()
export class FormService {

    /** The form to edit */
    private form: Form;
    private forms: Form[];
    /** Index of editing Element */
    private editingElementIndex: number;

    private addingElement$: Observer<boolean>;
    private addingElementRx: Observable<any>;

    private editElementRx: Observable<Field>;
    private editElement$: Observer<Field>;

    constructor(private alert: AlertService, private formApi: FormApiMock) { }

    /**
     * @description return the observable for the adding element status
     * @return {Observable}
     */
    public getAddingElement(): Observable<boolean> {
        if (!this.addingElementRx) { this.addingElementRx = new Observable(observer => { this.addingElement$ = observer; }); };
        return this.addingElementRx;
    }

    /**
     * @description emits the adding element observable
     * @param {boolean} addingElement
     * @return {void}
     */
    public setAddingElement(addingElement: boolean) {
        this.addingElement$.next(addingElement);
    }

    /**
     * @description return the observable for editing an element
     * @return {Observable}
     */
    public onEditElement(): Observable<Field> {
        if (!this.editElementRx) { this.editElementRx = new Observable(observer => { this.editElement$ = observer; }); };
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
                return element.sort(function(a, b) {return (a[sort] > b[sort]) ? 1 : ((b[sort] > a[sort]) ? -1 : 0); });
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
        console.log(submit);
        let newform: Form = {
            title: submit.id ? 'Copy of ' + submit.title : submit.title,
            elements: submit.id ? submit.elements : [],
            restrictedAccess: submit.restrictedAccess,
            isPublic: true
        };

        // TODO: save real data
        return this.formApi.addForm(111, newform).map(form => {
            return this.form = form;
        });
    }

    /**
     * @description alert invlid type error
     * @param {string} type the invalid type
     * @return {void}
     */
    public editElementError(type: string): void {
        this.alert.setAlert('Warning', `The requrested Element Type (${type}) is not valid. Please Contact your administrator.`);
        this.setAddingElement(false);
    }

    /**
     * @description Open the Add Element View with the Element as preset
     * @param {FormElement} element the element to edit
     * @return {void}
     */
    public editElement(element?: Field): void {

        this.editingElementIndex = -1;
        if (element) {
            for (let i = 0, length = this.form.elements.length; i < length; i++) {
                let formElement = this.form.elements[i];
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
            if (this.form.elements[index].name === element.name) {
                this.form.elements.splice(index, 1);
                this.alert.setSuccessHint('element_removed', `Element ${element.name} removed.`);
                this.setAddingElement(false);
                return true;
            }
        }
        index = -1;
        for (let i = 0, length = this.form.elements.length; i < length; i++) {
            let input = this.form.elements[i];
            if (input.name === element.value) {
                index = i;
            }
        }
        if (index !== -1) {
            if (index === this.editingElementIndex) {
                this.form.elements.splice(index, 1);
                this.alert.setSuccessHint('element_removed', `Element ${element.name} removed.`);
                this.setAddingElement(false);
                return true;
            }
        }
        this.alert.setAlert(
            'Identifying Error',
            `There has been an error identifying the correct element.
            Please make sure the Id/Name has not been change.`);
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

        /** Check if the element.name is Unique in the current Form */
        let index = -1;
        for (let i = 0, length = this.form.elements.length; i < length; i++) {
            let input = this.form.elements[i];
            if (input.name === element.name) {
                index = i;
            }
        }

        /** Add or Update Element to/in Form, otherwise display Error */
        if (index === -1) {
            if (this.editingElementIndex !== -1) {
                this.form.elements[this.editingElementIndex] = element;
            } else {
                this.form.elements.push(element);
            }
        } else if (index === this.editingElementIndex) {
            this.form.elements[this.editingElementIndex] = element;
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
    public addPresetToForm(name: string): void {
        this.editingElementIndex = -1;
        // TODO: load real data
        return this.addElementToForm({"fieldType":"input","name":"matnr","required":true,"label":"Matrikelnummer","type":"number","placeholder":"","styles":["small"],"value":""}, 'clone');
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
        return new Observable(observer => {
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
        this.form.title = submit.title;
        this.form.restrictedAccess = submit.restrictedAccess;
        return this.formApi.updateFormById(submit.id, 80082, submit).map(form => {
            return this.form = form;
        });
    }


    /**
     * @description Saves the changed Form
     * @return {void}
     */
    public saveForm(): void {
        // stringify
        console.log(this.form);
        let elements = [];
        for (let i = 0, length = this.form.elements.length; i < length; i++) {
            let element = Object.assign({}, this.form.elements[i]);
            delete element['formControl'];
            elements.push(element);
        }
        console.log(JSON.stringify(elements));
        // TODO: save real data
        return this.formApi.updateFormById(this.form.id, 80082, this.form).map(form => {
            return this.form = form;
        });
    }
}
