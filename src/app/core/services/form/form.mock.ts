import { Injectable } from '@angular/core';

import { Observable, Observer } from 'rxjs/Rx';

import { Field } from './../../../swagger';

@Injectable()
export class FormMock {

    constructor() { }

    getAddingElement(): Observable<any> {
        return new Observable((observer: Observer<any>) => { observer.next('adding'); });
    }

    onEditElement(): Observable<any> {
        return new Observable((observer: Observer<any>) => { observer.next('edit'); });
    }

    getFormById(id: number): Observable<any> {
        return new Observable((observer: Observer<any>) => {
            /** http getFormById(id) => this.currentForm = result */
            setTimeout(() => {
                observer.next({});
                observer.complete();
            }, 200);
        });
    }

    getForms(sort?: string): Observable<any> {
        return new Observable((observer: Observer<any>) => { observer.next([]); });
    }

    getEditFormTemplate(id?: number): Observable<any> {
        return new Observable((observer: Observer<any>) => { observer.next([]); });
    }

    editElementError(type: string): void { }

    public setAddingElement(addingElement: boolean) { }

    public removeElement(element?: Field, index?: number): boolean {
        return !!element;
    }

    public addElementToForm(element: Field, mode?: 'clone' | 'add'): boolean {
        return !!element;
    }
}
