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

import { NgModule, OpaqueToken } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslationService } from './';

import { TRANSLATE, dictionary } from './dictionary';

/**
 * TranslationModule
 *
 * @export
 * @class TranslationModule
 */
@NgModule({
    declarations: [ ],
    imports: [ ],
    providers: [
        TranslationService,
        { provide: TRANSLATE, useValue: dictionary }
    ],
    exports: [ ]
})
export class TranslationModule { }


export const TranslationProviderMock = [
    {
        provide: TranslationService,
        useClass: class {
            public translate(input: string) { return input; }
        }
    }
];
