/**
 *
 * @author Patrick Schröter <patrick.schroeter@hotmail.de>
 *
 * @license CreativeCommons BY-NC-SA 4.0 2017
 *
 * This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/.
 *
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

/** Services */
import { AlertService } from 'app/modules/alert';
import { TranslationService } from 'app/modules/translation';
import { RoleApi } from 'app/swagger';

/** Models */
import { RoleDto } from 'app/swagger';

/** Decorators */
import { Loading } from 'app/shared/decorators/loading.decorator';

/**
 * A Service taking care of creation and edit of Roles
 *
 * @export
 * @class RoleService
 */
@Injectable()
export class RoleService {

    /**
     * Creates an instance of RoleService.
     *
     * @param {RoleApi} roleApi
     * @param {AlertService} alert
     * @param {TranslationService} translationService
     *
     * @memberOf RoleService
     */
    constructor(
        private roleApi: RoleApi,
        private alert: AlertService,
        private translationService: TranslationService
    ) { }

    /**
     * Get all available roles
     *
     * @returns {Observable<Role[]>}
     *
     * @memberOf RoleService
     */
    @Loading('getRoles')
    public getRoles(): Observable<RoleDto[]> {
        return this.roleApi.getRoles().map(roles => {
            return roles;
        });
    }

    /**
     * create a new role
     *
     * @param {Role} role
     * @returns {Observable<Role>}
     *
     * @memberOf RoleService
     */
    @Loading('addRole')
    public addRole(role: RoleDto): Observable<RoleDto> {
        return this.roleApi.addRole(role).map(result => {
            return result;
        });
    }

    /**
     * get the role by id
     *
     * @param {String} id
     * @returns {Observable<Role>}
     *
     * @memberOf RoleService
     */
    @Loading('getRoleById')
    public getRoleById(id: string): Observable<RoleDto> {
        return this.roleApi.getRoleById(id).map(result => {
            return result;
        });
    }

    /**
     * update the role with the given id
     *
     * @param {String} id
     * @param {Role} role
     * @returns {Observable<Role>}
     *
     * @memberOf RoleService
     */
    @Loading('updateRoleById')
    public updateRoleById(id: string, role: RoleDto): Observable<RoleDto> {
        return this.roleApi.updateRoleById(id, role).map(result => {
            return result;
        });
    }

    /**
     * removed the given permission of the role
     *
     * @param {String} roleId
     * @param {String} permissionId
     * @returns {Observable<Role>}
     *
     * @memberOf RoleService
     */
    @Loading('removePermissionOfRole')
    public removePermissionOfRole(roleId: string, permissionId: string): Observable<RoleDto> {
        return this.roleApi.deletePermissionOfRole(roleId, permissionId).map(result => {
            return result;
        });
    }

    /**
     * add the given permission to the role
     *
     * @param {String} roleId
     * @param {String} permissionId
     * @returns {Observable<Role>}
     *
     * @memberOf RoleService
     */
    @Loading('addPermissionToRole')
    public addPermissionToRole(roleId: string, permissionId: string): Observable<RoleDto> {
        return this.roleApi.addPermissionToRole(roleId, permissionId).map(result => {
            return result;
        });
    }
}
