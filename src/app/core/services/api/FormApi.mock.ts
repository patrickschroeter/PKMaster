// tslint:disable:max-line-length
// tslint:disable:no-unused-variable

import { Injectable } from '@angular/core';

import { Observable, Observer } from 'rxjs/Rx';

import { Form } from './../../../swagger';

@Injectable()
export class FormApiMock {

    static FORM: Form = { title: 'Titel der Form', id: '1', formHasField: [{ fieldType: 'h3', name: 'header01', value: 'Hochschule für Angewandte Wissenschaften Augsburg', styles: ['small'] }, { fieldType: 'input', name: 'date', contentType: 'date', label: 'Augsburg, den', styles: ['small'] }] };

    static FORM_COMPLEX: Form = { title: 'Zulassungsantrag - Abschlussarbeit', id: '2', formHasField: [{ fieldType: 'h3', name: 'header01', value: 'Hochschule für Angewandte Wissenschaften Augsburg', styles: ['small'] }, { fieldType: 'input', name: 'date', contentType: 'date', label: 'Augsburg, den', styles: ['small'] }, { fieldType: 'h4', name: 'header02', value: 'Zulassungsantrag - Abschlussarbeit', styles: ['small'] }, { fieldType: 'input', name: 'matnr', contentType: 'number', label: 'Matrikelnummer', validations: ['minLength', 'maxLength'], styles: ['small'] }, { fieldType: 'input', name: 'fakultaet', label: 'Fakultaet', styles: ['small'], value: ['Informatik', 'Gestaltung'] }, { fieldType: 'input', name: 'Studiengang', label: 'Studiengang und Richtung', styles: ['small'] }, { fieldType: 'textarea', name: 'address', label: 'Namen und Adresse', styles: ['small'] }, { fieldType: 'info', name: 'info', value: 'Hinweise für den Antragsteller: Jemand musste Josef K. verleumdet haben, denn ohne dass er etwas Böses getan hätte, wurde er eines Morgens verhaftet. »Wie ein Hund!« sagte er, es war, als sollte die Scham ihn überleben. Als Gregor Samsa eines Morgens aus unruhigen Träumen erwachte, fand er sich in seinem Bett zu einem ungeheueren Ungeziefer verwandelt.', styles: ['small'] }, { fieldType: 'info', name: 'info2', value: 'Und es war ihnen wie eine Bestätigung ihrer neuen Träume und guten Absichten, als am Ziele ihrer Fahrt die Tochter als erste sich erhob und ihren jungen Körper dehnte.' }, { fieldType: 'input', name: 'erstpruefer', label: 'Aufgabensteller/Erstprüfer', styles: ['small'] }, { fieldType: 'input', name: 'zweitpruefer', label: 'Zweitprüfer', styles: ['small'] }, { fieldType: 'radio', name: 'inHouse', label: 'Die Arbeit soll bearbeitet werden:', options: [{ value: 'inside', label: 'im Haus' }, { value: 'outside', label: 'außerhalb der HS' }] }, { fieldType: 'textarea', name: 'thema', label: 'Theme (Zeugnissfassung):', styles: ['small'] }, { fieldType: 'textarea', name: 'company', label: 'Name der Firma:', styles: ['small'] }, { fieldType: 'checkbox', name: 'sign', label: 'Hiermit bestätige ich die Angaben.', validations: ['toBeTrue'] }]};

    private list: Form[] = [];

    constructor() { }

    public addForm(token?: number, form?: Form, extraHttpRequestParams?: any): Observable<Form> {
        if (form) {
            form.id = '1';
            this.list.push(form);
        };
        return new Observable((observer: Observer<any>) => { form ? observer.next(form) : observer.error('error'); observer.complete(); });
    }

    public getForms(token?: number, extraHttpRequestParams?: any): Observable<any> {
        return new Observable((observer: Observer<any>) => { observer.next(this.list); observer.complete(); });
    }

    public getFormById(formId: string, token?: number, extraHttpRequestParams?: any): Observable<any> {
        let form = FormApiMock.FORM; form.id = formId;
        return new Observable((observer: Observer<any>) => { formId ? observer.next(form) : observer.error('error'); observer.complete(); });
    }

    public updateFormById(formId: string, token?: number, form?: Form, extraHttpRequestParams?: any): Observable<any> {
        return new Observable((observer: Observer<any>) => { formId === form.id ? observer.next(form) : observer.error('error'); observer.complete(); });
    }
}

let abschlussarbeit = [{ fieldType: 'h3', name: 'header01', value: 'Hochschule für Angewandte Wissenschaften Augsburg', styles: ['small'] }, { fieldType: 'input', name: 'date', contentType: 'date', label: 'Augsburg, den', styles: ['small'] }, { fieldType: 'h4', name: 'header02', value: 'Zulassungsantrag - Abschlussarbeit', styles: ['small'] }, { fieldType: 'input', name: 'matnr', contentType: 'number', label: 'Matrikelnummer', validations: ['minLength', 'maxLength'], styles: ['small'] }, { fieldType: 'input', name: 'fakultaet', label: 'Fakultaet', styles: ['small'], value: ['Informatik', 'Gestaltung'] }, { fieldType: 'input', name: 'Studiengang', label: 'Studiengang und Richtung', styles: ['small'] }, { fieldType: 'textarea', name: 'address', label: 'Namen und Adresse', styles: ['small'] }, { fieldType: 'info', name: 'info', value: 'Hinweise für den Antragsteller: Jemand musste Josef K. verleumdet haben, denn ohne dass er etwas Böses getan hätte, wurde er eines Morgens verhaftet. »Wie ein Hund!« sagte er, es war, als sollte die Scham ihn überleben. Als Gregor Samsa eines Morgens aus unruhigen Träumen erwachte, fand er sich in seinem Bett zu einem ungeheueren Ungeziefer verwandelt.', styles: ['small'] }, { fieldType: 'info', name: 'info2', value: 'Und es war ihnen wie eine Bestätigung ihrer neuen Träume und guten Absichten, als am Ziele ihrer Fahrt die Tochter als erste sich erhob und ihren jungen Körper dehnte.' }, { fieldType: 'input', name: 'erstpruefer', label: 'Aufgabensteller/Erstprüfer', styles: ['small'] }, { fieldType: 'input', name: 'zweitpruefer', label: 'Zweitprüfer', styles: ['small'] }, { fieldType: 'radio', name: 'inHouse', label: 'Die Arbeit soll bearbeitet werden:', options: [{ value: 'inside', label: 'im Haus' }, { value: 'outside', label: 'außerhalb der HS' }] }, { fieldType: 'textarea', name: 'thema', label: 'Theme (Zeugnissfassung):', styles: ['small'] }, { fieldType: 'textarea', name: 'company', label: 'Name der Firma:', styles: ['small'] }, { fieldType: 'checkbox', name: 'sign', label: 'Hiermit bestätige ich die Angaben.', validations: ['toBeTrue'] }];

let notennachmeldung = [{ 'fieldType': 'h3', 'name': 'header', 'value': 'Antrag auf Notennachmeldung/Notenänderung* an die Prüfungskommision' }, { 'fieldType': 'select', 'name': 'studiengang', 'required': true, 'label': '', 'placeholder': 'Sudiengang wählen', 'optionTable': '', 'options': [{ 'value': 'architektur', 'label': 'Studiengang Architektur' }, { 'value': 'bauingenieurwesen', 'label': 'Studiengang Bauingenieurwesen' }, { 'value': 'e2d', 'label': 'Studiengang E2D' }], 'value': '' }, { 'fieldType': 'input', 'name': 'name', 'required': true, 'label': 'Name, Vorname', 'contentType': 'text', 'placeholder': '', 'styles': ['small'], 'value': '' }, { 'fieldType': 'input', 'name': 'matnr', 'required': true, 'label': 'Matrikelnummer', 'contentType': 'number', 'placeholder': '', 'styles': ['small'], 'value': '' }, { 'fieldType': 'input', 'name': 'street', 'required': true, 'label': 'Straße', 'contentType': 'text', 'placeholder': '', 'styles': ['small'], 'value': '' }, { 'fieldType': 'input', 'name': 'housenr', 'required': false, 'label': 'Hausnummer', 'contentType': 'number', 'placeholder': '', 'styles': ['small'], 'value': '' }, { 'fieldType': 'input', 'name': 'plz', 'required': '', 'label': 'Postleitzahl', 'contentType': 'number', 'placeholder': '', 'styles': ['small'], 'value': '' }, { 'fieldType': 'input', 'name': 'city', 'required': true, 'label': 'Wohnort', 'contentType': 'text', 'placeholder': '', 'styles': ['small'], 'value': '' }, { 'fieldType': 'input', 'name': 'email', 'required': '', 'label': 'Email', 'contentType': 'text', 'placeholder': '', 'styles': ['small'], 'value': '' }, { 'fieldType': 'input', 'name': 'phone', 'required': '', 'label': 'Telefon', 'contentType': 'number', 'placeholder': '', 'styles': ['small'], 'value': '' }, { 'fieldType': 'devider', 'name': 'dev1', 'value': '' }, { 'fieldType': 'input', 'name': 'fach', 'required': true, 'label': 'Prüfungsfach', 'contentType': 'text', 'placeholder': '', 'value': '' }];

let secondform = [
    {
        fieldType: 'datalist',
        name: 'datalist',
        label: 'Datalist',
        required: true
    },
    {
        fieldType: 'input',
        name: 'email',
        contentType: 'input',
        required: true,
        placeholder: 'E-Mail',
        validations: [
            'useExternalEmail',
            'isEmail'
        ],
        styles: [
            'small'
        ]
    },
    {
        fieldType: 'input',
        name: 'password',
        contentType: 'password',
        required: true,
        placeholder: 'Password',
        validations: [
            'minLength',
            'maxLength'
        ],
        styles: [
            'small'
        ]
    },
    {
        fieldType: 'input',
        name: 'date',
        contentType: 'date'
    },
    {
        fieldType: 'input',
        name: 'text',
    },
    {
        fieldType: 'checkbox',
        name: 'privacy',
        label: 'Sell your Soul?',
        validations: [
            'toBeTrue',
        ]
    },
    {
        fieldType: 'select',
        name: 'country',
        label: 'Land',
        required: true,
        multipleSelect: false,
        options: [
            {
                value: 'de',
                label: 'Deutschland'
            },
            {
                value: 'fr',
                label: 'Frankreich'
            },
            {
                value: 'es',
                label: 'Spanien'
            },
            {
                value: 'it',
                label: 'Italien'
            },
            {
                value: 'ir',
                label: 'Irland'
            },
            {
                value: 'bel',
                label: 'Belgien'
            },
            {
                value: 'cr',
                label: 'Croatien'
            },
            {
                value: 'en',
                label: 'USA'
            }
        ]
    },
    {
        fieldType: 'select',
        name: 'country',
        label: 'Land',
        required: true,
        multipleSelect: true,
        placeholder: 'Wo kommst du her?',
        options: [
            {
                value: 'de',
                label: 'Deutschland'
            },
            {
                value: 'fr',
                label: 'Frankreich'
            },
            {
                value: 'es',
                label: 'Spanien'
            },
            {
                value: 'it',
                label: 'Italien'
            },
            {
                value: 'ir',
                label: 'Irland'
            },
            {
                value: 'bel',
                label: 'Belgien'
            },
            {
                value: 'cr',
                label: 'Croatien'
            },
            {
                value: 'en',
                label: 'USA'
            }
        ]
    },
    {
        fieldType: 'radio',
        name: 'language',
        label: 'Sprache',
        required: true,
        options: [
            {
                value: 'de',
                label: 'deutsch'
            },
            {
                value: 'en',
                label: 'englisch'
            }
        ]
    },
    {
        fieldType: 'textarea',
        name: 'desc',
        label: 'Description',
        required: true,
        value: 'de'
    },
    {
        fieldType: 'textarea',
        name: 'info',
        label: 'Info',
        required: true,
        placeholder: 'Something',
        styles: [
            'small'
        ]
    }
];
