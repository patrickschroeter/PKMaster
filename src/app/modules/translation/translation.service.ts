import { Injectable, Inject, LOCALE_ID } from '@angular/core';

import { TRANSLATE } from './dictionary';

@Injectable()
export class TranslationService {

    private defaultLocaleId = 'en';

    constructor( @Inject(LOCALE_ID) protected localeId: string, @Inject(TRANSLATE) private i18n: any ) {
        if (!i18n[localeId]) {
            this.localeId = this.defaultLocaleId;
        }
    }

    /**
     * @description translate the given string into an other language
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

        // http://stackoverflow.com/questions/1408289/how-can-i-do-string-interpolation-in-javascript#answer-1408373
        return result.replace(/{([^{}]*)}/g, function (interpolation: string, content: number) {
            const index = +content;
            if (isNaN(index)) { return interpolation; }
            const replacement = interpolations[+content];
            return typeof replacement === 'string' || typeof replacement === 'number' ? replacement : interpolation;
        });
    }
}
