import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';

@Injectable()
export class FormMock {

    constructor() {}

    /**
     * @description return the observable for the adding element status
     * @return {Observable}
     */
    getAddingElement(): Observable<any> {
        return new Observable(observer => { });
    }

    /**
     * @description return the observable for editing an element
     * @return {Observable}
     */
    onEditElement(): Observable<any> {
        return new Observable(observer => { });
    }
}
