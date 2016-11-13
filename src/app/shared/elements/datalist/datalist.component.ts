import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { FormControl } from '@angular/forms';

import { FormElement } from './../../../swagger';

@Component({
    selector: 'pk-datalist',
    templateUrl: './datalist.component.html',
    styleUrls: ['./datalist.component.scss']
})
export class DatalistComponent implements OnInit {

    @HostBinding('class.element') element = true;

    @Input() config: FormElement;

    constructor() { }

    ngOnInit() {
        if (!this.config.formControl) { this.config.formControl = new FormControl(this.config.value); }
    }

}
