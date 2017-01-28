import { Component, OnInit, Injector, ViewChild } from '@angular/core';

import { OverlayComponent } from './../';

@Component({
    selector: 'pk-overlay-default',
    templateUrl: './overlay-default.component.html',
    styleUrls: ['./overlay-default.component.scss']
})
export class OverlayDefaultComponent implements OnInit {

    @ViewChild('overlay') overlay: OverlayComponent;

    private title;
    private message;

    constructor(private injector: Injector) {
        this.title = this.injector.get('title');
        this.message = this.injector.get('message');
    }

    ngOnInit() {
        this.overlay.toggle(true);
    }

}
