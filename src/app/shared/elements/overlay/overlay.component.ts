import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'pk-overlay',
    templateUrl: './overlay.component.html',
    styleUrls: ['./overlay.component.scss'],
    host: {
        '[class.overlay]': 'true'
    }
})
export class OverlayComponent implements OnInit {

    @Input() isOpen: boolean;

    @Output() toggleOverlay: EventEmitter<any> = new EventEmitter<any>();

    constructor() { }

    ngOnInit() {
    }

    toggle() {
        this.toggleOverlay.emit();
    }
}
