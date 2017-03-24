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

import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ListComponent, ListHeaderComponent, ListContentComponent, ListElementComponent, ListAttributeComponent } from './';

/**
 * ListModule
 *
 * @export
 * @class ListModule
 */
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
