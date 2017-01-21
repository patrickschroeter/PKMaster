import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs/Rx';

@Injectable()
export class FormElementMock {

    static FORMELEMENT = { fieldType: 'input', name: 'date', contentType: 'date', label: 'Augsburg, den', styles: ['small'] };

    constructor() {}

    getElement(): Observable<any> {
        return new Observable((observer: Observer<any>) => {});
    }

    getElementPreview(): Observable<any> {
        return new Observable((observer: Observer<any>) => {});
    }

    getElementHasSubmit(): Observable<any> {
        return new Observable((observer: Observer<any>) => {});
    }

    getElementHasPreview(): Observable<any> {
        return new Observable((observer: Observer<any>) => {});
    }

    getElementHasValidations(): Observable<any> {
        return new Observable((observer: Observer<any>) => {});
    }

    getElementHasStyles(): Observable<any> {
        return new Observable((observer: Observer<any>) => {});
    }
}
