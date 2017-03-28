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

import { Injectable, Inject, LOCALE_ID } from '@angular/core';

import { TRANSLATE } from './dictionary';

/**
 * TranslationService
 *
 * @export
 * @class TranslationService
 */
@Injectable()
export class TranslationService {

    private defaultLocaleId = 'en';

    /**
     * Creates an instance of TranslationService.
     * @param {string} localeId
     * @param {*} i18n
     *
     * @memberOf TranslationService
     */
    constructor( @Inject(LOCALE_ID) protected localeId: string, @Inject(TRANSLATE) private i18n: any ) {
        if (!i18n[localeId]) {
            this.localeId = this.defaultLocaleId;
        }
    }

    /**
     * translate the given string into an other language
     *
     * @param {string} key
     * @param {((string | number)[])} [interpolations]
     * @returns {string}
     *
     * @memberOf TranslationService
     */
    public translate(key: string, interpolations?: (string | number)[]): string {
        const result = this.i18n[this.localeId][key];
        if (!result) {
            console.error(`Missing translation for '${key}' in language '${ this.localeId }`);

            /** TODO: remove for production */
            const errorString = localStorage.getItem('translate');
            let error: { [key: string]: any };
            if (!errorString) {
                error = {};
            } else {
                error = JSON.parse(errorString);
            }

            if (!error[this.localeId]) { error[this.localeId] = {}; }
            error[this.localeId][key] = key;

            localStorage.setItem('translate', JSON.stringify(error));

            return key;
        }

        if (!interpolations) { return result; }

        // Credits to http://stackoverflow.com/questions/1408289/how-can-i-do-string-interpolation-in-javascript#answer-1408373
        return result.replace(/{([^{}]*)}/g, function (interpolation: string, content: number) {
            const index = +content;
            if (isNaN(index)) { return interpolation; }
            const replacement = interpolations[+content];
            return typeof replacement === 'string' || typeof replacement === 'number' ? replacement : interpolation;
        });
    }
}
