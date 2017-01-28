import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

/** Models */
import { Field, AppUser } from './../../../swagger';
import { Fields } from './../../../models';

/** Services */
import { AuthenticationService } from './../../../core';
import {
    DynamicFormService,
    InputValidationService
} from './../../../modules/dynamic-form';
import { AlertService } from './../../../modules/alert';
import { TranslationService } from './../../../modules/translation';

/** Components */
import { OverlayComponent } from './../../../modules/overlay';

@Component({
    selector: 'pk-change-password-overlay',
    templateUrl: './change-password-overlay.component.html',
    styleUrls: ['./change-password-overlay.component.scss'],
    exportAs: 'changePassword'
})
export class ChangePasswordOverlayComponent implements OnInit {

    @ViewChild('overlay') overlay: OverlayComponent;

    private user: AppUser;

    public changePasswordElements: Field[];
    public changePasswordForm: FormGroup;

    constructor(
        private auth: AuthenticationService,
        private dynamicForm: DynamicFormService,
        private inputValidation: InputValidationService,
        private alert: AlertService,
        private translationService: TranslationService
    ) { }

    ngOnInit() {
        this.auth.getUser().subscribe(user => {
            this.user = user;
        });

        this.initChangePasswordField();
    }

    /**
     * Generates the FormGroup for changing the password, including Validation
     */
    private initChangePasswordField() {
        this.changePasswordElements = [
            new Fields.Password(null, { name: 'password', label: 'Current Password', styles: [] }),
            new Fields.Password(null, { name: 'newpassword', label: 'New Password' }),
            new Fields.Password(null, { name: 'newpasswordconfirm', label: 'New Password (confirm)' })
        ];

        this.changePasswordForm = this.dynamicForm.generateFormFromInput(
            this.changePasswordElements,
            { validator: this.inputValidation.areEqual(['newpassword', 'newpasswordconfirm'], 'errorPasswordMatch') });
    }

    /**
     * Saves the changes password
     */
    public changePassword(form): void {
        this.alert.setLoading(
            'changePassword',
            this.translationService.translate('loadingChangePassword')
        );
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
                this.alert.removeHint('changePassword');
                this.overlay.toggle(false);
                this.initChangePasswordField();
            }
        );
    }
}
