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
 * Required AlertService as alert
 * Required TranslationService as translationService
 */
import { AlertService } from 'app/modules/alert';
import { TranslationService } from 'app/modules/translation';
import { environment } from 'app/../environments/environment';
import { Observable } from 'rxjs/Rx';

export interface OnLoading {
    alert: AlertService;
    translationService: TranslationService;
}

/**
 * Loading Decorator to add hints while getting data
 *
 * @export
 * @param {string} name
 * @returns
 */
export function Loading(name: string) {
    return function (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
        const originalMethod = descriptor.value;

        if (environment.test) {
            return descriptor;
        }

        descriptor.value = function (...args: any[]) {
            let result: any;
            if (this.alert instanceof AlertService) {
                let value = 'Loading...';
                if (this.translationService instanceof TranslationService) {
                    value = this.translationService.translate('loading-' + name);
                } else {
                    console.error('Loading.decorator: No TranslationService as this.translationService');
                }

                this.alert.setLoading(
                    name,
                    value
                );

            } else {
                console.error('Loading.decorator: No AlertService as this.alert');
            }

            result = originalMethod.apply(this, args);

            if (result && result.map && result instanceof Observable) {
                if (this.alert instanceof AlertService) {
                    return (result as Observable<any>)
                    .catch((error: any) => {
                        this.alert.removeHint(name);
                        return Observable.throw(error);
                    })
                    .map((element: any) => {
                        this.alert.removeHint(name);
                        return element;
                    });
                }
            } else {
                console.error('Loading.decorator: No returned Observable');
            }

            return result;
        };

        return descriptor;
    };
}
