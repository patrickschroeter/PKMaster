import { Injectable } from '@angular/core';

import { Observable, Observer } from 'rxjs/Rx';

@Injectable()
export class FormMock {

    constructor() {}

    /**
     * @description return the observable for editing an element
     * @return {Observable}
     */
    onEditElement(): Observable<any> {
        return new Observable(observer => { });
    }
}
