import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs/Rx';

import { UserDetailDto, RoleDto } from 'app/swagger';

@Injectable()
export class UserMock {

    constructor() { }

    /**
     * get a list of all users
     *
     * @returns {Observable<Array>}
     *
     * @memberOf UserService
     */
    public getUsers(): Observable<Array<UserDetailDto>> {
        return new Observable((observer: Observer<any[]>) => observer.next([]));
    }

    /**
     * get a list of all pk members
     *
     * @returns {Observable<Array>}
     *
     * @memberOf UserService
     */
    public getMembers(): Observable<Array<UserDetailDto>> {
        return new Observable((observer: Observer<any[]>) => observer.next([]));
    }

    /**
     * get a list of all pk guests
     *
     * @returns {Observable<Array>}
     *
     * @memberOf UserService
     */
    public getGuests(): Observable<Array<UserDetailDto>> {
        return new Observable((observer: Observer<any[]>) => observer.next([]));
    }


}
