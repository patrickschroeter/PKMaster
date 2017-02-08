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
    public getUsers(): Observable<Array<UserDto>> {
        return this.userApi.getUsers().map(result => {
            return result;
        });
    }

    /**
     * get user by id
     * @param {String} id
     */
    @Loading('getUserById')
    public getUserById(id: string): Observable<UserDto> {
        return this.userApi.getUserById(id).map(result => {
            return result;
        });
    }

    /**
     * update the user
     * @param {AppUser} user
     */
    @Loading('updateUser')
    public updateUser(user: UserDto): Observable<UserDto> {
        return this.userApi.updateUserById(user.id, user).map(result => {
            return result;
        });
    }

    /**
     * remove role from user
     * @param {AppUser} user
     * @param {Role} role
     */
    @Loading('removeRoleFromUser')
    public removeRoleFromUser(user: UserDto, role: RoleDto): Observable<UserDto> {
        return this.userApi.removeUserRole(user.id, role.id).map(result => {
            return result;
        });
    }

    /**
     * add role to user
     * @param {String} userId
     * @param {String} roleId
     */
    @Loading('addRoleToUser')
    public addRoleToUser(userId: string, roleId: string): Observable<UserDto> {
        return this.userApi.updateUserRole(userId, roleId).map(result => {
            return result;
        });
    }

}
