import { NgModule, OpaqueToken } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslationService } from './';

import { TRANSLATE, dictionary } from './dictionary';

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
            public translate() { return 'translation'; }
        }
    }
]
