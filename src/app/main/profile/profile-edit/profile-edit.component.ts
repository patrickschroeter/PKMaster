import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './../../../core';
import { AlertService } from './../../../modules/alert';
import { TranslationService } from './../../../modules/translation';

import { AppUser } from './../../../swagger';
import { Fields } from './../../../models';

@Component({
    selector: 'pk-profile-edit',
    templateUrl: './profile-edit.component.html',
    styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {
    @HostBinding('class') classes = 'content--default';

    private _form: Array<Object>;
    get form() { return this._form; }
    set form(form) { this._form = form; }
    private user: AppUser;

    constructor(
        private router: Router,
        private auth: AuthenticationService,
        private alert: AlertService,
        private translationService: TranslationService
    ) { }

    ngOnInit() {

        this.auth.getUser().subscribe(user => {
            this.user = user;
            this.form = [
                new Fields.Firstname(user.firstname),
                new Fields.Lastname(user.lastname),
                new Fields.Devider(),
                new Fields.Email(user.email, { required: true })
            ];
        });
    }

    save(event) {
        event.id = this.user.id;
        this.auth.updateUser(event).subscribe(user => {
            this.router.navigateByUrl('/profile');
            this.alert.setSuccessHint('UpdateUser' + user.id, this.translationService.translate('updatedUser'));
        });
    }

    cancel(event) {
        this.router.navigateByUrl('/profile');
    }

}
