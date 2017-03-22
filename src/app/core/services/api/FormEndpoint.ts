import { Injectable } from '@angular/core';

import { Observable, Observer } from 'rxjs/Rx';

import { FormApiMock } from './';

import { FormDetailDto } from 'app/swagger';

@Injectable()
export class FormEndpoint {

    constructor() { }

    public addForm(form?: FormDetailDto, extraHttpRequestParams?: any): Observable<FormDetailDto> {
        console.log('%cMock:' + '%c addForm', 'color: #F44336', 'color: #fefefe');
        const newform = this._formAdd(form);
        return new Observable((observer: Observer<any>) => {
            setTimeout(() => {
                if (form) {
                    observer.next(newform);
                } else {
                    console.error('Error creating Form');
                    observer.error('Error creating Form');
                }
                observer.complete();
            }, 500);
        });
    }

    public getForms(extraHttpRequestParams?: any): Observable<any> {
        console.log('%cMock:' + '%c getForms', 'color: #F44336', 'color: #fefefe');
        const forms = this._forms();
        return new Observable((observer: Observer<any>) => {
            setTimeout(() => {
                if (forms) {
                    observer.next(forms);
                } else {
                    console.error('No Forms found');
                    observer.error('No Forms found');
                }
                observer.complete();
            }, 500);
        });
    }

    public getFormById(formId: string, extraHttpRequestParams?: any): Observable<any> {
        console.log('%cMock:' + `%c getFormById ${formId}`, 'color: #F44336', 'color: #fefefe');
        const form = this._form(formId);
        return new Observable((observer: Observer<any>) => {
            setTimeout(() => {
                if (form) {
                    observer.next(form);
                } else {
                    console.error(`No Form with ID ${formId} found`);
                    observer.error(`No Form with ID ${formId} found`);
                }
                observer.complete();
            }, 500);
        });
    }

    public updateFormById(formId: string, form?: FormDetailDto, extraHttpRequestParams?: any): Observable<any> {
        console.log('%cMock:' + `%c updateFormById ${formId}`, 'color: #F44336', 'color: #fefefe');
        const updatedForm = this._formUpdate(formId.toString(), form);
        return new Observable((observer: Observer<any>) => {
            setTimeout(() => {
                if (form) {
                    observer.next(updatedForm);
                } else {
                    console.error(`No Form with ID ${formId} found`);
                    observer.error(`No Form with ID ${formId} found`);
                }
                observer.complete();
            }, 500);
        });
    }

    public deleteFormById(formId: string, extraHttpRequestParams?: any): Observable<{}> {
        return this.observe(this._delete(formId));
    }

    /**
     * Helper observer
     */
    private observe<T>(obj: T): Observable<T> {
        return new Observable<T>((observer: Observer<T>) => {
            setTimeout(() => {
                observer.next(obj);
                observer.complete();
            }, 500);
        });
    }

    /**
     * Mock Server
     */

    // tslint:disable-next-line:member-ordering
    private _list: FormDetailDto[] = [
        FormApiMock.FORM,
        FormApiMock.FORM_COMPLEX
    ];

    private _forms(): FormDetailDto[] {
        return JSON.parse(JSON.stringify(this._list));
    }

    private _formAdd(form: FormDetailDto): FormDetailDto {
        let id: string;
        if (!this._list.length) {
            id = 'Q';
        } else {
            id = this._list[this._list.length - 1].id + 'Q';
        }
        form.id = id;
        form.created = new Date();
        this._list.push(form);
        return JSON.parse(JSON.stringify(this._list[this._list.length - 1]));
    }

    private _form(id?: string): FormDetailDto {
        let result: FormDetailDto;
        const list = this._list;
        for (let i = 0; i < list.length; i++) {
            if (list[i].id === id) {
                result = list[i];
            }
        }
        if (!result) { return null; }
        return JSON.parse(JSON.stringify(result));
    }

    private _formUpdate(id: string, form: FormDetailDto) {
        const list = this._list;
        for (let i = 0; i < list.length; i++) {
            if (list[i].id === id) {
                list[i] = form;
                return JSON.parse(JSON.stringify(list[i]));
            }
        }
        return null;
    }

    private _delete(id: string): boolean {
        let index = -1;
        for (let i = 0; i < this._list.length; i++) {
            const element = this._list[i];
            if (element.id === id) {
                index = i;
            }
        }
        if (index === -1) {
            return false;
        } else {
            this._list.splice(index, 1);
            return true;
        }
    }

}



// tslint:disable-next-line:max-line-length
// tslint:disable-next-line:no-unused-variable
const notennachmeldung = [{ 'fieldType': 'h3', 'name': 'header', 'value': 'Antrag auf Notennachmeldung/Notenänderung* an die Prüfungskommision' }, { 'fieldType': 'select', 'name': 'studiengang', 'required': true, 'label': '', 'placeholder': 'Sudiengang wählen', 'optionTable': '', 'options': [{ 'value': 'architektur', 'label': 'Studiengang Architektur' }, { 'value': 'bauingenieurwesen', 'label': 'Studiengang Bauingenieurwesen' }, { 'value': 'e2d', 'label': 'Studiengang E2D' }], 'value': '' }, { 'fieldType': 'input', 'name': 'name', 'required': true, 'label': 'Name, Vorname', 'contentType': 'text', 'placeholder': '', 'styles': ['small'], 'value': '' }, { 'fieldType': 'input', 'name': 'matnr', 'required': true, 'label': 'Matrikelnummer', 'contentType': 'number', 'placeholder': '', 'styles': ['small'], 'value': '' }, { 'fieldType': 'input', 'name': 'street', 'required': true, 'label': 'Straße', 'contentType': 'text', 'placeholder': '', 'styles': ['small'], 'value': '' }, { 'fieldType': 'input', 'name': 'housenr', 'required': false, 'label': 'Hausnummer', 'contentType': 'number', 'placeholder': '', 'styles': ['small'], 'value': '' }, { 'fieldType': 'input', 'name': 'plz', 'required': '', 'label': 'Postleitzahl', 'contentType': 'number', 'placeholder': '', 'styles': ['small'], 'value': '' }, { 'fieldType': 'input', 'name': 'city', 'required': true, 'label': 'Wohnort', 'contentType': 'text', 'placeholder': '', 'styles': ['small'], 'value': '' }, { 'fieldType': 'input', 'name': 'email', 'required': '', 'label': 'Email', 'contentType': 'text', 'placeholder': '', 'styles': ['small'], 'value': '' }, { 'fieldType': 'input', 'name': 'phone', 'required': '', 'label': 'Telefon', 'contentType': 'number', 'placeholder': '', 'styles': ['small'], 'value': '' }, { 'fieldType': 'devider', 'name': 'dev1', 'value': '' }, { 'fieldType': 'input', 'name': 'fach', 'required': true, 'label': 'Prüfungsfach', 'contentType': 'text', 'placeholder': '', 'value': '' }];

// tslint:disable-next-line:no-unused-variable
const secondform = [
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
        validationIds: [
            'useExternalEmail',
            'isEmail'
        ],
        styleIds: [
            'small'
        ]
    },
    {
        fieldType: 'input',
        name: 'password',
        contentType: 'password',
        required: true,
        placeholder: 'Password',
        validationIds: [
            'minLength',
            'maxLength'
        ],
        styleIds: [
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
        validationIds: [
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
        styleIds: [
            'small'
        ]
    }
];
