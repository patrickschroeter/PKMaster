import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { FormElement } from './../../../swagger';

@Component({
    selector: 'pk-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss'],
    host: {
        '[class.element]': 'true'
    }
})
export class InputComponent implements OnInit {

    @Input() config: FormElement;

    constructor() { }

    ngOnInit() {
        if (!this.config.formControl) this.config.formControl = new FormControl(this.config.value);
    }

}
