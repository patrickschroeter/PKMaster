import { Component, OnInit, Input, Renderer, ElementRef, AfterViewInit, HostBinding } from '@angular/core';

@Component({
    selector: 'pk-list-attribute',
    template: '<ng-content></ng-content>'
})
export class ListAttributeComponent implements OnInit, AfterViewInit {

    @HostBinding('class.list-element__attribute') attribute = true;

    @Input() name: string;

    constructor(private renderer: Renderer, private elementRef: ElementRef) { }

    ngOnInit() {
    }

    ngAfterViewInit() {
        if (this.name) {
            this.renderer.setElementClass(this.elementRef.nativeElement, `list-element__attribute--${this.name}`, true);
        }
    }

}
