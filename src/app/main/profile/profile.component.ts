import { Component, OnInit, HostBinding } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { AuthenticationService, AlertService, InputValidationService } from './../../core';

import { DynamicFormService } from './../../modules/dynamic-form';

import { Field, Form } from './../../swagger';

@Component({
    selector: 'pk-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    @HostBinding('class') classes = 'content--default';

    private isChangingPassword: boolean;
    private isFormValidationVisible: boolean = false;

    private changePasswordForm: FormGroup;
    private changePasswordElements: Field[];

    private form: Form;

    constructor(
        private auth: AuthenticationService,
        private alert: AlertService,
        private builder: FormBuilder,
        private dynamicForm: DynamicFormService,
        private inputValidation: InputValidationService
    ) { }

    ngOnInit() {
        this.isChangingPassword = false;

        this.form = [
            {
                fieldType: 'input',
                name: 'firstname',
                required: false,
                label: 'Firstname',
                value: 'Patrick',
                styles: [
                    'small'
                ]
            },
            {
                fieldType: 'input',
                name: 'lastname',
                required: false,
                label: 'Lastname',
                styles: [
                    'small'
                ]
            },
            {
                fieldType: 'devider'
            },
            {
                fieldType: 'input',
                name: 'email',
                contentType: 'email',
                required: true,
                label: 'E-Mail',

                validations: [
                    'isEmail',
                    'useExternalEmail'
                ],
                styles: [
                    'small'
                ]
            },
            {
                fieldType: 'input',
                label: 'Matrikelnummer',
                value: '949225',
                disabled: true,
                styles: [
                    'small'
                ]
            }
        ];

        this.changePasswordElements = [
            {
                fieldType: 'input',
                contentType: 'password',
                name: 'password',
                required: true,
                label: 'Current Password'
            },
            {
                fieldType: 'input',
                contentType: 'password',
                name: 'newpassword',
                required: true,
                label: 'New Password',
                styles: [
                    'small'
                ],
                validations: [
                    'minLength'
                ]
            },
            {
                fieldType: 'input',
                contentType: 'password',
                name: 'newpasswordconfirm',
                required: true,
                label: 'New Password (confirm)',
                styles: [
                    'small'
                ]
            }
        ];

        this.changePasswordForm = this.dynamicForm.generateFormFromInput(
            this.changePasswordElements,
            { validator: this.inputValidation.areEqual(['newpassword', 'newpasswordconfirm'], 'Password doesn\'t match the confirmation')});
    }

    /**
     * @description toggle the password change overlay
     * @return {void}
     */
    togglePasswordOverlay(): void {
        this.isChangingPassword = !this.isChangingPassword;
    }

    /**
     * @description changes the password
     * @param {Object} event the form object
     * @return {void}
     */
    changePassword(event): void {
        this.togglePasswordOverlay();
        this.auth.changePassword(event.password, event.newpassword).subscribe(
            () => {
                this.alert.setSuccessHint('password_changed', 'Password changed.');
            },
            () => {
                this.alert.setAlert('Error', 'There was an error changing your password. Please try again later.');
            }
        );
    }

}
