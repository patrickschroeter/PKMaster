import { Component, OnInit, ViewChild } from '@angular/core';

import { AlertService } from './../../services';
import { ModalService } from 'app/modules/overlay';
import { Message } from './../../../../models';

@Component({
    selector: 'pk-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

    private _hintElements: Array<Message>;
    get hintElements() { return this._hintElements; }
    set hintElements(elements: Array<Message>) { this._hintElements = elements; }

    constructor(
        private alert: AlertService,
        private modalService: ModalService
    ) { }

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
