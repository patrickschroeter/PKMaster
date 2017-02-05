import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class UserMock {

    constructor() { }


    /**
     * get a list of all users
     */
    public getUsers(): Observable<Array<any>> {
        return new Observable(observer => observer.next([]));
    }

}
