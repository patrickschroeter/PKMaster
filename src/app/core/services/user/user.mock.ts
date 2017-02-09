import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { UserDto, RoleDto } from './../../../swagger';

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
    public getUsers(): Observable<Array<UserDto>> {
        return new Observable(observer => observer.next([]));
    }

    /**
     * get a list of all pk members
     *
     * @returns {Observable<Array>}
     *
     * @memberOf UserService
     */
    public getMembers(): Observable<Array<UserDto>> {
        return new Observable(observer => observer.next([]));
    }

    /**
     * get a list of all pk guests
     *
     * @returns {Observable<Array>}
     *
     * @memberOf UserService
     */
    public getGuests(): Observable<Array<UserDto>> {
        return new Observable(observer => observer.next([]));
    }


}
