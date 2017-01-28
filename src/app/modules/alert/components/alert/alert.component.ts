import { Component, OnInit, ViewChild } from '@angular/core';

import { AlertService, Message } from './../../services';
import { OverlayComponent } from './../../../../modules/overlay';

@Component({
    selector: 'pk-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

    @ViewChild('overlay') overlay: OverlayComponent;

    private _overlayTitle: string;
    get overlayTitle() { return this._overlayTitle; }
    set overlayTitle(title: string) { this._overlayTitle = title; }
    private _overlayMessage: string;
    get overlayMessage() { return this._overlayMessage; }
    set overlayMessage(message: string) { this._overlayMessage = message; }

    private _hintElements: Array<Message>;
    get hintElements() { return this._hintElements; }
    set hintElements(elements: Array<Message>) { this._hintElements = elements; }

    public loadingElements: Array<{ id: string, message: string }>;

    constructor(private alert: AlertService) { }

    ngOnInit() {
        this.alert.getAlert().subscribe(alert => {
            this.overlayTitle = alert.title;
            this.overlayMessage = alert.message;
            if (this.overlay instanceof OverlayComponent) {
                console.log(this.overlay);
                console.log(this.overlay.toggle);
                this.overlay.toggle(alert.isOpen);
            }
        });
        this.alert.getHintMessages().subscribe(hints => {
            this.hintElements = hints;
        });
        this.alert.getLoading().subscribe(loading => {
            this.loadingElements = loading;
        });
    }

}
