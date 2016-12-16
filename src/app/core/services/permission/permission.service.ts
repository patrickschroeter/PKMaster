import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import { AuthenticationService } from './../authentication';

import { AppUser } from './../../../swagger';

@Injectable()
export class PermissionService {

    private permissions: string[];

    constructor(private authentication: AuthenticationService) {
        this.authentication.getUser().subscribe((user: AppUser) => {
            this.permissions = user.permissions;
        }, error => {
            this.permissions = undefined;
        });
    }

    public hasPermission(permission: string): boolean {
        return (this.permissions && this.permissions.indexOf(permission) !== -1);
    }

    public hasAllPermissions(permissions: string[]): boolean {
        return (this.permissions && !_.difference(permissions, this.permissions));
    }

}
