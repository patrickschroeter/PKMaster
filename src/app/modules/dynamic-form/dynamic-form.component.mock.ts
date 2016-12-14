import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'pk-dynamic-form',
    templateUrl: './dynamic-form.component.html',
    styleUrls: ['./dynamic-form.component.scss'],
    exportAs: 'dynamicForm'
})
export class DynamicFormComponentMock {

    public form: FormGroup;

    constructor() { }

}
