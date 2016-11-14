import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StyleguideComponent } from './';
import { StyleguideRouting } from './styleguide.routing';

import { SharedModule } from './../shared/shared.module';

@NgModule({
    declarations: [
        StyleguideComponent,
    ],
    imports: [
        CommonModule,
        StyleguideRouting,
        SharedModule,
    ],
    providers: [],
    exports: [
        StyleguideComponent
    ]
})
export class StyleguideModule { }
