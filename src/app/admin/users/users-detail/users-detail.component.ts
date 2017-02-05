import { Component, OnInit, HostBinding, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

/** Services */
import {
    UserService,
    PermissionService,
    RoleService
} from './../../../core';
import { ModalService } from './../../../modules/overlay';
import { TranslationService } from './../../../modules/translation';

/** Models */
import { AppUser, Field, Role } from './../../../swagger';
import { Fields, Selectable } from './../../../models';

/** Decorators */
import { Access } from './../../../shared/decorators/access.decorator';

@Component({
    selector: 'pk-users-detail',
    templateUrl: './users-detail.component.html',
    styleUrls: ['./users-detail.component.scss']
})
export class UsersDetailComponent implements OnInit {
    @HostBinding('class') classes = 'content--default';

    public user: AppUser;
    public form: Field[];

    private roles: Selectable[];

    constructor(
        private userService: UserService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private permission: PermissionService,
        private modalService: ModalService,
        private translationService: TranslationService,
        private roleService: RoleService
    ) { }

    ngOnInit() {
        this.getUser();

        this.roleService.getRoles().subscribe(roles => {
            this.roles = roles.map(obj => { return new Selectable(obj.id, obj.name); });
        });
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

    /**
     * remove role from user
     * @param {Role} role
     */
    @Access(['EditUsers', 'EditRoles'])
    private removeRole(role: Role): void {
        this.userService.removeRoleFromUser(this.user, role).subscribe(result => {
            this.user = result;
        });
    }

    /**
     * open the modal to add permission to role
     */
    @Access(['EditUsers', 'EditRoles'])
    public addRoleToUserModal(): void {
        this.modalService.createListModal({
            title: this.translationService.translate('addRoleToUser'),
            list: this.roles,
            click: this.addRoleToUser.bind(this),

            selectedValues: this.user.roles.map(obj => { return obj.id; }),

            emptyText: this.translationService.translate('noRolesAvailable'),
            redirect: this.permission.hasPermission('EditRoles'),
            redirectText: this.translationService.translate('createNewRole'),
            redirectParam: ['', 'admin', 'roles']
        });
    }

    /**
     * add the given permission to the role
     * @param {Selectable} data
     */
    @Access(['EditUsers', 'EditRoles'])
    private addRoleToUser(data: Selectable): void {
        this.userService.addRoleToUser(this.user.id, data.value).subscribe(result => {
            this.user = result;
            this.modalService.destroyModal();
        });
    }

}
