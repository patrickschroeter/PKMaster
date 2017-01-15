import { Component, OnInit, HostBinding, Output, HostListener, EventEmitter } from '@angular/core';

@Component({
    selector: 'pk-overlay',
    templateUrl: './overlay.component.html',
    styleUrls: ['./overlay.component.scss'],
    exportAs: 'overlay'
})
export class OverlayComponent implements OnInit {

    @HostBinding('class.overlay') overlay = true;

    public isOpen: boolean = false;

    @Output() close: EventEmitter<any> = new EventEmitter();

    @HostListener('window:keydown', ['$event']) keyboardInput(event: any) {
        // Close on Escape
        if (event.keyCode === 27) {
            this.toggle(false);
        }
    }

    constructor() { }

    ngOnInit() {
    }

    public toggle(state?: boolean) {
        if (typeof state === 'undefined') {
            this.isOpen = !this.isOpen;
        } else {
            this.isOpen = state;
        }
        if (!this.isOpen) {
            this.close.emit();
        }
    }
}

/**
 * Structural transclude components
 */

@Component({
    selector: 'pk-overlay-header',
    template: '<ng-content></ng-content>'
})
export class OverlayHeaderComponent { }

@Component({
    selector: 'pk-overlay-content',
    template: '<ng-content></ng-content>'
})
export class OverlayContentComponent { }
