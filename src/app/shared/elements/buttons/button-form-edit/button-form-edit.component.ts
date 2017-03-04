import { Component, Input } from '@angular/core';

/** Models */
import { FormDetailDto } from './../../../../swagger';

@Component({
    selector: 'pk-button-form-edit',
    templateUrl: './button-form-edit.component.html'
})
export class ButtonFormEditComponent {

    @Input() form: FormDetailDto;

    constructor() { }

}
