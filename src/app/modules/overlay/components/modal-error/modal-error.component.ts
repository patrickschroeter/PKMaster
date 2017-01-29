import { Component, OnInit, Injector, ViewChild } from '@angular/core';

import { OverlayComponent } from './../';

@Component({
    selector: 'pk-modal-error',
    templateUrl: './modal-error.component.html',
    styleUrls: ['./modal-error.component.scss']
})
export class ModalErrorComponent implements OnInit {

    @ViewChild('overlay') overlay: OverlayComponent;

    private title;
    private message;
    private type;

    constructor(private injector: Injector) {
        this.title = this.injector.get('title');
        this.message = this.injector.get('message');
    }

    ngOnInit() {
        this.overlay.toggle(true);
    }

}
