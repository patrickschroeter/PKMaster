import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'pk-form-validation',
    templateUrl: './form-validation.component.html',
    styleUrls: ['./form-validation.component.scss'],
    host: {
        '[class.element__validation]': 'true'
    }
})
export class FormValidationComponent implements OnInit {

    @Input() control: FormControl | FormGroup;
    @Input() inputLabel: string;
    @Input() inputName?: string;

    constructor() { }

    ngOnInit() {
    }

    /**
     * Validate the given Error in the Control
     */
    hasError(errorName: string) : boolean {
        if (this.inputName) return this.control.hasError(errorName, [this.inputName]);
        return this.control.hasError(errorName);
    }

}
