import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';

@Injectable()
export class FormMock {

    constructor() { }

    getAddingElement(): Observable<any> {
        return new Observable(observer => { observer.next('adding'); });
    }

    onEditElement(): Observable<any> {
        return new Observable(observer => { observer.next('edit'); });
    }

    getFormById(id: number): Observable<any> {
        return new Observable(observer => {
            /** http getFormById(id) => this.currentForm = result */
            setTimeout(() => {
                observer.next({});
                observer.complete();
            }, 200);
        });
    }

    getForms(sort?: string): Observable<any> {
        return new Observable(observer => { observer.next([]); });
    }

    getEditFormTemplate(id?: number): Observable<any> {
        return new Observable(observer => { observer.next([]); });
    }

    editElementError(type: string): void {
    }
}
