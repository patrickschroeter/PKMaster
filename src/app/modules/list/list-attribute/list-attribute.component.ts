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

import { Component, Input, Renderer, ElementRef, AfterViewInit, HostBinding } from '@angular/core';

/**
 * ListAttributeComponent
 *
 * @export
 * @class ListAttributeComponent
 * @implements {AfterViewInit}
 */
@Component({
    selector: 'pk-list-attribute',
    template: '<ng-content></ng-content>'
})
export class ListAttributeComponent implements AfterViewInit {

    @HostBinding('class.list-element__attribute') attribute = true;

    @Input() name: string;

    /**
     * Creates an instance of ListAttributeComponent.
     * @param {Renderer} renderer
     * @param {ElementRef} elementRef
     *
     * @memberOf ListAttributeComponent
     */
    constructor(
        private renderer: Renderer,
        private elementRef: ElementRef
    ) { }

    /**
     * implements AfterViewInit
     *
     * @memberOf ListAttributeComponent
     */
    ngAfterViewInit() {
        if (this.name) {
            const name = this.name.split(' ').join('-');
            this.renderer.setElementClass(this.elementRef.nativeElement, `list-element__attribute--${name}`, true);
        }
    }

}
