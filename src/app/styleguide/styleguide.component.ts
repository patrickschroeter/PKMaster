import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
    selector: 'pk-styleguide',
    templateUrl: './styleguide.component.html',
    styleUrls: ['./styleguide.component.scss']
})
export class StyleguideComponent implements OnInit {

    buttonTypes;
    buttonStyling;
    buttonExamples;
    buttonExamplesClasses;

    inputElements;
    checkboxElements;
    radioElements;
    selectElements;

    constructor(private build: FormBuilder) {

        this.buttonTypes = [
            {
                header: 'Icon Only',
                icon: 'donut_large'
            },
            {
                header: 'Icon Only Rounded',
                icon: 'donut_large',
                class: 'element--rounded'
            },
            {
                header: 'Icon and Text',
                icon: 'donut_large',
                value: 'Button'
            },
            {
                header: 'Text Only',
                value: 'Button'
            },
            {
                header: 'Icon Only',
                icon: 'donut_large',
                value: 'Button with a very long text'
            },
        ];

        this.buttonStyling = [
            {
                header: 'element--default',
                icon: 'donut_large',
                value: 'Default'
            },
            {
                header: 'element--primary',
                icon: 'donut_large',
                value: 'Primary',
                class: 'element--primary'
            },
            {
                header: 'element--secondary',
                icon: 'donut_large',
                value: 'Secondary',
                class: 'element--secondary'
            },
            {
                header: 'element--success',
                icon: 'check',
                value: 'Success',
                class: 'element--success'
            },
            {
                header: 'element--error',
                icon: 'error',
                value: 'Error',
                class: 'element--error'
            },
            {
                header: 'element--hover',
                icon: 'donut_large',
                value: 'Hover',
                class: 'element--hover'
            }
        ];

        this.buttonExamples = [
            {
                header: '( Einstellungen )',
                icon: 'settings',
            },
            {
                header: 'Profil',
                icon: 'person'
            },
            {
                header: 'Antrag',
                icon: 'insert_drive_file'
            },
            {
                header: 'Konferenz',
                icon: 'forum'
            },
            {
                header: 'Nutzer',
                icon: 'group'
            },
            {
                header: 'Rollen',
                icon: 'share'
            },
            {
                header: 'Rechte',
                icon: 'lock'
            },
            {
                header: 'Admin',
                icon: 'security'
            },
            {
                header: 'Login',
                icon: 'exit_to_app'
            },
            {
                header: 'Logout',
                icon: 'settings_power'
            },
            {
                header: 'neu',
                icon: 'add'
            },
            {
                header: 'Bearbeiten',
                icon: 'create'
            },
            {
                header: 'Entfernen',
                icon: 'delete'
            },
            {
                header: 'Burger',
                icon: 'menu'
            },
            {
                header: 'E-Mail',
                icon: 'email'
            },
            {
                header: 'Passwort',
                icon: 'vpn_key'
            },
        ];

        this.inputElements = [
            {
                header: 'Default Input',

                elementType: 'input',
                name: 'input-default',
                value: 'Default'
            },
            {
                header: 'Input with Label',

                elementType: 'input',
                name: 'input-label',
                label: 'Label'
            },
            {
                header: 'Input with Placeholder',

                elementType: 'input',
                name: 'input-placeholder',
                placeholder: 'E-mail'
            },
            {
                header: 'Required Input',

                elementType: 'input',
                name: 'input-required',
                label: 'Required',
                required: true
            },
            {
                header: 'Password Input',

                elementType: 'input',
                name: 'input-password',
                label: 'Password',
                type: 'password',
            },
            {
                header: 'Validated Input',

                elementType: 'input',
                name: 'input-validation',
                validations: [
                    'useExternalEmail',
                    'isEmail',
                    'minLength',
                    'maxLength'
                ],
            },
            {
                header: 'Small Input',

                elementType: 'input',
                name: 'input-small',
                styles: [
                    'small'
                ]
            },
            {
                header: 'Textarea (with the same options)',

                elementType: 'textarea',
                name: 'input-textarea',
                placeholder: 'Some text will be here...',
                required: true,
                styles: [
                    'small'
                ],
                validations: [
                    'isEmail',
                    'minLength'
                ]
            }
        ];

        this.checkboxElements = [
            {
                header: 'Default Checkbox',

                elementType: 'checkbox',
                name: 'agree',
                label: 'I\'m Batman.',
            },
            {
                header: 'ToBeTrue (Required) Checkbox',

                elementType: 'checkbox',
                name: 'student',
                label: 'This is Sparta!',
                validations: [
                    'toBeTrue'
                ]
            }
        ];

        this.radioElements = [
            {
                header: 'Default Radiobuttons',

                elementType: 'radio',
                name: 'radio-default',
                label: 'Default Radio',
                value: 'a',
                options: [
                    {
                        value: 'a',
                        label: 'A'
                    },
                    {
                        value: 'b',
                        label: 'B'
                    },
                    {
                        value: 'c',
                        label: 'C'
                    }
                ]
            },
            {
                header: 'Required Radiobuttons',

                elementType: 'radio',
                name: 'radio-required',
                label: 'required Radio',
                required: true,
                options: [
                    {
                        value: 'not-a',
                        label: '!A'
                    },
                    {
                        value: 'not-b',
                        label: '!B'
                    },
                    {
                        value: 'not-c',
                        label: '!C'
                    }
                ]
            }
        ];

        this.selectElements = [
            {
                header: 'Default (single) Select',

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
                header: 'Multi-Select',

                elementType: 'select',
                name: 'country',
                label: 'Land',
                multiple: true,
                styles: [
                    'small'
                ],
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
            }

        ];
    }

    ngOnInit() { }

    log(message: string): void {
        console.log(message);
    }
}
