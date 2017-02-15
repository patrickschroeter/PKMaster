import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs/Rx';

import { AlertService } from './../../../modules/alert';
import { TranslationService } from './../../../modules/translation';

import { RoleApi } from './../../../swagger';

@Injectable()
export class RoleMock {

    constructor() { }

    /**
     * Get all available roles
     */
    public getRoles(): Observable<any> {
        return new Observable((observer: Observer<any>) => {
            observer.next([]);
        });
    }

}
