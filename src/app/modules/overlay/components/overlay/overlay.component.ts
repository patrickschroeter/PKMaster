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

import { Component, HostBinding, Output, HostListener, EventEmitter } from '@angular/core';

/**
 * OverlayComponent
 *
 * @export
 * @class OverlayComponent
 */
@Component({
    selector: 'pk-overlay',
    templateUrl: './overlay.component.html',
    styleUrls: ['./overlay.component.scss'],
    exportAs: 'overlay'
})
export class OverlayComponent {

    @HostBinding('class.overlay') overlay = true;

    public isOpen = false;

    @Output() close: EventEmitter<any> = new EventEmitter();

    @HostListener('window:keydown', ['$event']) keyboardInput(event: any) {
        // Close on Escape
        if (event.keyCode === 27) {
            this.toggle(false);
        }
    }

    constructor() { }

    /**
     * toggle the state of the overlay, or set the value
     *
     * @param {boolean} [state]
     *
     * @memberOf OverlayComponent
     */
    public toggle(state?: boolean) {
        if (typeof state === 'undefined') {
            this.isOpen = !this.isOpen;
        } else {
            this.isOpen = state;
        }
        if (!this.isOpen) {
            this.close.emit();
        }
    }
}

/**
 * OverlayHeaderComponent
 * Structural transclude component
 *
 * @export
 * @class OverlayHeaderComponent
 */
@Component({
    selector: 'pk-overlay-header',
    template: '<ng-content></ng-content>'
})
export class OverlayHeaderComponent { }

/**
 * OverlayContentComponent
 * Structural transclude component
 *
 * @export
 * @class OverlayContentComponent
 */
@Component({
    selector: 'pk-overlay-content',
    template: '<ng-content></ng-content>'
})
export class OverlayContentComponent { }
