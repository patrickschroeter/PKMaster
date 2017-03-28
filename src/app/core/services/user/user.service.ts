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
import { Observable } from 'rxjs/Rx';

/** Services */
import { UserApi } from 'app/swagger';
import { AlertService } from 'app/modules/alert';
import { TranslationService } from 'app/modules/translation';

/** Models */
import { FieldModel, Fields } from 'app/models';
import { UserDetailDto, RoleDto, UserCreateDto, FieldDto } from 'app/swagger';

/** Decorators */
import { Loading } from 'app/shared/decorators/loading.decorator';

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
        const role: RoleDto = new RoleDto(({ id: roleId } as any));
        return this.userApi.addRoleToUser(userId, role).map((result: UserDetailDto) => {
            return result;
        });
    }

    /**
     * Create a new user
     *
     * @param {String} [rzName]
     * @param {String} [rzPassword]
     * @param {UserCreateDto} [user]
     * @param {*} [extraHttpRequestParams]
     * @returns {Observable<UserDetailDto>}
     *
     * @memberOf UserService
     */
    public addUser(rzName?: string, rzPassword?: string, user?: UserCreateDto): Observable<UserDetailDto> {
        return this.userApi.addUser(rzName, rzPassword, user)
            .catch(error => {
                this.alert.setAlert(
                    this.translationService.translate('registerErrorHeader'),
                    this.translationService.translate('registerErrorContent')
                );

                return Observable.throw('Wrong LDAP Credentials');
            });
    }

    /**
     * get user form
     *
     * @param {UserDetailDto} user
     * @returns {FieldDto[]}
     *
     * @memberOf UserService
     */
    public getUserForm(user: UserDetailDto): FieldDto[] {
        return [
            new FieldModel(
                user.rzName,
                {
                    label: this.translationService.translate('rzName'),
                    name: 'rzName'
                }
            ),
            new FieldModel(
                user.email,
                {
                    label: this.translationService.translate('email'),
                    name: 'email'
                }
            ),
            new FieldModel(
                user.employeeType,
                {
                    label: this.translationService.translate('employeeType'),
                    name: 'employeeType'
                }
            ),
            new FieldModel(
                user.ldapId ? user.ldapId.toString() : '',
                {
                    label: this.translationService.translate('ldapId'),
                    name: 'ldapId'
                }
            ),
            new Fields.Devider(),
            new FieldModel(
                user.firstname,
                {
                    label: this.translationService.translate('firstname'),
                    name: 'firstname'
                }
            ),
            new FieldModel(
                user.lastname,
                {
                    label: this.translationService.translate('lastname'),
                    name: 'lastname'
                }
            )
        ];
    }

    /**
     * get user form
     *
     * @param {UserDetailDto} user
     * @returns {FieldDto[]}
     *
     * @memberOf UserService
     */
    public getUserEditForm(user: UserDetailDto): FieldDto[] {
        return [
            new FieldModel(
                user.rzName,
                {
                    label: this.translationService.translate('rzName'),
                    name: 'rzName',
                    disabled: 'true'
                }
            ),
            new FieldModel(
                user.email,
                {
                    label: this.translationService.translate('email'),
                    name: 'email'
                }
            ),
            new FieldModel(
                user.employeeType,
                {
                    label: this.translationService.translate('employeeType'),
                    name: 'employeeType',
                    disabled: 'true'
                }
            ),
            new FieldModel(
                user.ldapId ? user.ldapId.toString() : '',
                {
                    label: this.translationService.translate('ldapId'),
                    name: 'ldapId',
                    disabled: 'true'
                }
            ),
            new Fields.Devider(),
            new FieldModel(
                user.firstname,
                {
                    label: this.translationService.translate('firstname'),
                    name: 'firstname'
                }
            ),
            new FieldModel(
                user.lastname,
                {
                    label: this.translationService.translate('lastname'),
                    name: 'lastname'
                }
            )
        ];
    }

}
