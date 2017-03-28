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

import { OpaqueToken } from '@angular/core';

import { DICTIONARY_DE } from './dictionary.de';
import { DICTIONARY_EN } from './dictionary.en';

export const TRANSLATE = new OpaqueToken('translate');

export const dictionary = {
    en: DICTIONARY_EN,
    de: DICTIONARY_DE
};
