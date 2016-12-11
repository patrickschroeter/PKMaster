import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonComponent } from './';

@NgModule({
    declarations: [
        ButtonComponent
    ],
    imports: [
        CommonModule
    ],
    providers: [

    ],
    exports: [
        ButtonComponent
    ]
})
export class ButtonModule { }
