import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { AlertService } from './../../../modules/alert';
import { TranslationService } from './../../../modules/translation';

import { RoleApi, Role } from './../../../swagger';

@Injectable()
export class RoleService {

    constructor(
        private roleApi: RoleApi,
        private alert: AlertService,
        private translationService: TranslationService
    ) { }

    /**
     * Get all available roles
     */
    public getRoles(): Observable<Role[]> {
        this.alert.setLoading(
            'getRoles',
            this.translationService.translate('getRoles')
        );
        return this.roleApi.getRoles().map(roles => {
            this.alert.removeHint('getRoles');
            return roles;
        });
    }

    /**
     * create a new role
     * @param {Role} role
     */
    public addRole(role?: Role): Observable<Role> {
        this.alert.setLoading(
            'addRole',
            this.translationService.translate('addRole')
        );
        return this.roleApi.addRole(17, role).map(result => {
            this.alert.removeHint('addRole');
            return result;
        });
    }

    /**
     * get the role by id
     * @param {String} id
     */
    public getRoleById(id: string): Observable<Role> {
        this.alert.setLoading(
            'getRoleById',
            this.translationService.translate('getRoleById')
        );
        return this.roleApi.getRoleById(id).map(result => {
            this.alert.removeHint('getRoleById');
            return result;
        });
    }
}
