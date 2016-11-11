import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { FormElement } from './../../../swagger';

@Component({
    selector: 'pk-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.scss'],
    host: {
        '[class.element--primary]': 'true',
        '[class.element]': 'true'
    }
})
export class CheckboxComponent implements OnInit {

    @Input() config: FormElement;

    constructor() { }

    ngOnInit() {
        if (!this.config.formControl) this.config.formControl = new FormControl(this.config.value);
    }

}
