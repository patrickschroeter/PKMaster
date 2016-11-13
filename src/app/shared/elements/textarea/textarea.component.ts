import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { FormControl } from '@angular/forms';

import { FormElement } from './../../../swagger';

@Component({
    selector: 'pk-textarea',
    templateUrl: './textarea.component.html',
    styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent implements OnInit {

    @HostBinding('class.element') element = true;

    @Input() config: FormElement;

    constructor() { }

    ngOnInit() {
        if (!this.config.formControl) this.config.formControl = new FormControl(this.config.value);
    }

}
