import { Component, OnInit, Input, Output, EventEmitter, HostBinding } from '@angular/core';

@Component({
    selector: 'pk-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

    @HostBinding('class.element') element = true;

    @Input() icon: string;
    @Input() value: string;
    @Input() type: string = 'button';
    @Output() onClick = new EventEmitter<any>();

    constructor() { }

    ngOnInit() {
    }

    emit() {
        this.onClick.emit();
    }

}
