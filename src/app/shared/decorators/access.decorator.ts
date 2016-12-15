/**
 * Required AuthenticationService as authenticationService
 */
import { AuthenticationService } from './../../core';
import { AlertService } from './../../modules/alert';

export function Access(name: string) {
    return function (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
        let originalMethod = descriptor.value;

        descriptor.value = function (...args: any[]) {
            let result;
            if (this.authenticationService instanceof AuthenticationService) {
                (this.authenticationService as AuthenticationService).getUser().subscribe(user => {
                    if (user.permissions && user.permissions.indexOf(name) !== -1) {
                        result = originalMethod.apply(this, args);
                    } else {
                        console.error('Permission Denied');
                        if (this.alert instanceof AlertService) {
                            (this.alert as AlertService).setErrorHint('permission_denied', 'Permission Denied.', 2000);
                        }
                    }
                });
            } else {
                console.error('Required Permissions couldn\'t be determined. AuthenticationService missing');
            }
            return result;
        }

        return descriptor;
    }
}
