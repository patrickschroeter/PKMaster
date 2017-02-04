import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

/** Services */
import { UserApi } from './../../../swagger';
import { AlertService } from './../../../modules/alert';
import { TranslationService } from './../../../modules/translation';

/** Models */
import { AppUser, Role } from './../../../swagger';

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
            this.translationService.translate('loadingGetUsers')
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

    /**
     * update the user
     * @param {AppUser} user
     */
    public updateUser(user: AppUser): Observable<AppUser> {
        this.alert.setLoading(
            'updateUser',
            this.translationService.translate('loadingUpdateUser')
        );
        return this.userApi.updateUserById(user.id, 0, user).map(result => {
            this.alert.removeHint('updateUser');
            return result;
        });
    }

    /**
     * remove role from user
     * @param {AppUser} user
     * @param {Role} role
     */
    public removeRoleFromUser(user: AppUser, role: Role): Observable<AppUser> {
        this.alert.setLoading(
            'removeRoleFromUser',
            this.translationService.translate('loadingRemoveRoleFromUser')
        );
        return this.userApi.removeUserRole(user.id, 0, role.id).map(result => {
            this.alert.removeHint('removeRoleFromUser');
            return result;
        });
    }

    /**
     * add role to user
     * @param {String} userId
     * @param {String} roleId
     */
    public addRoleToUser(userId: string, roleId: string): Observable<AppUser> {
        this.alert.setLoading(
            'addRoleToUser',
            this.translationService.translate('loadingAddRoleToUser')
        );
        return this.userApi.updateUserRole(userId, 0, roleId).map(result => {
            this.alert.removeHint('addRoleToUser');
            return result;
        });
    }

}
