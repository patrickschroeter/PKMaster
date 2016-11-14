import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import { AlertService } from './core';

@Component({
    selector: 'pk-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

    private isOverlayOpen: boolean;
    private overlayTitle: string;
    private overlayMessage: string;

    private hintMessage: string;

    private loadingElements: Array<{ id, message }>;

    constructor(private alert: AlertService) {  }

    ngOnInit() {
        this.alert.getTitle().subscribe(title => {
            this.overlayTitle = title;
        });
        this.alert.getMessage().subscribe(message => {
            this.overlayMessage = message;
        });
        this.alert.getOpenState().subscribe(isOpen => {
            this.isOverlayOpen = isOpen;
        })
        this.alert.getHintMessage().subscribe(message => {
            this.hintMessage = message;
        })
        this.alert.getLoading().subscribe(loading => {
            this.loadingElements = loading;
        })
    }

    toggleOverlay() {
        this.isOverlayOpen = !this.isOverlayOpen;
    }
}
