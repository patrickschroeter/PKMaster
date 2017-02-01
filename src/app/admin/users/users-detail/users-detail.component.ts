import { Component, OnInit, HostBinding, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

/** Services */
import {
    UserService,
    PermissionService
} from './../../../core';

/** Models */
import { AppUser, Field } from './../../../swagger';
import { Fields } from './../../../models';

/** Decorators */
import { Access } from './../../../shared';

@Component({
    selector: 'pk-users-detail',
    templateUrl: './users-detail.component.html',
    styleUrls: ['./users-detail.component.scss']
})
export class UsersDetailComponent implements OnInit {
    @HostBinding('class') classes = 'content--default';

    public user: AppUser;
    public form: Field[];

    constructor(
        private userService: UserService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private permission: PermissionService
    ) { }

    ngOnInit() {
        this.getUser();
    }

    /**
     * get the user by param id
     */
    @Access('ReadUsers')
    private getUser(): void {
        this.activatedRoute.params.forEach((params: Params) => {
            this.userService.getUserById(params['id']).subscribe(user => {
                if (!user) { return this.router.navigate(['admin', 'users']); }
                this.user = user;
                this.initUserForm(user);
            }, error => {
                console.error(error);
                this.router.navigate(['admin', 'users']);
            });
        });
    }

    /**
     * initialize the user form
     * @param {AppUser} user
     */
    @Access('ReadUsers')
    private initUserForm(user: AppUser) {
        this.form = [
            new Fields.Firstname(user.firstname),
            new Fields.Lastname(user.lastname),
            new Fields.Devider(),
            new Fields.Email(user.email),
            new Fields.Matrikelnummer(user.matNr ? user.matNr.toString() : '')
        ];
    }

}
