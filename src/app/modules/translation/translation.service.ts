import { Injectable, Inject, LOCALE_ID } from '@angular/core';

import { TRANSLATE } from './dictionary';

@Injectable()
export class TranslationService {

    private defaultLocaleId: string = 'en';

    constructor( @Inject(LOCALE_ID) protected localeId, @Inject(TRANSLATE) private i18n: any ) {
        if (!i18n[localeId]) {
            this.localeId = this.defaultLocaleId;
        }
    }

    /**
     * @description translate the given string into an other language
     */
    public translate(key: string, interpolations?: (string | number)[]): string {
        let result = this.i18n[this.localeId][key];
        if (!result) {
            console.error(`Missing translation for '${key}' in language '{ this.localeId }`);
            return `Missing translation for '${key}' in language '{ this.localeId }`;
        }

        if (!interpolations) { return result; }

        // http://stackoverflow.com/questions/1408289/how-can-i-do-string-interpolation-in-javascript#answer-1408373
        return result.replace(/{([^{}]*)}/g, function (interpolation, content) {
            let index = +content;
            if (!index) { return interpolation; }
            let replacement = interpolations[+content];
            return typeof replacement === 'string' || typeof replacement === 'number' ? replacement : interpolation;
        });
    }
}
