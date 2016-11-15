import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs/Rx';

import { AlertService } from './../alert';
import { FormElement, Form } from './../../../swagger';

@Injectable()
export class FormService {

    /** The form to edit */
    private form;
    /** Index of editing Element */
    private editingElementIndex: number;

    private addingElement$: Observer<boolean>;
    private addingElementRx: Observable<any>;

    private editElementRx: Observable<FormElement>;
    private editElement$: Observer<FormElement>;

    constructor(private alert: AlertService) {
        this.form = {
            title: 'Titel der Form',
            id: 13,
            elements: [{ elementType: 'h3', name: 'header01', value: 'Hochschule für Angewandte Wissenschaften Augsburg', styles: ['small'] }, { elementType: 'input', name: 'date', type: 'date', label: 'Augsburg, den', styles: ['small'] }, { elementType: 'h4', name: 'header02', value: 'Zulassungsantrag - Abschlussarbeit', styles: ['small'] }, { elementType: 'input', name: 'matnr', type: 'number', label: 'Matrikelnummer', validations: ['minLength', 'maxLength'], styles: ['small'] }, { elementType: 'input', name: 'fakultaet', label: 'Fakultaet', styles: ['small'], value: ['Informatik', 'Gestaltung'] }, { elementType: 'input', name: 'Studiengang', label: 'Studiengang und Richtung', styles: ['small'] }, { elementType: 'textarea', name: 'address', label: 'Namen und Adresse', styles: ['small'] }, { elementType: 'info', name: 'info', value: 'Hinweise für den Antragsteller: Jemand musste Josef K. verleumdet haben, denn ohne dass er etwas Böses getan hätte, wurde er eines Morgens verhaftet. »Wie ein Hund!« sagte er, es war, als sollte die Scham ihn überleben. Als Gregor Samsa eines Morgens aus unruhigen Träumen erwachte, fand er sich in seinem Bett zu einem ungeheueren Ungeziefer verwandelt.', styles: ['small'] }, { elementType: 'info', name: 'info2', value: 'Und es war ihnen wie eine Bestätigung ihrer neuen Träume und guten Absichten, als am Ziele ihrer Fahrt die Tochter als erste sich erhob und ihren jungen Körper dehnte.' }, { elementType: 'input', name: 'erstpruefer', label: 'Aufgabensteller/Erstprüfer', styles: ['small'] }, { elementType: 'input', name: 'zweitpruefer', label: 'Zweitprüfer', styles: ['small'] }, { elementType: 'radio', name: 'inHouse', label: 'Die Arbeit soll bearbeitet werden:', options: [{ value: 'inside', label: 'im Haus' }, { value: 'outside', label: 'außerhalb der HS' }] }, { elementType: 'textarea', name: 'thema', label: 'Theme (Zeugnissfassung):', styles: ['small'] }, { elementType: 'textarea', name: 'company', label: 'Name der Firma:', styles: ['small'] }, { elementType: 'checkbox', name: 'sign', label: 'Hiermit bestätige ich die Angaben.', validations: ['toBeTrue'] }]
        };
    }

    /**
     * @description return the observable for the adding element status
     * @return {Observable}
     */
    getAddingElement(): Observable<boolean> {
        if (!this.addingElementRx) { this.addingElementRx = new Observable(observer => { this.addingElement$ = observer; }); };
        return this.addingElementRx;
    }
    /**
     * @description emits the adding element observable
     * @param {boolean} addingElement
     * @return {void}
     */
    setAddingElement(addingElement: boolean) {
        this.addingElement$.next(addingElement);
    }

    /**
     * @description return the observable for editing an element
     * @return {Observable}
     */
    onEditElement(): Observable<FormElement> {
        if (!this.editElementRx) { this.editElementRx = new Observable(observer => { this.editElement$ = observer; }); };
        return this.editElementRx;
    }

    /**
     * @description returns the observable to get a form by the given id
     * @param {number} id
     * @return {Observable}
     */
    getFormById(id: number): Observable<Form> {
        return new Observable(observer => {
            /** http getFormById(id) => this.currentForm = result */
            setTimeout(() => {
                observer.next(this.form);
                observer.complete();
            }, 200);
        });
    }

    /**
     * @description returns the observable to get the new created form
     * @param {Form} form
     * @return {Observable}
     */
    createNewForm(form: Form): Observable<Form> {
        this.form = {
            title: form['form-name'],
            id: 13,
            elements: []
        };

        return new Observable(observer => {
            setTimeout(() => {
                observer.next(this.form);
                observer.complete();
            }, 200);
        });
    }

    /**
     * @description alert invlid type error
     * @param {string} type the invalid type
     * @return {void}
     */
    editElementError(type: string): void {
        this.alert.setAlert('Warning', `The requrested Element Type (${type}) is not valid. Please Contact your administrator.`);
        this.setAddingElement(false);
    }


    /**
     * @description Open the Add Element View with the Element as preset
     * @param {FormElement} element the element to edit
     * @return {void}
     */
    editElement(element?: FormElement): void {

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
    removeElement(element?: FormElement): boolean {
        let index = -1;
        for (let i = 0, length = this.form.elements.length; i < length; i++) {
            let input = this.form.elements[i];
            if (input.name === element.value) {
                index = i;
            }
        }
        if (index !== -1) {
            if (index === this.editingElementIndex) {
                this.form.elements.splice(index, 1);
                this.alert.setSuccessHint(`Element ${element.name} removed.`);
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
    addElementToForm(element: FormElement): boolean {
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
        this.setAddingElement(false);
        this.editingElementIndex = -1;
        return true;
    }

    /**
     * @description returns the template to edit form attributes
     * @param {number} id
     * @return {Observable}
     */
    getEditFormTemplate(id?: number): Observable<any> {
        let formEdit = [
            {
                elementType: 'input',
                name: 'title',
                label: 'Titel des Antrages',
                value: this.form.title,
                required: true,
                placeholder: 'Form Title'
            }
        ];
        return new Observable(observer => {
            setTimeout(() => {
                observer.next(formEdit);
                observer.complete();
            }, 200);
        });
    }

    saveFormAttributes(form): Observable<any> {
        return new Observable(observer => {
            setTimeout(() => {
                this.form.title = form.title;
                observer.next(true);
                observer.complete();
            }, 200);
        });
    }


    /**
     * @description Saves the changed Form
     * @return {void}
     */
    saveForm(): void {
        console.log(this.form);
    }
}
