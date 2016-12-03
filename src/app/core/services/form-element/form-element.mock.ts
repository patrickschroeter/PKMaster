import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class FormElementMock {

    static FORMELEMENT = { elementType: 'input', name: 'date', type: 'date', label: 'Augsburg, den', styles: ['small'] };

    constructor() {}

    getElement(): Observable<any> {
        return new Observable(observer => {});
    }

    getElementPreview(): Observable<any> {
        return new Observable(observer => {});
    }

    getElementHasSubmit(): Observable<any> {
        return new Observable(observer => {});
    }

    getElementHasPreview(): Observable<any> {
        return new Observable(observer => {});
    }

    getElementHasValidations(): Observable<any> {
        return new Observable(observer => {});
    }

    getElementHasStyles(): Observable<any> {
        return new Observable(observer => {});
    }
}
