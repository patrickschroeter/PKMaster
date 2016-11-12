import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'pk-form-validation',
    templateUrl: './form-validation.component.html',
    styleUrls: ['./form-validation.component.scss']
})
export class FormValidationComponent implements OnInit {
    @HostBinding('class') classes = 'hint';

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
