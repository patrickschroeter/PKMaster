import { Component, OnInit, HostBinding, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { AuthenticationService } from './../../core';

import { Form, AppUser } from './../../swagger';
import { Fields } from './../../models';

@Component({
    selector: 'pk-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    @HostBinding('class') classes = 'content--default';

    private _form: Form;
    get form() { return this._form; }
    set form(form) { this._form = form; }
    private user: AppUser;

    constructor(
        private auth: AuthenticationService,
    ) { }

    ngOnInit() {

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
    }
}
