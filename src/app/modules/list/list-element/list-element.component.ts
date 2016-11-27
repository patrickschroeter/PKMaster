import { Component, OnInit, HostBinding, ElementRef, Renderer, AfterViewInit, Input } from '@angular/core';

@Component({
    selector: 'pk-list-element',
    template: '<ng-content></ng-content>'
})
export class ListElementComponent implements OnInit, AfterViewInit {

    @HostBinding('class.list-element') element = true;

    @Input() name;

    constructor(private renderer: Renderer, private elementRef: ElementRef) { }

    ngOnInit() {
    }

    ngAfterViewInit() {
        if (this.name) {
            this.renderer.setElementClass(this.elementRef.nativeElement, `list-element--${this.name}`, true);
        }
    }
}
