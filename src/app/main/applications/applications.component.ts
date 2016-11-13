import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'pk-applications',
    templateUrl: './applications.component.html',
    styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {

    private form: Array<Object>;

    constructor() { }

    ngOnInit() {
        this.form = [
            {
                elementType: 'datalist',
                name: 'datalist',
                label: 'Datalist',
                required: true
            },
            {
                elementType: 'input',
                name: 'email',
                type: 'input',
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
                elementType: 'input',
                name: 'password',
                type: 'password',
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
                elementType: 'input',
                name: 'date',
                type: 'date'
            },
            {
                elementType: 'input',
                name: 'text',
            },
            {
                elementType: 'checkbox',
                name: 'privacy',
                label: 'Sell your Soul?',
                validations: [
                    'toBeTrue',
                ]
            },
            {
                elementType: 'select',
                name: 'country',
                label: 'Land',
                required: true,
                multiple: false,
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
                elementType: 'select',
                name: 'country',
                label: 'Land',
                required: true,
                multiple: true,
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
                elementType: 'radio',
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
                elementType: 'textarea',
                name: 'desc',
                label: 'Description',
                required: true,
                value: 'de'
            },
            {
                elementType: 'textarea',
                name: 'info',
                label: 'Info',
                required: true,
                placeholder: 'Something',
                styles: [
                    'small'
                ]
            }
        ]
    }

    save(event) {

    }

    cancel(event) {

    }
}
