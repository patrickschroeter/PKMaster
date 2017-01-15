import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'pk-dynamic-form-edit',
    templateUrl: './dynamic-form-edit.component.html'
})
export class DynamicFormEditComponent implements OnInit {

    @Input() form;
    @Output() onEdit: EventEmitter<any> = new EventEmitter();

    constructor() { }

    ngOnInit() {
    }

    edit(element) {
        this.onEdit.emit(element);
    }

}
