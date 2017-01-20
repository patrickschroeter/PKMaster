import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StyleguideComponent } from './';
import { StyleguideRouting } from './styleguide.routing';

import { SharedModule } from './../shared/shared.module';
import { ButtonModule } from './../modules/button/button.module';

@NgModule({
    declarations: [
        StyleguideComponent,
    ],
    imports: [
        CommonModule,
        StyleguideRouting,
        SharedModule,
        ButtonModule
    ],
    providers: [],
    exports: []
})
export class StyleguideModule { }
