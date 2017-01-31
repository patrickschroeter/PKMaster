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

    /**
     * update the role with the given id
     * @param {String} id
     * @param {Role} role
     */
    public updateRoleById(id: string, role: Role): Observable<Role> {
        this.alert.setLoading(
            'updateRoleById',
            this.translationService.translate('updateRoleById')
        );
        return this.roleApi.updateRoleById(id, 17, role).map(result => {
            this.alert.removeHint('updateRoleById');
            return result;
        });
    }

    /**
     * removed the given permission of the role
     * @param {String} roleId
     * @param {String} permissionId
     */
    public removePermissionOfRole(roleId: string, permissionId: string): Observable<Role> {
        this.alert.setLoading(
            'removePermissionOfRole',
            this.translationService.translate('removePermissionOfRole')
        );
        return this.roleApi.deletePermissionOfRole(roleId, permissionId).map(result => {
            this.alert.removeHint('removePermissionOfRole');
            return result;
        });
    }

    public addPermissionToRole(roleId: string, permissionId: string): Observable<Role> {
        this.alert.setLoading(
            'addPermissionToRole',
            this.translationService.translate('addPermissionToRole')
        );
        return this.roleApi.addPermissionToRole(roleId, permissionId).map(result => {
            this.alert.removeHint('addPermissionToRole');
            return result;
        });
    }
}
