import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

/** Services */
import { UserApi } from './../../../swagger';
import { AlertService } from './../../../modules/alert';
import { TranslationService } from './../../../modules/translation';

/** Models */
import { AppUser, Role } from './../../../swagger';

/** Decorators */
import { Loading } from './../../../shared/decorators/loading.decorator';

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
    @Loading('getUsers')
    public getUsers(): Observable<Array<AppUser>> {
        return this.userApi.getUsers().map(result => {
            return result;
        });
    }

    /**
     * get user by id
     * @param {String} id
     */
    @Loading('getUserById')
    public getUserById(id: string): Observable<AppUser> {
        return this.userApi.getUserById(id).map(result => {
            return result;
        });
    }

    /**
     * update the user
     * @param {AppUser} user
     */
    @Loading('updateUser')
    public updateUser(user: AppUser): Observable<AppUser> {
        return this.userApi.updateUserById(user.id, 0, user).map(result => {
            return result;
        });
    }

    /**
     * remove role from user
     * @param {AppUser} user
     * @param {Role} role
     */
    @Loading('removeRoleFromUser')
    public removeRoleFromUser(user: AppUser, role: Role): Observable<AppUser> {
        return this.userApi.removeUserRole(user.id, 0, role.id).map(result => {
            return result;
        });
    }

    /**
     * add role to user
     * @param {String} userId
     * @param {String} roleId
     */
    @Loading('addRoleToUser')
    public addRoleToUser(userId: string, roleId: string): Observable<AppUser> {
        return this.userApi.updateUserRole(userId, 0, roleId).map(result => {
            return result;
        });
    }

}
