import { Component, OnInit, HostBinding, Input } from '@angular/core';

@Component({
    selector: 'pk-overlay',
    templateUrl: './overlay.component.html',
    styleUrls: ['./overlay.component.scss'],
    exportAs: 'overlay'
})
export class OverlayComponent implements OnInit {

    @HostBinding('class.overlay') overlay = true;

    private isOpen: boolean = false;

    constructor() { }

    ngOnInit() {
    }

    public toggle() {
        this.isOpen = !this.isOpen;
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
