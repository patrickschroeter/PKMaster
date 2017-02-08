import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './../../../core';
import { AlertService } from './../../../modules/alert';
import { TranslationService } from './../../../modules/translation';

import { UserDto } from './../../../swagger';
import { Fields } from './../../../models';

@Component({
    selector: 'pk-admin-profile-edit',
    templateUrl: './admin-profile-edit.component.html',
    styleUrls: ['./admin-profile-edit.component.scss']
})
export class AdminProfileEditComponent implements OnInit {
    @HostBinding('class') classes = 'content--default';

    private _form: Array<Object>;
    get form() { return this._form; }
    set form(form) { this._form = form; }
    private user: UserDto;

    constructor(
        private router: Router,
        private auth: AuthenticationService,
        private alert: AlertService,
        private translationService: TranslationService
    ) { }

    ngOnInit() {
        this.getUser();
    }

    /**
     * get the current user
     */
    private getUser() {
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

    /**
     * save the user attributes
     * @param {AppUser} user
     */
    public save(user: UserDto) {
        user.id = this.user.id;
        this.auth.updateUser(user).subscribe(user => {
            this.router.navigateByUrl('/admin/profile');
            this.alert.setSuccessHint('UpdateUser' + user.id, this.translationService.translate('updatedUser'));
        });
    }

    /**
     * cancel the edit user view
     */
    public cancel() {
        this.router.navigateByUrl('/admin/profile');
    }

}
