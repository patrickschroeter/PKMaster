import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

/** Services */
import { AlertService } from './../../../modules/alert';
import { TranslationService } from './../../../modules/translation';
import { RoleApi } from './../../../swagger';

/** Models */
import { Role } from './../../../swagger';

/** Decorators */
import { Loading } from './../../../shared/decorators/loading.decorator';

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
    @Loading('getRoles')
    public getRoles(): Observable<Role[]> {
        return this.roleApi.getRoles().map(roles => {
            return roles;
        });
    }

    /**
     * create a new role
     * @param {Role} role
     */
    @Loading('addRole')
    public addRole(role?: Role): Observable<Role> {
        return this.roleApi.addRole(17, role).map(result => {
            return result;
        });
    }

    /**
     * get the role by id
     * @param {String} id
     */
    @Loading('getRoleById')
    public getRoleById(id: string): Observable<Role> {
        return this.roleApi.getRoleById(id).map(result => {
            return result;
        });
    }

    /**
     * update the role with the given id
     * @param {String} id
     * @param {Role} role
     */
    @Loading('updateRoleById')
    public updateRoleById(id: string, role: Role): Observable<Role> {
        return this.roleApi.updateRoleById(id, role).map(result => {
            return result;
        });
    }

    /**
     * removed the given permission of the role
     * @param {String} roleId
     * @param {String} permissionId
     */
    @Loading('removePermissionOfRole')
    public removePermissionOfRole(roleId: string, permissionId: string): Observable<Role> {
        return this.roleApi.deletePermissionOfRole(roleId, permissionId).map(result => {
            return result;
        });
    }

    /**
     * add the given permission to the role
     * @param {String} roleId
     * @param {String} permissionId     *
     */
    @Loading('addPermissionToRole')
    public addPermissionToRole(roleId: string, permissionId: string): Observable<Role> {
        return this.roleApi.addPermissionToRole(roleId, permissionId).map(result => {
            return result;
        });
    }
}
