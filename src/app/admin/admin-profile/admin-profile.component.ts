import { Component, OnInit, HostBinding } from '@angular/core';

import { AuthenticationService } from './../../core';

import { Form, AppUser } from './../../swagger';
import { Fields } from './../../models';

@Component({
    selector: 'pk-admin-profile',
    templateUrl: './admin-profile.component.html',
    styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent implements OnInit {
    @HostBinding('class') classes = 'content--default';

    public user: AppUser;
    public form: Form;

    constructor(
        private auth: AuthenticationService
    ) { }

    ngOnInit() {
        this.getUser();
    }

    /**
     * get current user
     */
    private getUser(): void {
        this.auth.getUser().subscribe(user => {
            this.user = user;
            this.form = [
                new Fields.Firstname(user.firstname),
                new Fields.Lastname(user.lastname),
                new Fields.Devider(),
                new Fields.Email(user.email)
            ];
        });
    }

}
