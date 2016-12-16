import { Component, OnInit, HostBinding } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { AuthenticationService, InputValidationService } from './../../core';
import { AlertService } from './../../modules/alert';

import { DynamicFormService } from './../../modules/dynamic-form';

import { Field, Form, AppUser } from './../../swagger';
import { Fields } from './../../models';

@Component({
    selector: 'pk-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    @HostBinding('class') classes = 'content--default';

    private _isChangingPassword: boolean;
    get isChangingPassword() { return this._isChangingPassword; }
    set isChangingPassword(isOpen: boolean) { this._isChangingPassword = isOpen; }

    private _changePasswordForm: FormGroup;
    get changePasswordForm() { return this._changePasswordForm; }
    set changePasswordForm(form) { this._changePasswordForm = form; }
    private changePasswordElements: Field[];

    private _form: Form;
    get form() { return this._form; }
    set form(form) { this._form = form; }
    private user: AppUser;

    constructor(
        private auth: AuthenticationService,
        private alert: AlertService,
        private builder: FormBuilder,
        private dynamicForm: DynamicFormService,
        private inputValidation: InputValidationService
    ) { }

    ngOnInit() {
        this.isChangingPassword = false;

        this.auth.getUser().subscribe(user => {
            this.user = user;
            this.form = [
                new Fields.Firstname(user.firstname),
                new Fields.Lastname(user.lastname),
                new Fields.Devider(),
                new Fields.Email(user.email),
                new Fields.Matrikelnummer(user.matNr)
            ];
        });

        this.initChangePasswordField();
    }

    private initChangePasswordField() {
        this.changePasswordElements = [
            new Fields.Password(null, { name: 'password', label: 'Current Password', styles: []}),
            new Fields.Password(null, { name: 'newpassword', label: 'New Password'}),
            new Fields.Password(null, { name: 'newpasswordconfirm', label: 'New Password (confirm)'})
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
        this.alert.setLoading('changePassword', 'Encrypting Data...');
        this.auth.changePassword(this.user, event.password, event.newpassword).subscribe(
            () => {
                this.alert.setSuccessHint('password_changed', 'Password changed.');
            },
            () => {
                this.alert.setAlert('Error', 'There was an error changing your password. Please try again later.');
            }, () => {
                this.alert.removeHint('changePassword');
                this.togglePasswordOverlay();
                this.initChangePasswordField();
            }
        );
    }

}
