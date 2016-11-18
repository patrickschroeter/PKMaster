import { Component, OnInit } from '@angular/core';

import { AlertService } from './../../services';

@Component({
    selector: 'pk-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

    private isOverlayOpen: boolean;
    private overlayTitle: string;
    private overlayMessage: string;

    private hintMessage: string;
    private hintType: string;

    private loadingElements: Array<{ id, message }>;

    constructor(private alert: AlertService) { }

    ngOnInit() {
        this.alert.getTitle().subscribe(title => {
            this.overlayTitle = title;
        });
        this.alert.getMessage().subscribe(message => {
            this.overlayMessage = message;
        });
        this.alert.getOpenState().subscribe(isOpen => {
            this.isOverlayOpen = isOpen;
        });
        this.alert.getHintMessage().subscribe(hint => {
            this.hintMessage = hint[0];
            this.hintType = hint[1];
        });
        this.alert.getLoading().subscribe(loading => {
            this.loadingElements = loading;
        });
    }

    toggleOverlay() {
        this.isOverlayOpen = !this.isOverlayOpen;
    }

}
