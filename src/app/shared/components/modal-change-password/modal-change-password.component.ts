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

    /**
     * Default Layout Class
     *
     * @type {OverlayComponent}
     * @memberOf ModalChangePasswordComponent
     */
    @ViewChild('overlay') overlay: OverlayComponent;

    /**
     * The user object
     *
     * @private
     * @type {UserDetailDto}
     * @memberOf ModalChangePasswordComponent
     */
    private user: UserDetailDto;

    /**
     * the elements for the change password form
     *
     * @type {FieldDto[]}
     * @memberOf ModalChangePasswordComponent
     */
    public changePasswordElements: FieldDto[];

    /**
     * the FormGroup to change the password
     *
     * @type {FormGroup}
     * @memberOf ModalChangePasswordComponent
     */
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
        });

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
            new Fields.Password(null, { name: 'password', label: 'Current Password', styleIds: [] }),
            new Fields.Password(null, { name: 'newpassword', label: 'New Password' }),
            new Fields.Password(null, { name: 'newpasswordconfirm', label: 'New Password (confirm)' })
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
