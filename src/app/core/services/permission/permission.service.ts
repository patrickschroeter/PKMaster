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
import * as _ from 'lodash';

/** Services */
import { AlertService } from 'app/modules/alert';
import { TranslationService } from 'app/modules/translation';
import { PermissionEndpoint } from './../api/PermissionEndpoint';

/** Models */
import { UserDetailDto, PermissionDto } from 'app/swagger';

/** Decorators */
import { Loading } from 'app/shared/decorators/loading.decorator';

/**
 * PermissionService
 *
 * @export
 * @class PermissionService
 */
@Injectable()
export class PermissionService {

    private _permissions: string[];

    set permissions(permissions: string[]) { this._permissions = permissions; }
    get permissions(): string[] { return this._permissions; }

    /**
     * Creates an instance of PermissionService.
     * @param {PermissionEndpoint} permissionApi
     * @param {AlertService} alert
     * @param {TranslationService} translationService
     *
     * @memberOf PermissionService
     */
    constructor(
        private permissionApi: PermissionEndpoint,
        private alert: AlertService,
        private translationService: TranslationService
    ) { }

    /**
     * update the permission object in the class with the input user
     * @param {AppUser} [user]
     */
    public updateUserPermissions(user?: UserDetailDto): UserDetailDto {
        this.permissions = (user && user.permissions) ? user.permissions : [];
        return user;
    }

    /**
     * check if the user has the given permission (string), permissions (array, and), permissions (array, or)
     * @param {(String|Array)} permission
     * @param {Boolean} or
     */
    public hasPermission(permission: string | string[], or = false): boolean {
        if (Array.isArray(permission)) {
            if (or) {
                return this.hasOneOfPermissions((permission as string[]));
            } else {
                return this.hasAllPermissions((permission as string[]));
            }
        } else if (typeof permission === 'string') {
            return (!permission || (!!this.permissions && !!permission && this.permissions.indexOf(permission) !== -1));
        }
        return true;
    }

    /**
     * check if the user has this one permission
     * @param {String} permission
     */
    private hasOnePermission(permission: string): boolean {
        return (!permission || (!!this.permissions && !!permission && this.permissions.indexOf(permission) !== -1));
    }

    /**
     * check if the user has the given permissions (array, and)
     * @param {Array} permissions
     */
    private hasAllPermissions(permissions: string[]): boolean {
        // tslint:disable-next-line:max-line-length
        return (!permissions || !permissions.length || (!!this.permissions && !!permissions && !_.difference(permissions, this.permissions).length));
    }

    /**
     * check if the user has one of the given permissios (array, or)
     * @param {Array} permissions
     */
    private hasOneOfPermissions(permissions: string[]): boolean {
        if (!permissions.length) { return true; }
        for (let i = 0; i < permissions.length; i++) {
            if (this.hasOnePermission(permissions[i])) { return true; }
        }
        return false;
    }

    /**
     * get all permissions
     */
    @Loading('getPermissions')
    public getPermissions(): Observable<PermissionDto[]> {
        return this.permissionApi.getPermissions();
    }

    /**
     * update the permission with the given id
     * @param {String} id
     * @param {Permission} permission
     */
    @Loading('updatePermission')
    public updatePermission(id: string, permission: PermissionDto): Observable<PermissionDto> {
        return this.permissionApi.updatePermission(id, permission).map(result => {
            return result;
        });
    }
}
