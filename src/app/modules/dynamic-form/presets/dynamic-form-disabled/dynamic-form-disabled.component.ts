import { Component, OnInit, Input } from '@angular/core';

/** Models */
import { FieldDto } from './../../../../swagger';

@Component({
    selector: 'pk-dynamic-form-disabled',
    templateUrl: './dynamic-form-disabled.component.html'
})
export class DynamicFormDisabledComponent implements OnInit {

    @Input() form: FieldDto[];

    constructor() { }

    ngOnInit() {
    }

}
