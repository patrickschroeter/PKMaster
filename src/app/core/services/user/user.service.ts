import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

/** Services */
import { UserApi } from './../../../swagger';
import { AlertService } from './../../../modules/alert';
import { TranslationService } from './../../../modules/translation';

/** Models */
import { AppUser } from './../../../swagger';

@Injectable()
export class UserService {

    constructor(
        private userApi: UserApi,
        private alert: AlertService,
        private translationService: TranslationService
    ) { }

    /**
     * get a list of all users
     */
    public getUsers(): Observable<Array<AppUser>> {
        this.alert.setLoading(
            'getUsers',
            this.translationService.translate('loadinggetUsers')
        );
        return this.userApi.getUsers().map(result => {
            this.alert.removeHint('getUsers');
            return result;
        });
    }

    /**
     * get user by id
     * @param {String} id
     */
    public getUserById(id: string): Observable<AppUser> {
        this.alert.setLoading(
            'getUserById',
            this.translationService.translate('loadingGetUserById')
        );
        return this.userApi.getUserById(id).map(result => {
            this.alert.removeHint('getUserById');
            return result;
        });
    }

}
