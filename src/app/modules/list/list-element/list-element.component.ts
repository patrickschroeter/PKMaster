import { Component, OnInit, HostBinding, ElementRef, Renderer, AfterViewInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    selector: 'pk-list-element',
    template: '<ng-content></ng-content>'
})
export class ListElementComponent implements OnInit, AfterViewInit, OnChanges {

    @HostBinding('class.list-element') element = true;
    @HostBinding('class.animation') animation = true;
    @HostBinding('class.animation--trigger') animationTrigger = true;

    @Input() name: string;

    constructor(private renderer: Renderer, private elementRef: ElementRef) { }

    ngOnInit() {
    }

    ngAfterViewInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['name']) {
            this.renderer.setElementClass(this.elementRef.nativeElement, `list-element--${changes['name'].previousValue}`, false);
            this.renderer.setElementClass(this.elementRef.nativeElement, `list-element--${changes['name'].currentValue}`, true);
        }
    }
}
