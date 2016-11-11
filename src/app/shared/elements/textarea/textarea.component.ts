import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { FormElement } from './../../../swagger';

@Component({
    selector: 'pk-textarea',
    templateUrl: './textarea.component.html',
    styleUrls: ['./textarea.component.scss'],
    host: {
        '[class.element]': 'true'
    }
})
export class TextareaComponent implements OnInit {

    @Input() config: FormElement;

    constructor() { }

    ngOnInit() {
        if (!this.config.formControl) this.config.formControl = new FormControl(this.config.value);
    }

}
