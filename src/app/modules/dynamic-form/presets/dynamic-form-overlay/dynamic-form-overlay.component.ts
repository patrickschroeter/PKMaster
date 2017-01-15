import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'pk-dynamic-form-overlay',
    templateUrl: './dynamic-form-overlay.component.html'
})
export class DynamicFormOverlayComponent implements OnInit {

    @Input() form;

    @Output() save: EventEmitter<any> = new EventEmitter();

    constructor() { }

    ngOnInit() {
    }

    /**
     * @description emits the value of the form
     */
    public submit(value) {
        this.save.emit(value);
    }

}
