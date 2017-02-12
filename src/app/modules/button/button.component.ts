import { Component, OnInit, Input, Output, EventEmitter, HostBinding, AfterViewInit, ElementRef, Renderer } from '@angular/core';

@Component({
    selector: 'pk-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit, AfterViewInit {

    @HostBinding('class.element') element = true;

    @Input() icon: string;
    @Input() value: string;
    @Input() type = 'button';
    @Output() onClick = new EventEmitter<any>();

    private options: String[];

    constructor(private renderer: Renderer, private elementRef: ElementRef) { }

    ngOnInit() {
        this.options = [
            'rounded',
            'light',
            'disabled'
        ];
    }

    ngAfterViewInit() {
        const nativeElement = this.elementRef.nativeElement;
        for (let i = 0; i < this.options.length; i++) {
            const option = this.options[i];
            if (nativeElement.hasAttribute(option)) {
                this.renderer.setElementClass(nativeElement, `element--${option}`, true);
            }
        }
    }

    emit() {
        this.onClick.emit();
    }

}
