import { Component, OnInit, HostBinding } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { AuthenticationService, AlertService, InputValidationService } from './../../core';

import { DynamicFormService } from './../../shared';

import { FormElement, Form } from './../../swagger';

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
    private changePasswordElements: FormElement[];

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
                elementType: 'input',
                name: 'firstname',
                required: false,
                label: 'Firstname',
                value: 'Patrick',
                styles: [
                    'small'
                ]
            },
            {
                elementType: 'input',
                name: 'lastname',
                required: false,
                label: 'Lastname',
                styles: [
                    'small'
                ]
            },
            {
                elementType: 'devider'
            },
            {
                elementType: 'input',
                name: 'email',
                type: 'email',
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
                elementType: 'input',
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
                elementType: 'input',
                type: 'password',
                name: 'password',
                required: true,
                label: 'Current Password'
            },
            {
                elementType: 'input',
                type: 'password',
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
                elementType: 'input',
                type: 'password',
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

    /**
     * @description shows the validation of the element
     * @param {FormElement} element the element to validate
     * @return {void}
     */
    showElementValidation(element: FormElement): void {
        this.dynamicForm.showElementValidation(element);
    }

    /**
     * @description shows the validation of the formgroup
     * @param {FormGroup} element the formgroup to validate
     * @return {void}
     */
    showFormValidation(form: FormGroup) {
        this.isFormValidationVisible = true;
        this.dynamicForm.showValidation(form);
    }

    /**
     * @description hides the validation of form
     * @return {void}
     */
    hideFormValidation() {
        this.isFormValidationVisible = false;
    }

}
