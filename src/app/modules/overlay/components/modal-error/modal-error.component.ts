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

import { Component, OnInit, Injector, ViewChild } from '@angular/core';

import { OverlayComponent } from './../';

/**
 * ModalErrorComponent
 *
 * @export
 * @class ModalErrorComponent
 * @implements {OnInit}
 */
@Component({
    selector: 'pk-modal-error',
    templateUrl: './modal-error.component.html',
    styleUrls: ['./modal-error.component.scss']
})
export class ModalErrorComponent implements OnInit {

    @ViewChild('overlay') overlay: OverlayComponent;

    public title: string;
    public message: string;

    /**
     * Creates an instance of ModalErrorComponent.
     * @param {Injector} injector
     *
     * @memberOf ModalErrorComponent
     */
    constructor(private injector: Injector) {
        this.title = this.injector.get('title');
        this.message = this.injector.get('message');
    }

    /**
     * implements OnInit
     *
     * @memberOf ModalErrorComponent
     */
    ngOnInit() {
        if (this.overlay instanceof OverlayComponent) {
            this.overlay.toggle(true);
        }
    }

}
