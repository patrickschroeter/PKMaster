import { Component, OnInit } from '@angular/core';

/** Models */
import { FieldDto } from './../../swagger';

@Component({
    selector: 'pk-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    public registerForm: FieldDto[];

    public error: boolean;

    constructor() { }

    ngOnInit() {

        this.initLoginForm();

    }

    public register(event: any): void {
        console.log(event);
    }

    /**
     * initialize the LoginForm
     *
     * @private
     *
     * @memberOf RegisterComponent
     */
    private initLoginForm(): void {
        this.registerForm = [
            {
                fieldType: 'input',
                name: 'ldap',
                contentType: 'text',
                required: true,
                placeholder: 'LDAP',

                validationIds: [],

                styleIds: [
                    'small'
                ]
            },
            {
                fieldType: 'input',
                name: 'password',
                contentType: 'password',
                required: true,
                placeholder: 'Password',

                validationIds: [],

                styleIds: [
                    'small'
                ]
            }
        ];
    }
}
