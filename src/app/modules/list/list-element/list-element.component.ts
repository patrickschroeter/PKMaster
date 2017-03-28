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

import { Component, HostBinding, ElementRef, Renderer, Input, OnChanges, SimpleChanges } from '@angular/core';

/**
 * ListElementComponent
 *
 * @export
 * @class ListElementComponent
 * @implements {OnChanges}
 */
@Component({
    selector: 'pk-list-element',
    template: '<ng-content></ng-content>'
})
export class ListElementComponent implements  OnChanges {

    @HostBinding('class.list-element') element = true;
    @HostBinding('class.animation') animation = true;
    @HostBinding('class.animation--trigger') animationTrigger = true;

    @Input() name: string;

    constructor(private renderer: Renderer, private elementRef: ElementRef) { }

    /**
     * implements OnInit
     *
     * @param {SimpleChanges} changes
     *
     * @memberOf ListElementComponent
     */
    ngOnChanges(changes: SimpleChanges) {
        if (changes['name']) {
            this.renderer.setElementClass(this.elementRef.nativeElement, `list-element--${changes['name'].previousValue}`, false);
            this.renderer.setElementClass(this.elementRef.nativeElement, `list-element--${changes['name'].currentValue}`, true);
        }
    }
}
