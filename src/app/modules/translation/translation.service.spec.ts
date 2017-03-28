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

/* tslint:disable:no-unused-variable */
import { TestBed, async, inject } from '@angular/core/testing';
import { TranslationService } from './translation.service';

import { TRANSLATE, dictionary } from './dictionary';

describe('TranslationService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                TranslationService,
                { provide: TRANSLATE, useValue: dictionary }
            ]
        });
    });

    it('should ...', inject([TranslationService], (service: TranslationService) => {
        expect(service).toBeTruthy();
    }));

    describe('translate', () => {

        it('should set the default language if the localeId is not in the dictionary', () => {
            const service = new TranslationService('de', { en: { word: 'word' } });
            expect(service.translate('word')).toEqual('word');
        });

        it('should log an error if the key is not in the dictionary', inject([TranslationService], (service: TranslationService) => {
            spyOn(console, 'error');
            expect(service.translate('no-value-for-this-key')).toEqual(jasmine.any(String));
            expect(console.error).toHaveBeenCalled();
        }));

        it('should grab the translation by key (de)', () => {
            const service = new TranslationService('de', { de: { word: 'Wort' } });
            expect(service.translate('word')).toEqual('Wort');
        });

        it('should grab the translation by key (en)', () => {
            const service = new TranslationService('en', { en: { word: 'word' } });
            expect(service.translate('word')).toEqual('word');
        });

        it('should interpolate the strings in the right order', () => {
            const dictionary = {
                en: {
                    interpolate: '{ 1 } + { 2 } = { 0 } * { 0 }'
                }
            };
            const service = new TranslationService('en', dictionary);
            expect(service.translate('interpolate', ['a', 'b', 'c'])).toEqual('b + c = a * a');
        });

        it('should ignore the interpolate if it does not contain a number', () => {
            const dictionary = {
                en: {
                    interpolate: '{ a } + { 2 } = { 0 } * { 0 }'
                }
            };
            const service = new TranslationService('en', dictionary);
            expect(service.translate('interpolate', ['a', 'b', 0])).toEqual('{ a } + 0 = a * a');
        });
    });
});
