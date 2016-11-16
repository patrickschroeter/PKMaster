import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { FormControl } from '@angular/forms';

import { FormElement } from './../../../swagger';

@Component({
    selector: 'pk-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

    @HostBinding('class.element') element = true;

    @Input() config: FormElement;

    constructor() { }

    ngOnInit() {
        if (this.config && !this.config.formControl) { this.config.formControl = new FormControl(this.config.value); }
    }

}
