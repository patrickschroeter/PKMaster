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

import { Component, OnInit, ViewChild } from '@angular/core';

import { AlertService } from './../../services';
import { ModalService } from 'app/modules/overlay';
import { Message } from 'app/models';

/**
 * AlertComponent
 *
 * @export
 * @class AlertComponent
 * @implements {OnInit}
 */
@Component({
    selector: 'pk-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

    private _hintElements: Array<Message>;
    get hintElements() { return this._hintElements; }
    set hintElements(elements: Array<Message>) { this._hintElements = elements; }

    /**
     * Creates an instance of AlertComponent.
     * @param {AlertService} alert
     * @param {ModalService} modalService
     *
     * @memberOf AlertComponent
     */
    constructor(
        private alert: AlertService,
        private modalService: ModalService
    ) { }

    /**
     * implements OnInit
     *
     * @memberOf AlertComponent
     */
    ngOnInit() {
        this.alert.getAlert().subscribe(alert => {
            this.modalService.createErrorModal({
                title: alert.title,
                message: alert.message
            });
        });
        this.alert.getHintMessages().subscribe(hints => {
            this.hintElements = hints;
        });
    }

}
