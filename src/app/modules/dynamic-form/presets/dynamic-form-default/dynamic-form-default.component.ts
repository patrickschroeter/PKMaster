import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'pk-dynamic-form-default',
    templateUrl: './dynamic-form-default.component.html'
})
export class DynamicFormDefaultComponent implements OnInit {

    @Input() form;

    @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();
    @Output() onCancel: EventEmitter<any> = new EventEmitter<any>();

    constructor() { }

    ngOnInit() {
    }

    submit(form) {
        this.onSubmit.emit(form);
    }

    cancel() {
        this.onCancel.emit();
    }
}