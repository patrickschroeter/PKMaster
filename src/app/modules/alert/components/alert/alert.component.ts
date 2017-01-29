import { Component, OnInit, ViewChild } from '@angular/core';

import { AlertService, Message } from './../../services';
import { ModalService } from './../../../../modules/overlay';

@Component({
    selector: 'pk-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

    private _hintElements: Array<Message>;
    get hintElements() { return this._hintElements; }
    set hintElements(elements: Array<Message>) { this._hintElements = elements; }

    public loadingElements: Array<{ id: string, message: string }>;

    constructor(
        private alert: AlertService,
        private modalService: ModalService
    ) { }

    ngOnInit() {
        this.alert.getAlert().subscribe(alert => {
            this.modalService.createErrorModal(alert.title, alert.message);
        });
        this.alert.getHintMessages().subscribe(hints => {
            this.hintElements = hints;
        });
        this.alert.getLoading().subscribe(loading => {
            this.loadingElements = loading;
        });
    }

}
