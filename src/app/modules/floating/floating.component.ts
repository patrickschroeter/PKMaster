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

import { Component, OnInit, Renderer, ElementRef, AfterViewInit, HostBinding, ViewEncapsulation } from '@angular/core';

/**
 * FloatingComponent
 *
 * @export
 * @class FloatingComponent
 * @implements {OnInit}
 * @implements {AfterViewInit}
 */
@Component({
    selector: 'pk-floating',
    template: '<ng-content></ng-content>',
    styleUrls: ['./floating.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FloatingComponent implements OnInit, AfterViewInit {

    @HostBinding('class.floating') floating = true;
    @HostBinding('class.animation--target') animation = true;

    private options: String[];

    /**
     * Creates an instance of FloatingComponent.
     * @param {Renderer} renderer
     * @param {ElementRef} elementRef
     *
     * @memberOf FloatingComponent
     */
    constructor(
        private renderer: Renderer,
        private elementRef: ElementRef
    ) { }

    /**
     * implements OnInit
     *
     * @memberOf FloatingComponent
     */
    ngOnInit() {
        this.options = [
            'horizontal',
            'fixed',

            'top-right',
            'top-left',
            'bottom-left',
            'bottom-right',

            'bottom-right-corner',
            'bottom-left-corner'
        ];
    }

    /**
     * implements AfterViewInit
     *
     * @memberOf FloatingComponent
     */
    ngAfterViewInit() {
        const nativeElement = this.elementRef.nativeElement;
        for (let i = 0; i < this.options.length; i++) {
            const option = this.options[i];
            if (nativeElement.hasAttribute(option)) {
                this.renderer.setElementClass(nativeElement, `floating--${option}`, true);
            }
        }
    }
}
