import { Injectable } from '@angular/core';

import { Observable, Observer } from 'rxjs/Rx';

import { FormApiMock } from './';

import { Form } from './../../../swagger';

@Injectable()
export class FormEndpoint {

    constructor() { }

    public addForm(token?: string, form?: Form, extraHttpRequestParams?: any): Observable<Form> {
        /** hack */if (!token) { token = localStorage.getItem('authtoken'); }
        console.log('%cMock:' + '%c addForm', 'color: #F44336', 'color: #fefefe');
        let newform = this._formAdd(form);
        return new Observable((observer: Observer<any>) => {
            setTimeout(() => {
                if (!token) {
                    console.error(`No Token!`);
                    observer.error(`No Token!`);
                } else if (form) {
                    observer.next(newform);
                } else {
                    console.error('Error creating Form');
                    observer.error('Error creating Form');
                }
                observer.complete();
            }, 500);
        });
    }

    public getForms(token?: string, extraHttpRequestParams?: any): Observable<any> {
        /** hack */if (!token) { token = localStorage.getItem('authtoken'); }
        console.log('%cMock:' + '%c getForms', 'color: #F44336', 'color: #fefefe');
        let forms = this._forms();
        return new Observable((observer: Observer<any>) => {
            setTimeout(() => {
                if (!token) {
                    console.error(`No Token!`);
                    observer.error(`No Token!`);
                } else if (forms) {
                    observer.next(forms);
                } else {
                    console.error('No Forms found');
                    observer.error('No Forms found');
                }
                observer.complete();
            }, 500);
        });
    }

    public getFormById(formId: string, token?: string, extraHttpRequestParams?: any): Observable<any> {
        /** hack */if (!token) { token = localStorage.getItem('authtoken'); }
        console.log('%cMock:' + `%c getFormById ${formId}`, 'color: #F44336', 'color: #fefefe');
        let form = this._form(formId);
        return new Observable((observer: Observer<any>) => {
            setTimeout(() => {
                if (!token) {
                    console.error(`No Token!`);
                    observer.error(`No Token!`);
                } else if (form) {
                    observer.next(form);
                } else {
                    console.error(`No Form with ID ${formId} found`);
                    observer.error(`No Form with ID ${formId} found`);
                }
                observer.complete();
            }, 500);
        });
    }

    public updateFormById(formId: number, token?: string, form?: Form, extraHttpRequestParams?: any): Observable<any> {
        /** hack */if (!token) { token = localStorage.getItem('authtoken'); }
        console.log('%cMock:' + `%c updateFormById ${formId}`, 'color: #F44336', 'color: #fefefe');
        let updatedForm = this._formUpdate(formId.toString(), form);
        return new Observable((observer: Observer<any>) => {
            setTimeout(() => {
                if (!token) {
                    console.error(`No Token!`);
                    observer.error(`No Token!`);
                } else if (form) {
                    observer.next(updatedForm);
                } else {
                    console.error(`No Form with ID ${formId} found`);
                    observer.error(`No Form with ID ${formId} found`);
                }
                observer.complete();
            }, 500);
        });
    }

    /**
     * Mock Server
     */

    // tslint:disable-next-line:member-ordering
    private _list: Form[] = [
        FormApiMock.FORM,
        FormApiMock.FORM_COMPLEX
    ];

    private _forms(): Form[] {
        return JSON.parse(JSON.stringify(this._list));
    }

    private _formAdd(form: Form): Form {
        let id: string;
        if (!this._list.length) {
            id = 'Q';
        } else {
            id = this._list[this._list.length - 1].id + 'Q';
        }
        form.id = id;
        form.created = Date.now();
        this._list.push(form);
        return JSON.parse(JSON.stringify(this._list[this._list.length - 1]));
    }

    private _form(id?: string): Form {
        let result: Form;
        let list = this._list;
        for (let i = 0, length = list.length; i < length; i++) {
            if (list[i].id === id) {
                result = list[i];
            }
        }
        if (!result) { return null; }
        return JSON.parse(JSON.stringify(result));
    }

    private _formUpdate(id: string, form: Form) {
        let list = this._list;
        for (let i = 0, length = list.length; i < length; i++) {
            if (list[i].id === id) {
                list[i] = form;
                return JSON.parse(JSON.stringify(list[i]));
            }
        }
        return null;
    }

}



// tslint:disable-next-line:max-line-length
// tslint:disable-next-line:no-unused-variable
let notennachmeldung = [{ 'fieldType': 'h3', 'name': 'header', 'value': 'Antrag auf Notennachmeldung/Notenänderung* an die Prüfungskommision' }, { 'fieldType': 'select', 'name': 'studiengang', 'required': true, 'label': '', 'placeholder': 'Sudiengang wählen', 'optionTable': '', 'options': [{ 'value': 'architektur', 'label': 'Studiengang Architektur' }, { 'value': 'bauingenieurwesen', 'label': 'Studiengang Bauingenieurwesen' }, { 'value': 'e2d', 'label': 'Studiengang E2D' }], 'value': '' }, { 'fieldType': 'input', 'name': 'name', 'required': true, 'label': 'Name, Vorname', 'contentType': 'text', 'placeholder': '', 'styles': ['small'], 'value': '' }, { 'fieldType': 'input', 'name': 'matnr', 'required': true, 'label': 'Matrikelnummer', 'contentType': 'number', 'placeholder': '', 'styles': ['small'], 'value': '' }, { 'fieldType': 'input', 'name': 'street', 'required': true, 'label': 'Straße', 'contentType': 'text', 'placeholder': '', 'styles': ['small'], 'value': '' }, { 'fieldType': 'input', 'name': 'housenr', 'required': false, 'label': 'Hausnummer', 'contentType': 'number', 'placeholder': '', 'styles': ['small'], 'value': '' }, { 'fieldType': 'input', 'name': 'plz', 'required': '', 'label': 'Postleitzahl', 'contentType': 'number', 'placeholder': '', 'styles': ['small'], 'value': '' }, { 'fieldType': 'input', 'name': 'city', 'required': true, 'label': 'Wohnort', 'contentType': 'text', 'placeholder': '', 'styles': ['small'], 'value': '' }, { 'fieldType': 'input', 'name': 'email', 'required': '', 'label': 'Email', 'contentType': 'text', 'placeholder': '', 'styles': ['small'], 'value': '' }, { 'fieldType': 'input', 'name': 'phone', 'required': '', 'label': 'Telefon', 'contentType': 'number', 'placeholder': '', 'styles': ['small'], 'value': '' }, { 'fieldType': 'devider', 'name': 'dev1', 'value': '' }, { 'fieldType': 'input', 'name': 'fach', 'required': true, 'label': 'Prüfungsfach', 'contentType': 'text', 'placeholder': '', 'value': '' }];

// tslint:disable-next-line:no-unused-variable
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
