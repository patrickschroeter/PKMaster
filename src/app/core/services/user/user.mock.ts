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

    /**
     * get user form
     *
     * @param {UserDetailDto} user
     * @returns {FieldDto[]}
     *
     * @memberOf UserService
     */
    public getUserForm(user: UserDetailDto): any[] {
        return [];
    }

    /**
     * get user form
     *
     * @param {UserDetailDto} user
     * @returns {FieldDto[]}
     *
     * @memberOf UserService
     */
    public getUserEditForm(user: UserDetailDto): any[] {
        return [];
    }


}
