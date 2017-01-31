import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { AlertService } from './../../../modules/alert';
import { TranslationService } from './../../../modules/translation';

import { RoleApi } from './../../../swagger';

@Injectable()
export class RoleService {

    constructor(
        private roleApi: RoleApi,
        private alert: AlertService,
        private translationService: TranslationService
    ) { }

    /**
     * Get all available roles
     */
    public getRoles(): Observable<any> {
        this.alert.setLoading(
            'getRoles',
            this.translationService.translate('getRoles')
        );
        return this.roleApi.getRoles().map(roles => {
            this.alert.removeHint('getRoles');
            return roles;
        });
    }

}
