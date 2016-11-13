import { Component, OnInit, Input, Output, EventEmitter, HostBinding } from '@angular/core';

@Component({
    selector: 'pk-overlay',
    templateUrl: './overlay.component.html',
    styleUrls: ['./overlay.component.scss']
})
export class OverlayComponent implements OnInit {

    @HostBinding('class.overlay') overlay = true;

    @Input() isOpen: boolean;

    @Output() toggleOverlay: EventEmitter<any> = new EventEmitter<any>();

    constructor() { }

    ngOnInit() {
    }

    toggle() {
        this.toggleOverlay.emit();
    }
}
