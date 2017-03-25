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

import { Component, Input } from '@angular/core';

/**
 * ButtonAnimationWrapperComponent
 *
 * @export
 * @class ButtonAnimationWrapperComponent
 * @implements {OnInit}
 */
@Component({
    selector: 'pk-button-animation-wrapper',
    templateUrl: './button-animation-wrapper.component.html',
    styleUrls: ['./button-animation-wrapper.component.scss']
})
export class ButtonAnimationWrapperComponent {

    public isOpen: boolean;
    public _animationRight: boolean;
    public _animationUp: boolean;
    public _animationDown: boolean;

    @Input() set animationRight(i: any) { this._animationRight = true; }
    @Input() set animationUp(i: any) { this._animationUp = true; }
    @Input() set animationDown(i: any) { this._animationDown = true; }

    /**
     * Creates an instance of ButtonAnimationWrapperComponent.
     *
     * @memberOf ButtonAnimationWrapperComponent
     */
    constructor() { }

    /**
     * toggle button animation
     *
     * @memberOf ButtonAnimationWrapperComponent
     */
    public toggle(): void {
        this.isOpen = !this.isOpen;
    }

}
