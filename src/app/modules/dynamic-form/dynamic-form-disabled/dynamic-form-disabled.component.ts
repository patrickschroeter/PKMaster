import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'pk-dynamic-form-disabled',
    templateUrl: './dynamic-form-disabled.component.html'
})
export class DynamicFormDisabledComponent implements OnInit {

    @Input() form;

    constructor() { }

    ngOnInit() {
    }

}
