import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'pk-profile-edit',
    templateUrl: './profile-edit.component.html',
    styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {
    @HostBinding('class') classes = 'content--default';

    private form: Array<Object>;

    constructor(private router: Router) { }

    ngOnInit() {
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
            }
        ];
    }

    save(event) {
        this.router.navigateByUrl('/profile');
    }

    cancel(event) {
        this.router.navigateByUrl('/profile');
    }

}
