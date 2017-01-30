import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Observable, Observer } from 'rxjs/Rx';

import { Role } from './../../../swagger';

@Injectable()
export class RoleEndpoint {

    constructor() { }

    /**
     * Mock Server
     */

    // tslint:disable-next-line:member-ordering
    private _list: Role[] = [

    ];

    private _roles(): Role[] {
        return JSON.parse(JSON.stringify(this._list));
    }

    private _roleAdd(role: Role): Role {
        const id = this._list.length === 0 ? 'Q' : this._list[this._list.length - 1].id + 'Q';
        role.id = id;
        this._list.push(role);
        return JSON.parse(JSON.stringify(this._list[this._list.length - 1]));
    }

    private _role(id?: string): Role {
        let result: Role;
        const list = this._list;
        for (let i = 0, length = list.length; i < length; i++) {
            if (list[i].id === id) {
                result = list[i];
            }
        }
        if (!result) { return null; }
        return JSON.parse(JSON.stringify(result));
    }

    private _roleUpdate(id: string, role: Role) {
        const list = this._list;
        for (let i = 0, length = list.length; i < length; i++) {
            if (list[i].id === id) {
                list[i] = role;
                return JSON.parse(JSON.stringify(list[i]));
            }
        }
        return null;
    }
}
