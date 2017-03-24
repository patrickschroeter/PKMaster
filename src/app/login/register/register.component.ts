import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { UserService } from 'app/core';
import {
    DynamicFormService,
    InputValidationService
} from 'app/modules/dynamic-form';
import { TranslationService } from 'app/modules/translation';

/** Models */
import { FieldDto, UserDetailDto, UserCreateDto } from 'app/swagger';

@Component({
    selector: 'pk-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    public ldapForm: FieldDto[];
    public emailForm: FieldDto[];
    public passwordForm: FieldDto[];
    public passwordFormGroup: FormGroup;

    public step: number;

    public error: boolean;

    private user: UserCreateDto;
    private rzName: string;
    private rzPassword: string;

    constructor(
        private userService: UserService,
        private dynamicFormService: DynamicFormService,
        private inputValidation: InputValidationService,
        private translationService: TranslationService
    ) { }

    ngOnInit() {
        this.step = 0;
        this.user = new UserCreateDto();
        this.initForms();
    }

    /**
     * go to next registration step (0 = rz, 1 = email, 2 = password)
     *
     * @param {*} [event]
     *
     * @memberOf RegisterComponent
     */
    public next(event?: any) {
        switch (this.step) {
            case 0:
                this.rzName = btoa(event.rzName);
                this.rzPassword = btoa(event.rzPassword);
                break;
            case 1:
                this.user.email = event.email;
                break;
            case 2:
                this.user.password = event.password;
                this.register();
                break;
        }
        this.step += 1;
    }

    /**
     * go one step back in the registration process
     *
     *
     * @memberOf RegisterComponent
     */
    public back() {
        switch (this.step) {
            case 1:
                this.user.email = undefined;
                break;
            case 2:
                this.user.password = undefined;
                break;
        }
        this.step -= 1;
    }

    /**
     * register the new user
     *
     * @private
     *
     * @memberOf RegisterComponent
     */
    private register(): void {
        this.userService.addUser(this.rzName, this.rzPassword, this.user).subscribe((result: UserDetailDto) => {
            console.log(result);
            this.next();
        }, error => {
            console.error(error);
            this.error = true;
            this.next();
        });
    }

    /**
     * initialize the LoginForm
     *
     * @private
     *
     * @memberOf RegisterComponent
     */
    private initForms(): void {

        this.ldapForm = [
            {
                fieldType: 'input',
                name: 'rzName',
                contentType: 'text',
                required: true,
                placeholder: this.translationService.translate('RZName'),

                validationIds: [],

                styleIds: [
                    'small'
                ]
            },
            {
                fieldType: 'input',
                name: 'rzPassword',
                contentType: 'password',
                required: true,
                placeholder: this.translationService.translate('RZPassword'),

                validationIds: [],

                styleIds: [
                    'small'
                ]
            }
        ];

        this.emailForm = [
            {
                fieldType: 'input',
                name: 'email',
                contentType: 'email',
                required: true,
                placeholder: this.translationService.translate('externalEmail'),

                validationIds: [
                    'useExternalEmail'
                ],
            }
        ];

        this.passwordForm = [
            {
                fieldType: 'input',
                name: 'password',
                contentType: 'password',
                required: true,
                placeholder: this.translationService.translate('password'),

                validationIds: [
                    'minLength'
                ],

                styleIds: [
                    'small'
                ]
            },
            {
                fieldType: 'input',
                name: 'passwordconfirm',
                contentType: 'password',
                required: true,
                placeholder: this.translationService.translate('confirmPassword'),

                validationIds: [
                    'minLength'
                ],

                styleIds: [
                    'small'
                ]
            }
        ];

        this.passwordFormGroup = this.dynamicFormService.generateFormFromInput(
            this.passwordForm,
            { validator: this.inputValidation.areEqual(['password', 'passwordconfirm'], 'errorPasswordMatch') });
    }
}
