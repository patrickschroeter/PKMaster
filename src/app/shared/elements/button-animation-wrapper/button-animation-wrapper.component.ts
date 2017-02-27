import { Component, OnInit, Input, HostListener } from '@angular/core';

@Component({
    selector: 'pk-button-animation-wrapper',
    templateUrl: './button-animation-wrapper.component.html',
    styleUrls: ['./button-animation-wrapper.component.scss']
})
export class ButtonAnimationWrapperComponent implements OnInit {

    public isOpen: boolean;
    public _animationRight: boolean;
    public _animationUp: boolean;
    public _animationDown: boolean;

    @Input() set animationRight(i: any) { this._animationRight = true; }
    @Input() set animationUp(i: any) { this._animationUp = true; }
    @Input() set animationDown(i: any) { this._animationDown = true; }

    constructor() { }

    ngOnInit() {
    }

    @HostListener('click', ['$event']) onClick(e: Event) {
        console.log(e);
        this.isOpen = !this.isOpen;
    }

}
