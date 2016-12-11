import { Component, OnInit } from '@angular/core';

import { AlertService, Message } from './../../services';

@Component({
    selector: 'pk-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

    private isOverlayOpen: boolean;
    private overlayTitle: string;
    private overlayMessage: string;

    private hintElements: Array<Message>;

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
