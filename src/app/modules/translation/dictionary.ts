import { OpaqueToken } from '@angular/core';

import { DICTIONARY_DE } from './dictionary.de';
import { DICTIONARY_EN } from './dictionary.en';

export const TRANSLATE = new OpaqueToken('translate');

export const dictionary = {
    en: DICTIONARY_EN,
    de: DICTIONARY_DE
};
