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

import { AlertService } from 'app/modules/alert';
import { TranslationService } from 'app/modules/translation';

import { RoleApi } from 'app/swagger';

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
