import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class FormElementMock {

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
