/**
 * Required AlertService as alert
 * Required TranslationService as translationService
 */
import { AlertService } from './../../modules/alert';
import { TranslationService } from './../../modules/translation';

export function Loading(name: string) {
    return function (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
        const originalMethod = descriptor.value;

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

            if (result && result.map) {
                if (this.alert instanceof AlertService) {
                    return result.map((element: any) => {
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
