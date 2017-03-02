/**
 * Required PermissionService as permission
 */
import { PermissionService } from './../../core';
import { AlertService } from './../../modules/alert';
import { environment } from './../../../environments/environment';

export function Access(name: string | string[]) {
    return function (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
        const originalMethod = descriptor.value;

        if (environment.test) {
            return descriptor;
        }

        descriptor.value = function (...args: any[]) {
            let result: any;
            if (this.permission instanceof PermissionService) {
                if ((this.permission as PermissionService).hasPermission(name)) {
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
