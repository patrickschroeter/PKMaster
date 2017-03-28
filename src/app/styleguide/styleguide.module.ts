import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StyleguideComponent } from './';
import { StyleguideRouting } from './styleguide.routing';

import { SharedModule } from 'app/shared/shared.module';
import { ButtonModule } from 'app/modules/button/button.module';
import { DynamicFormModule } from 'app/modules/dynamic-form/dynamic-form.module';

@NgModule({
    declarations: [
        StyleguideComponent,
    ],
    imports: [
        CommonModule,
        StyleguideRouting,
        SharedModule,
        ButtonModule,
        DynamicFormModule
    ],
    providers: [],
    exports: []
})
export class StyleguideModule { }
