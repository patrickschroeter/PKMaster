import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'pk-button-animation-wrapper',
    templateUrl: './button-animation-wrapper.component.html',
    styleUrls: ['./button-animation-wrapper.component.scss']
})
export class ButtonAnimationWrapperComponent implements OnInit {

    public _animationRight: boolean;
    public _animationUp: boolean;
    public _animationDown: boolean;

    @Input() set animationRight(i) { this._animationRight = true; }
    @Input() set animationUp(i) { this._animationUp = true; }
    @Input() set animationDown(i) { this._animationDown = true; }

    constructor() { }

    ngOnInit() {
    }

}
