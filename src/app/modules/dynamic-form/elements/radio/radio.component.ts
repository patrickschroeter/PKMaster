import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Field } from './../../../../swagger';

@Component({
    selector: 'pk-radio',
    templateUrl: './radio.component.html',
    styleUrls: ['./radio.component.scss']
})
export class RadioComponent implements OnInit {

    @HostBinding('class.element') element = true;

    @Input() config: Field;
    @Input() disabled: boolean;

    constructor() { }

    ngOnInit() {
        if (this.config && !this.config['formControl']) { this.config['formControl'] = new FormControl(this.config.value); }
    }

    isDisabled() {
        return this.disabled || this.config.disabled;
    }

}
