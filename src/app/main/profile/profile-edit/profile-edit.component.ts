import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from 'app/core';
import { AlertService } from 'app/modules/alert';
import { TranslationService } from 'app/modules/translation';

import { UserDetailDto } from './../../../swagger';
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
    public user: UserDetailDto;

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
    public save(user: UserDetailDto) {
        user.id = this.user.id;
        this.auth.updateUser(user).subscribe(result => {
            this.router.navigateByUrl('/profile');
            this.alert.setSuccessHint('UpdateUser' + result.id, this.translationService.translate('updatedUser'));
        });
    }

    /**
     * cancel the edit user view
     */
    public cancel() {
        this.router.navigateByUrl('/profile');
    }

}
