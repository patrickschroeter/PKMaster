import { Component, OnInit } from '@angular/core';

import { AuthenticationService, AlertService } from './../../core';

import { FormElement } from './../../swagger';

@Component({
    selector: 'pk-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    private isChangingPassword: boolean;

    private changePasswordForm: FormElement[];

    constructor(private auth: AuthenticationService, private alert: AlertService) { }

    ngOnInit() {
        this.isChangingPassword = false;

        this.changePasswordForm = [
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
        ]
    }

    togglePasswordOverlay(): void {
        this.isChangingPassword = !this.isChangingPassword;
    }

    changePassword(event): void {
        this.togglePasswordOverlay();
        this.auth.changePassword(event.password, event.newpassword).subscribe(
            () => {
                this.alert.setSuccessHint('Password changed.');
            },
            () => {
                this.alert.setAlert('Error', 'There was an error changing your password. Please try again later.');
            }
        );
    }

}
