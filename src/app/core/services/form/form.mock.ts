import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';

@Injectable()
export class FormMock {

    static FORM = { title: 'Titel der Form', id: 13, elements: [ { elementType: 'h3', name: 'header01', value: 'Hochschule für Angewandte Wissenschaften Augsburg', styles: ['small'] }, { elementType: 'input', name: 'date', type: 'date', label: 'Augsburg, den', styles: ['small'] }]};

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
