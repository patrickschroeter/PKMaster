import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { RoleService } from './../../../core';

import { Role } from './../../../swagger';

@Component({
    selector: 'pk-roles-edit',
    templateUrl: './roles-edit.component.html',
    styleUrls: ['./roles-edit.component.scss']
})
export class RolesEditComponent implements OnInit {
    @HostBinding('class') classes = 'content--default';

    public role: Role;

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private roleService: RoleService
    ) { }

    ngOnInit() {
        this.getRoleByRouteParam();
    }

    /**
     * Read Route Param and GET Role with param ID
     */
    private getRoleByRouteParam(): void {
        this.activatedRoute.params.forEach((params: Params) => {
            this.roleService.getRoleById(params['id']).subscribe((role) => {
                if (!role) { return this.router.navigate(['admin', 'roles']); }
                this.role = role;
            }, error => {
                console.error(error);
                this.router.navigate(['admin', 'roles']);
            });
        });
    }

}
