import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FloatingComponent } from './';

@NgModule({
    declarations: [
        FloatingComponent
    ],
    imports: [
        CommonModule
    ],
    providers: [

    ],
    exports: [
        FloatingComponent
    ]
})
export class FloatingModule { }
