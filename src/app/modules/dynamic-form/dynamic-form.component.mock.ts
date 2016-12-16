// tslint:disable:component-class-suffix
// tslint:disable:no-unused-variable

import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'pk-dynamic-form',
    templateUrl: './dynamic-form.component.html',
    styleUrls: ['./dynamic-form.component.scss'],
    exportAs: 'dynamicForm'
})
export class DynamicFormComponentMock {

    private _form: FormGroup;
    get form() { return this._form; }
    set form(formGroup: FormGroup) { this._form = formGroup; }
    private _isFormValidationVisible: boolean = false;
    get isFormValidationVisible() { return this._isFormValidationVisible; }
    set isFormValidationVisible(isOpen: boolean) { this._isFormValidationVisible = isOpen; }


    constructor() { }

    showFormValidation(form) { }

    hideFormValidation() { }
}
