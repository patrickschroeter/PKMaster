import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ListComponent, ListHeaderComponent, ListContentComponent, ListElementComponent, ListAttributeComponent } from './';


@NgModule({
    declarations: [
        ListComponent,
        ListHeaderComponent,
        ListContentComponent,
        ListElementComponent,
        ListAttributeComponent
    ],
    imports: [
        CommonModule
    ],
    providers: [

    ],
    exports: [
        ListComponent,
        ListHeaderComponent,
        ListContentComponent,
        ListElementComponent,
        ListAttributeComponent
    ]
})
export class ListModule { }
