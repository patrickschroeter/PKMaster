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

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

/** Services */
import { AuthenticationService } from 'app/core';
import {
    DynamicFormService,
    InputValidationService
} from 'app/modules/dynamic-form';
import { AlertService } from 'app/modules/alert';
import { TranslationService } from 'app/modules/translation';

/** Components */
import { OverlayComponent } from 'app/modules/overlay';

/** Models */
import { FieldDto, UserDetailDto } from 'app/swagger';
import { Fields, ChangePasswordForm } from 'app/models';

/**
 * Modal to change the users password
 *
 * @export
 * @class ModalChangePasswordComponent
 * @implements {OnInit}
 */
@Component({
    selector: 'pk-modal-change-password',
    templateUrl: './modal-change-password.component.html',
    styleUrls: ['./modal-change-password.component.scss'],
    exportAs: 'passwordModal'
})
export class ModalChangePasswordComponent implements OnInit {

    @ViewChild('overlay') overlay: OverlayComponent;

    private user: UserDetailDto;
    public changePasswordElements: FieldDto[];
    public changePasswordForm: FormGroup;

    /**
     * Creates an instance of ModalChangePasswordComponent.
     *
     * @param {AuthenticationService} auth
     * @param {DynamicFormService} dynamicFormService
     * @param {InputValidationService} inputValidation
     * @param {AlertService} alert
     * @param {TranslationService} translationService
     *
     * @memberOf ModalChangePasswordComponent
     */
    constructor(
        private auth: AuthenticationService,
        private dynamicFormService: DynamicFormService,
        private inputValidation: InputValidationService,
        private alert: AlertService,
        private translationService: TranslationService
    ) { }

    /**
     * implements OnInit
     *
     * @memberOf ModalChangePasswordComponent
     */
    ngOnInit() {
        this.auth.getUser().subscribe(user => {
            this.user = user;
        }, error => { console.error(error); });

        this.initChangePasswordField();
    }

    /**
     * Generates the FormGroup for changing the password, including Validation
     *
     * @private
     *
     * @memberOf ModalChangePasswordComponent
     */
    private initChangePasswordField() {
        this.changePasswordElements = [
            new Fields.Password(null, { name: 'password', label: this.translationService.translate('currentPassword'), styleIds: [] }),
            new Fields.Password(null, { name: 'newpassword', label: this.translationService.translate('newPassword') }),
            new Fields.Password(null, { name: 'newpasswordconfirm', label: this.translationService.translate('newPasswordConfirm') })
        ];

        this.changePasswordForm = this.dynamicFormService.generateFormFromInput(
            this.changePasswordElements,
            { validator: this.inputValidation.areEqual(['newpassword', 'newpasswordconfirm'], 'errorPasswordMatch') });
    }

    /**
     * Saves the changes password
     *
     * @param {PasswordForm} form
     *
     * @memberOf ModalChangePasswordComponent
     */
    public changePassword(form: ChangePasswordForm): void {
        this.auth.changePassword(this.user, form.password, form.newpassword).subscribe(
            () => {
                this.alert.setSuccessHint('password_changed', this.translationService.translate('changedPassword'));
            },
            () => {
                this.alert.setAlert(
                    this.translationService.translate('headerError'),
                    this.translationService.translate('errorChangedPassword')
                );
            }, () => {
                this.overlay.toggle(false);
                this.initChangePasswordField();
            }
        );
    }
}
