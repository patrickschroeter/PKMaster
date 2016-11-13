import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { FormControl } from '@angular/forms';

import { FormElement } from './../../../swagger';

@Component({
    selector: 'pk-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {

    @HostBinding('class.element') element = true;
    @HostBinding('class.element--primary') elementPrimary = true;

    @Input() config: FormElement;

    constructor() { }

    ngOnInit() {
        if (!this.config.formControl) { this.config.formControl = new FormControl(this.config.value); }
    }

}
