import { Component, OnInit, Renderer, ElementRef, AfterViewInit, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'pk-floating',
    template: '<ng-content></ng-content>',
    styleUrls: ['./floating.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FloatingComponent implements OnInit, AfterViewInit {

    @HostBinding('class.floating') floating = true;
    @HostBinding('class.animation--target') animation = true;

    private options: String[];

    constructor(private renderer: Renderer, private elementRef: ElementRef) { }

    ngOnInit() {
        this.options = [
            'horizontal',
            'fixed',

            'top-right',
            'top-left',
            'bottom-left',
            'bottom-right',

            'bottom-right-corner',
            'bottom-left-corner'
        ];
    }

    ngAfterViewInit() {
        let nativeElement = this.elementRef.nativeElement;
        for (let i = 0, length = this.options.length; i < length; i++) {
            let option = this.options[i];
            if (nativeElement.hasAttribute(option)) {
                this.renderer.setElementClass(nativeElement, `floating--${option}`, true);
            }
        }
    }
}
