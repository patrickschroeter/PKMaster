import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';

@Injectable()
export class AlertMock {

    constructor() { }

    public setLoading(id: string, message: string): void { }

    public removeHint(id: string): void { }

    public setAlert(title: string, message: string): void { }

    public setErrorHint(id: string, message: string, time?: number): void { }

    public getAlert(): Observable<any> {
        return new Observable(observer => { observer.next('alert'); });
    }

    public getHintMessages(): Observable<any> {
        return new Observable(observer => { observer.next([]); });
    }

    public getLoading(): Observable<any> {
        return new Observable(observer => { observer.next(['loading']); });
    }
}
