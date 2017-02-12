import { Component, OnInit, HostBinding, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { AuthenticationService } from './../../core';

import { SingleFormDto, UserDto } from './../../swagger';
import { Fields } from './../../models';

@Component({
    selector: 'pk-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    @HostBinding('class') classes = 'content--default';

    private _form: SingleFormDto;
    get form() { return this._form; }
    set form(form) { this._form = form; }
    private user: UserDto;

    constructor(
        private auth: AuthenticationService,
    ) { }

    ngOnInit() {
        this.getUser();
    }

    /**
     * get the logged in user
     */
    private getUser() {
        this.auth.getUser().subscribe((user: UserDto) => {
            this.user = user;
            this.form = [
                new Fields.Firstname(user.firstname),
                new Fields.Lastname(user.lastname),
                new Fields.Devider(),
                new Fields.Email(user.email),
                new Fields.Matrikelnummer(user.matNr ? user.matNr.toString() : '')
            ];
        });
    }
}
