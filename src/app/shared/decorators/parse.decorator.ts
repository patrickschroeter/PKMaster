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

import * as swagger from 'app/swagger/model/models';

/**
 * Parse Decorator to parse json to objects
 *
 * @export
 * @param {string} name
 * @returns
 */
export function Parse(name: string) {
    return function (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
        const originalMethod = descriptor.value;

        descriptor.value = function (...args: any[]) {
            let result: any;

            result = originalMethod.apply(this, args);

            if (result && result.map) {
                return result.map((element: any) => {
                    const fn: any = swagger;
                    if (typeof fn[name] !== 'function') {
                        return element;
                    }

                    if (Array.isArray(element)) {
                        const array: any[] = [];
                        for (let i = 0; i < element.length; i++) {
                            array.push(parseObject(fn, element[i], name));
                        }
                        console.log(array);
                        return array;
                    } else {
                        // console.log(parseObject(fn, element, name));
                        const object = parseObject(fn, element, name);
                        console.log(object);
                        return object;
                    }
                });
            } else {
                console.error('Loading.decorator: No returned Observable');
            }

            return result;
        };

        return descriptor;
    };
}

export function parseObject(fn: any, element: any, name: string) {
    const object = new fn[name](element);
    return object;
}
