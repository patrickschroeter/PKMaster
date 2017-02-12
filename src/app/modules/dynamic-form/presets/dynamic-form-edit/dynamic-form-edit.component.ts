import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

/** Models */
import { FieldDto } from './../../../../swagger';

@Component({
    selector: 'pk-dynamic-form-edit',
    templateUrl: './dynamic-form-edit.component.html'
})
export class DynamicFormEditComponent implements OnInit {

    @Input() form: FieldDto[];
    @Output() onEdit: EventEmitter<any> = new EventEmitter();

    constructor() { }

    ngOnInit() {
    }

    edit(element: any) {
        this.onEdit.emit(element);
    }

}
