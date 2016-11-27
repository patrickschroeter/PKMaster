import { Component, OnInit, Input, Renderer, ElementRef, AfterViewInit, HostBinding } from '@angular/core';

@Component({
    selector: 'pk-list-attribute',
    templateUrl: './list-attribute.component.html',
    styleUrls: ['./list-attribute.component.scss']
})
export class ListAttributeComponent implements OnInit, AfterViewInit {

    @HostBinding('class.list-element__attribute') attribute = true;

    @Input() className;

    constructor(private renderer: Renderer, private elementRef: ElementRef) { }

    ngOnInit() {
    }

    ngAfterViewInit() {
        if (this.className) {
            this.renderer.setElementClass(this.elementRef.nativeElement, `list-element__attribute--${this.className}`, true);
        }
    }

}
