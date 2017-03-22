import { Component, OnInit, HostBinding, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

/** Services */
import {
    UserService,
    PermissionService
} from 'app/core';
import { AlertService } from 'app/modules/alert';

/** Models */
import { UserDetailDto, FieldDto } from './../../../swagger';
import { Fields } from './../../../models';

/** Decorators */
import { Access, OnAccess } from './../../../shared/decorators/access.decorator';

@Component({
    selector: 'pk-users-edit',
    templateUrl: './users-edit.component.html',
    styleUrls: ['./users-edit.component.scss']
})
export class UsersEditComponent implements OnInit, OnAccess {
    @HostBinding('class') classes = 'content--default';

    public user: UserDetailDto;
    public form: FieldDto[];

    constructor(
        private userService: UserService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        public permission: PermissionService,
        public alert: AlertService
    ) { }

    ngOnInit() {
        this.getUser();
    }

    /**
     * get the user by param id
     */
    @Access('EditUsers')
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
    @Access('EditUsers')
    private initUserForm(user: UserDetailDto) {
        this.form = [
            new Fields.Firstname(user.firstname),
            new Fields.Lastname(user.lastname),
            new Fields.Devider(),
            new Fields.Email(user.email)
        ];
    }

    /**
     * save the user
     * @param {AppUser} user
     */
    @Access('EditUsers')
    public save(user: UserDetailDto): void {
        user.id = this.user.id;
        this.userService.updateUser(user).subscribe(result => {
            this.router.navigate(['', 'admin', 'users', result.id]);
        });
    }

    /**
     * cancel edit user
     */
    @Access('EditUsers')
    public cancel(): void {
        this.router.navigate(['', 'admin', 'users', this.user.id]);
    }

}
