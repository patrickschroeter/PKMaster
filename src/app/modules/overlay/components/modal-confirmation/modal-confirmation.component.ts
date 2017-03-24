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

import { Component, OnInit, ViewChild, Injector } from '@angular/core';

import { OverlayComponent } from './../';

import { FieldDto } from 'app/swagger';

/**
 * ModalConfirmationComponent
 *
 * @export
 * @class ModalConfirmationComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'pk-modal-confirmation',
  templateUrl: './modal-confirmation.component.html',
  styleUrls: ['./modal-confirmation.component.scss']
})
export class ModalConfirmationComponent implements OnInit {

    @ViewChild('overlay') overlay: OverlayComponent;

    public title: string;
    public message: string;
    public confirm: Function;
    public confirmText: string;
    public cancel: Function;
    public cancelText: string;

    public confirmationForm: FieldDto[];

    /**
     * Creates an instance of ModalConfirmationComponent.
     * @param {Injector} injector
     *
     * @memberOf ModalConfirmationComponent
     */
    constructor(private injector: Injector) {
        this.title = this.injector.get('title');
        this.message = this.injector.get('message');
        this.confirm = this.injector.get('confirm');
        this.confirmText = this.injector.get('confirmText');
        this.cancel = this.injector.get('cancel');
        this.cancelText = this.injector.get('cancelText');
    }

    /**
     * implements OnInit
     *
     * @memberOf ModalConfirmationComponent
     */
    ngOnInit() {
        if (this.overlay instanceof OverlayComponent) {
            this.overlay.toggle(true);
        }
    }

}
