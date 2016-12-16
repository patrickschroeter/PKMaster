import { Component, OnInit } from '@angular/core';

import { AlertService, Message } from './../../services';

@Component({
    selector: 'pk-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

    private _isOverlayOpen: boolean;
    get isOverlayOpen() { return this._isOverlayOpen; }
    set isOverlayOpen(isOpen: boolean) { this._isOverlayOpen = isOpen; }
    private _overlayTitle: string;
    get overlayTitle() { return this._overlayTitle; }
    set overlayTitle(title: string) { this._overlayTitle = title; }
    private _overlayMessage: string;
    get overlayMessage() { return this._overlayMessage; }
    set overlayMessage(message: string) { this._overlayMessage = message; }

    private _hintElements: Array<Message>;
    get hintElements() { return this._hintElements; }
    set hintElements(elements: Array<Message>) { this._hintElements = elements; }

    private loadingElements: Array<{ id, message }>;

    constructor(private alert: AlertService) { }

    ngOnInit() {
        this.alert.getAlert().subscribe(alert => {
            this.overlayTitle = alert.title;
            this.overlayMessage = alert.message;
            this.isOverlayOpen = alert.isOpen;
        });
        this.alert.getHintMessages().subscribe(hints => {
            this.hintElements = hints;
        });
        this.alert.getLoading().subscribe(loading => {
            this.loadingElements = loading;
        });
    }

    toggleOverlay() {
        this.isOverlayOpen = !this.isOverlayOpen;
    }

}
