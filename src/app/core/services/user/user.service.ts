import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

/** Services */
import { UserApi } from './../../../swagger';
import { AlertService } from './../../../modules/alert';
import { TranslationService } from './../../../modules/translation';

/** Models */
import { UserDetailDto, RoleDto } from './../../../swagger';

/** Decorators */
import { Loading } from './../../../shared/decorators/loading.decorator';

/**
 * A service taking care of the users
 *
 * @export
 * @class UserService
 */
@Injectable()
export class UserService {

    /**
     * Creates an instance of UserService.
     *
     * @param {UserApi} userApi
     * @param {AlertService} alert
     * @param {TranslationService} translationService
     *
     * @memberOf UserService
     */
    constructor(
        private userApi: UserApi,
        private alert: AlertService,
        private translationService: TranslationService
    ) { }

    /**
     * get a list of all users
     *
     * @returns {Observable<Array>}
     *
     * @memberOf UserService
     */
    @Loading('getUsers')
    public getUsers(): Observable<Array<UserDetailDto>> {
        return this.userApi.getUsers().map(result => {
            return result;
        });
    }

    /**
     * get a list of all pk members
     *
     * @returns {Observable<Array>}
     *
     * @memberOf UserService
     */
    public getMembers(): Observable<Array<UserDetailDto>> {
        return this.userApi.getUsers().map(result => {
            // TODO: get special user
            // const param = result.filter(obj => obj.roles[0].name === 'Member');
            return result;
        });
    }

    /**
     * get a list of all pk guests
     *
     * @returns {Observable<Array>}
     *
     * @memberOf UserService
     */
    public getGuests(): Observable<Array<UserDetailDto>> {
        return this.userApi.getUsers().map(result => {
            // TODO: get special user
            // const param = result.filter(obj => obj.roles[0].name === 'Docent');
            return result;
        });
    }

    /**
     * get user by id
     *
     * @param {string} id
     * @returns {Observable<UserDetailDto>}
     *
     * @memberOf UserService
     */
    @Loading('getUserById')
    public getUserById(id: string): Observable<UserDetailDto> {
        return this.userApi.getUserById(id).map(result => {
            return result;
        });
    }

    /**
     * update the user
     *
     * @param {UserDetailDto} user
     * @returns {Observable<UserDetailDto>}
     *
     * @memberOf UserService
     */
    @Loading('updateUser')
    public updateUser(user: UserDetailDto): Observable<UserDetailDto> {
        return this.userApi.updateUserById(user.id, user).map(result => {
            return result;
        });
    }

    /**
     * remove role from user
     *
     * @param {UserDetailDto} user
     * @param {RoleDto} role
     * @returns {Observable<UserDetailDto>}
     *
     * @memberOf UserService
     */
    @Loading('removeRoleFromUser')
    public removeRoleFromUser(user: UserDetailDto, role: RoleDto): Observable<UserDetailDto> {
        return this.userApi.removeRoleFromUser(user.id, role.id).map(result => {
            return result;
        });
    }

    /**
     * add role to user
     *
     * @param {string} userId
     * @param {string} roleId
     * @returns {Observable<UserDetailDto>}
     *
     * @memberOf UserService
     */
    @Loading('addRoleToUser')
    public addRoleToUser(userId: string, roleId: string): Observable<UserDetailDto> {
        return this.userApi.addRoleToUser(userId, roleId).map(result => {
            return result;
        });
    }

}
