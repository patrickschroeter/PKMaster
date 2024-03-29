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

/**
 * Required PermissionService as permission
 */
import { PermissionService } from 'app/core';
import { AlertService } from 'app/modules/alert';
import { environment } from 'app/../environments/environment';

export interface OnAccess {
    permission: PermissionService;
    alert: AlertService;
}

/**
 * Access Decorator to protect function call
 *
 * @export
 * @param {(string | string[])} name
 * @returns
 */
export function Access(name: string | string[]) {
    return function (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
        const originalMethod = descriptor.value;

        if (environment.test) {
            return descriptor;
        }

        descriptor.value = function (...args: any[]) {
            let result: any;
            if (this.permission instanceof PermissionService) {
                if ((this.permission as PermissionService).hasPermission(name, true)) {
                    result = originalMethod.apply(this, args);
                } else {
                    console.error('Permission Denied');
                    if (this.alert instanceof AlertService) {
                        (this.alert as AlertService).setErrorHint('permission_denied', 'Permission Denied.', 2000);
                    }
                }
            } else {
                console.error('Required Permissions couldn\'t be determined. PermissionService missing');
            }
            return result;
        };

        return descriptor;
    };
}
