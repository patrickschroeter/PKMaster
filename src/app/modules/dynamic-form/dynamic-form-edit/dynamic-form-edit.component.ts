import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'pk-dynamic-form-edit',
    templateUrl: './dynamic-form-edit.component.html'
})
export class DynamicFormEditComponent implements OnInit {

    @Input() form;

    constructor() { }

    ngOnInit() {
    }

}
