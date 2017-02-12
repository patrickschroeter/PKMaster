import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

/** Services */
import { UserApi } from './../../../swagger';
import { AlertService } from './../../../modules/alert';
import { TranslationService } from './../../../modules/translation';

/** Models */
import { UserDto, RoleDto } from './../../../swagger';

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
    public getUsers(): Observable<Array<UserDto>> {
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
    public getMembers(): Observable<Array<UserDto>> {
        return this.userApi.getUsers().map(result => {
            const param = result.filter(obj => obj.roles[0].name === 'Member');
            return param;
        });
    }

    /**
     * get a list of all pk guests
     *
     * @returns {Observable<Array>}
     *
     * @memberOf UserService
     */
    public getGuests(): Observable<Array<UserDto>> {
        return this.userApi.getUsers().map(result => {
            const param = result.filter(obj => obj.roles[0].name === 'Docent');
            return param;
        });
    }

    /**
     * get user by id
     *
     * @param {string} id
     * @returns {Observable<UserDto>}
     *
     * @memberOf UserService
     */
    @Loading('getUserById')
    public getUserById(id: string): Observable<UserDto> {
        return this.userApi.getUserById(id).map(result => {
            return result;
        });
    }

    /**
     * update the user
     *
     * @param {UserDto} user
     * @returns {Observable<UserDto>}
     *
     * @memberOf UserService
     */
    @Loading('updateUser')
    public updateUser(user: UserDto): Observable<UserDto> {
        return this.userApi.updateUserById(user.id, user).map(result => {
            return result;
        });
    }

    /**
     * remove role from user
     *
     * @param {UserDto} user
     * @param {RoleDto} role
     * @returns {Observable<UserDto>}
     *
     * @memberOf UserService
     */
    @Loading('removeRoleFromUser')
    public removeRoleFromUser(user: UserDto, role: RoleDto): Observable<UserDto> {
        return this.userApi.removeUserRole(user.id, role.id).map(result => {
            return result;
        });
    }

    /**
     * add role to user
     *
     * @param {string} userId
     * @param {string} roleId
     * @returns {Observable<UserDto>}
     *
     * @memberOf UserService
     */
    @Loading('addRoleToUser')
    public addRoleToUser(userId: string, roleId: string): Observable<UserDto> {
        return this.userApi.updateUserRole(userId, roleId).map(result => {
            return result;
        });
    }

}
