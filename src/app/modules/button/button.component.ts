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

import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    HostBinding,
    AfterViewInit,
    ElementRef,
    Renderer
} from '@angular/core';

/**
 * ButtonComponent
 *
 * @export
 * @class ButtonComponent
 * @implements {OnInit}
 * @implements {AfterViewInit}
 */
@Component({
    selector: 'pk-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit, AfterViewInit {

    @HostBinding('class.element') element = true;

    @Input() icon: string;
    @Input() value: string;
    @Input() type = 'button';
    @Output() onClick = new EventEmitter<any>();

    private options: String[];

    constructor(
        private renderer: Renderer,
        private elementRef: ElementRef
    ) { }

    /**
     * implements OnInit
     *
     * @memberOf ButtonComponent
     */
    ngOnInit() {
        this.options = [
            'rounded',
            'light',
            'disabled'
        ];
    }

    /**
     * implements AfterViewInit
     *
     * @memberOf ButtonComponent
     */
    ngAfterViewInit() {
        const nativeElement = this.elementRef.nativeElement;
        for (let i = 0; i < this.options.length; i++) {
            const option = this.options[i];
            if (nativeElement.hasAttribute(option)) {
                this.renderer.setElementClass(nativeElement, `element--${option}`, true);
            }
        }
    }

    /**
     * emit button click
     *
     * @memberOf ButtonComponent
     */
    public emit() {
        this.onClick.emit();
    }

}
