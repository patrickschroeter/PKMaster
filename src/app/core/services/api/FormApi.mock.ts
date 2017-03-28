/**
 *
 * @author Patrick Schröter <patrick.schroeter@hotmail.de>
 *
 * @license CreativeCommons BY-NC-SA 4.0 2017
 *
 * This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/.
 *
 */

// tslint:disable:max-line-length
// tslint:disable:no-unused-variable
import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import { Observable, Observer } from 'rxjs/Rx';

import { FormDetailDto } from 'app/swagger';

@Injectable()
export class FormApiMock {

    static FORM: FormDetailDto = new FormDetailDto(<any>{ 'title': 'Notennachberechnung', 'id': '1', 'formHasField': [{ 'fieldType': 'h3', 'name': 'header01', 'value': 'Hochschule für Angewandte Wissenschaften Augsburg', 'styleIds': [] }, { 'fieldType': 'input', 'name': 'firstname', 'required': false, 'label': 'Firstname', 'contentType': 'text', 'placeholder': '', 'value': '' }, { 'fieldType': 'input', 'name': 'lastname', 'required': true, 'label': 'Lastname', 'contentType': 'text', 'placeholder': '', 'value': '' }, { 'fieldType': 'select', 'name': 'docent', 'required': false, 'label': 'Dozent', 'placeholder': '', 'multipleSelect': false, 'enumOptionsTableId': 'user', 'options': [{ 'value': 'b904cc6e-b3a6-42a9-8880-3096be1b6c61', 'label': 'Schroeter, Patrick' }, { 'value': 'ee632373-432e-40f0-9f33-8cc6b684e673', 'label': 'Reichinger, Stephan' }, { 'value': '1', 'label': 'PK-Admin, Admin' }, { 'value': '2', 'label': 'PK-Principal, Principal' }, { 'value': '3', 'label': 'PK-Member, Member' }, { 'value': '4', 'label': 'PK-Docent, Docent' }, { 'value': '5', 'label': 'PK-Student, Student' }, { 'value': '6', 'label': 'PK-Observer, Observer' }, { 'value': '7', 'label': 'PK-Secreteriat, Secreteriat' }], 'value': '' }] });

    static FORM_COMPLEX: FormDetailDto = new FormDetailDto(<any>{ title: 'Zulassungsantrag - Abschlussarbeit', id: '2', formHasField: [{ fieldType: 'h3', name: 'header01', value: 'Hochschule für Angewandte Wissenschaften Augsburg', styleIds: ['small'] }, { fieldType: 'input', name: 'date', contentType: 'date', label: 'Augsburg, den', styleIds: ['small'] }, { fieldType: 'h4', name: 'header02', value: 'Zulassungsantrag - Abschlussarbeit', styleIds: ['small'] }, { fieldType: 'input', name: 'matnr', contentType: 'number', label: 'Matrikelnummer', validationIds: ['minLength', 'maxLength'], styleIds: ['small'] }, { fieldType: 'input', name: 'fakultaet', label: 'Fakultaet', styleIds: ['small'], value: ['Informatik', 'Gestaltung'] }, { fieldType: 'input', name: 'Studiengang', label: 'Studiengang und Richtung', styleIds: ['small'] }, { fieldType: 'textarea', name: 'address', label: 'Namen und Adresse', styleIds: ['small'] }, { fieldType: 'info', name: 'info', value: 'Hinweise für den Antragsteller: Jemand musste Josef K. verleumdet haben, denn ohne dass er etwas Böses getan hätte, wurde er eines Morgens verhaftet. »Wie ein Hund!« sagte er, es war, als sollte die Scham ihn überleben. Als Gregor Samsa eines Morgens aus unruhigen Träumen erwachte, fand er sich in seinem Bett zu einem ungeheueren Ungeziefer verwandelt.', styleIds: ['small'] }, { fieldType: 'info', name: 'info2', value: 'Und es war ihnen wie eine Bestätigung ihrer neuen Träume und guten Absichten, als am Ziele ihrer Fahrt die Tochter als erste sich erhob und ihren jungen Körper dehnte.' }, { fieldType: 'input', name: 'erstpruefer', label: 'Aufgabensteller/Erstprüfer', styleIds: ['small'] }, { fieldType: 'input', name: 'zweitpruefer', label: 'Zweitprüfer', styleIds: ['small'] }, { fieldType: 'radio', name: 'inHouse', label: 'Die Arbeit soll bearbeitet werden:', options: [{ value: 'inside', label: 'im Haus' }, { value: 'outside', label: 'außerhalb der HS' }] }, { fieldType: 'textarea', name: 'thema', label: 'Theme (Zeugnissfassung):', styleIds: ['small'] }, { fieldType: 'textarea', name: 'company', label: 'Name der Firma:', styleIds: ['small'] }, { fieldType: 'checkbox', name: 'sign', label: 'Hiermit bestätige ich die Angaben.', validationIds: ['toBeTrue'] }] });

    private list: FormDetailDto[] = [];

    constructor() { }

    public addForm(form?: FormDetailDto, extraHttpRequestParams?: any): Observable<FormDetailDto> {
        if (form) {
            form.id = '1';
            this.list.push(form);
        };
        return new Observable((observer: Observer<any>) => { form ? observer.next(form) : observer.error('error'); observer.complete(); });
    }

    public getForms(extraHttpRequestParams?: any): Observable<any> {
        return new Observable((observer: Observer<any>) => { observer.next(this.list); observer.complete(); });
    }

    public getFormById(formId: string, extraHttpRequestParams?: any): Observable<any> {
        const form = _.cloneDeep(FormApiMock.FORM); form.id = formId;
        return new Observable((observer: Observer<any>) => { formId ? observer.next(form) : observer.error('error'); observer.complete(); });
    }

    public updateFormById(formId: string, form?: FormDetailDto, extraHttpRequestParams?: any): Observable<any> {
        return new Observable((observer: Observer<any>) => { true ? observer.next(new FormDetailDto(form)) : observer.error('error'); observer.complete(); });
    }
}

const abschlussarbeit = [{ fieldType: 'h3', name: 'header01', value: 'Hochschule für Angewandte Wissenschaften Augsburg', styleIds: ['small'] }, { fieldType: 'input', name: 'date', contentType: 'date', label: 'Augsburg, den', styleIds: ['small'] }, { fieldType: 'h4', name: 'header02', value: 'Zulassungsantrag - Abschlussarbeit', styleIds: ['small'] }, { fieldType: 'input', name: 'matnr', contentType: 'number', label: 'Matrikelnummer', validationIds: ['minLength', 'maxLength'], styleIds: ['small'] }, { fieldType: 'input', name: 'fakultaet', label: 'Fakultaet', styleIds: ['small'], value: ['Informatik', 'Gestaltung'] }, { fieldType: 'input', name: 'Studiengang', label: 'Studiengang und Richtung', styleIds: ['small'] }, { fieldType: 'textarea', name: 'address', label: 'Namen und Adresse', styleIds: ['small'] }, { fieldType: 'info', name: 'info', value: 'Hinweise für den Antragsteller: Jemand musste Josef K. verleumdet haben, denn ohne dass er etwas Böses getan hätte, wurde er eines Morgens verhaftet. »Wie ein Hund!« sagte er, es war, als sollte die Scham ihn überleben. Als Gregor Samsa eines Morgens aus unruhigen Träumen erwachte, fand er sich in seinem Bett zu einem ungeheueren Ungeziefer verwandelt.', styleIds: ['small'] }, { fieldType: 'info', name: 'info2', value: 'Und es war ihnen wie eine Bestätigung ihrer neuen Träume und guten Absichten, als am Ziele ihrer Fahrt die Tochter als erste sich erhob und ihren jungen Körper dehnte.' }, { fieldType: 'input', name: 'erstpruefer', label: 'Aufgabensteller/Erstprüfer', styleIds: ['small'] }, { fieldType: 'input', name: 'zweitpruefer', label: 'Zweitprüfer', styleIds: ['small'] }, { fieldType: 'radio', name: 'inHouse', label: 'Die Arbeit soll bearbeitet werden:', options: [{ value: 'inside', label: 'im Haus' }, { value: 'outside', label: 'außerhalb der HS' }] }, { fieldType: 'textarea', name: 'thema', label: 'Theme (Zeugnissfassung):', styleIds: ['small'] }, { fieldType: 'textarea', name: 'company', label: 'Name der Firma:', styleIds: ['small'] }, { fieldType: 'checkbox', name: 'sign', label: 'Hiermit bestätige ich die Angaben.', validationIds: ['toBeTrue'] }];

const notennachmeldung = [{ 'fieldType': 'h3', 'name': 'header', 'value': 'Antrag auf Notennachmeldung/Notenänderung* an die Prüfungskommision' }, { 'fieldType': 'select', 'name': 'studiengang', 'required': true, 'label': '', 'placeholder': 'Sudiengang wählen', 'optionTable': '', 'options': [{ 'value': 'architektur', 'label': 'Studiengang Architektur' }, { 'value': 'bauingenieurwesen', 'label': 'Studiengang Bauingenieurwesen' }, { 'value': 'e2d', 'label': 'Studiengang E2D' }], 'value': '' }, { 'fieldType': 'input', 'name': 'name', 'required': true, 'label': 'Name, Vorname', 'contentType': 'text', 'placeholder': '', 'styles': ['small'], 'value': '' }, { 'fieldType': 'input', 'name': 'matnr', 'required': true, 'label': 'Matrikelnummer', 'contentType': 'number', 'placeholder': '', 'styles': ['small'], 'value': '' }, { 'fieldType': 'input', 'name': 'street', 'required': true, 'label': 'Straße', 'contentType': 'text', 'placeholder': '', 'styles': ['small'], 'value': '' }, { 'fieldType': 'input', 'name': 'housenr', 'required': false, 'label': 'Hausnummer', 'contentType': 'number', 'placeholder': '', 'styles': ['small'], 'value': '' }, { 'fieldType': 'input', 'name': 'plz', 'required': '', 'label': 'Postleitzahl', 'contentType': 'number', 'placeholder': '', 'styles': ['small'], 'value': '' }, { 'fieldType': 'input', 'name': 'city', 'required': true, 'label': 'Wohnort', 'contentType': 'text', 'placeholder': '', 'styles': ['small'], 'value': '' }, { 'fieldType': 'input', 'name': 'email', 'required': '', 'label': 'Email', 'contentType': 'text', 'placeholder': '', 'styles': ['small'], 'value': '' }, { 'fieldType': 'input', 'name': 'phone', 'required': '', 'label': 'Telefon', 'contentType': 'number', 'placeholder': '', 'styles': ['small'], 'value': '' }, { 'fieldType': 'devider', 'name': 'dev1', 'value': '' }, { 'fieldType': 'input', 'name': 'fach', 'required': true, 'label': 'Prüfungsfach', 'contentType': 'text', 'placeholder': '', 'value': '' }];

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
