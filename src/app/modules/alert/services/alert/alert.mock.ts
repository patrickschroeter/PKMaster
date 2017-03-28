/**
 *
 * @author Patrick Schröter <patrick.schroeter@hotmail.de>
 *
 * @license CreativeCommons BY-NC-SA 4.0 2017
 *
 * This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/.
 *
 */

import { Injectable } from '@angular/core';

import { Observable, Observer } from 'rxjs/Rx';

@Injectable()
export class AlertMock {

    constructor() { }

    public setLoading(id: string, message: string): void { }

    public removeHint(id: string): void { }

    public setAlert(title: string, message: string): void { }

    public setErrorHint(id: string, message: string, time?: number): void { }

    public setSuccessHint(id: string, message: string): void { }

    public getAlert(): Observable<any> {
        return new Observable((observer: Observer<any>) => { observer.next('alert'); });
    }

    public getHintMessages(): Observable<any> {
        return new Observable((observer: Observer<any>) => { observer.next([]); });
    }
}
