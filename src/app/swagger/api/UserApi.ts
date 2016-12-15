/**
 * PK-4.0 API
 * API for the PK-4.0
 *
 * OpenAPI spec version: v1
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {Http, Headers, RequestOptionsArgs, Response, URLSearchParams} from '@angular/http';
import {Injectable, Optional} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import * as models from '../model/models';
import 'rxjs/Rx';

/* tslint:disable:no-unused-variable member-ordering */

'use strict';

@Injectable()
export class UserApi {
    protected basePath = 'https://pk.multimedia.hs-augsburg.de:8000/';
    public defaultHeaders : Headers = new Headers();

    constructor(protected http: Http, @Optional() basePath: string) {
        if (basePath) {
            this.basePath = basePath;
        }
    }

    /**
     * Create new AppUser from LDAP
     *
     * @param token Accesstoken to authenticate with the API
     * @param user The AppUser credentials
     */
    public addUser (token?: number, user?: models.AppUser, extraHttpRequestParams?: any ) : Observable<models.AppUser> {
        const path = this.basePath + '/users';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
            headerParams.set('token', String(token));

        let requestOptions: RequestOptionsArgs = {
            method: 'POST',
            headers: headerParams,
            search: queryParameters
        };
        requestOptions.body = JSON.stringify(user);

        return this.http.request(path, requestOptions)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     * GET one AppUser by Id
     *
     * @param userId ID of AppUser
     * @param token Accesstoken to authenticate with the API
     */
    public getUserById (userId: string, token?: number, extraHttpRequestParams?: any ) : Observable<models.UserDto> {
        const path = this.basePath + '/users/{userId}'
            .replace('{' + 'userId' + '}', String(userId));

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'userId' is not null or undefined
        if (userId === null || userId === undefined) {
            throw new Error('Required parameter userId was null or undefined when calling getUserById.');
        }
            headerParams.set('token', String(token));

        let requestOptions: RequestOptionsArgs = {
            method: 'GET',
            headers: headerParams,
            search: queryParameters
        };

        return this.http.request(path, requestOptions)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     * GET all AppUser
     * The Users Endpoint returns all Users
     * @param token Accesstoken to authenticate with the API
     */
    public getUsers (token?: number, extraHttpRequestParams?: any ) : Observable<Array<models.UserDto>> {
        const path = this.basePath + '/users';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
            headerParams.set('token', String(token));

        let requestOptions: RequestOptionsArgs = {
            method: 'GET',
            headers: headerParams,
            search: queryParameters
        };

        return this.http.request(path, requestOptions)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     * Reset the AppUser&#39;s Password
     *
     * @param userId ID of AppUser
     * @param token Accesstoken to authenticate with the API
     * @param email The AppUser&#39;s E-Mail address
     */
    public resetUserPassword (userId: number, token?: number, email?: string, extraHttpRequestParams?: any ) : Observable<{}> {
        const path = this.basePath + '/users/{userId}/reset'
            .replace('{' + 'userId' + '}', String(userId));

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'userId' is not null or undefined
        if (userId === null || userId === undefined) {
            throw new Error('Required parameter userId was null or undefined when calling resetUserPassword.');
        }
            headerParams.set('token', String(token));

        let requestOptions: RequestOptionsArgs = {
            method: 'PUT',
            headers: headerParams,
            search: queryParameters
        };
        requestOptions.body = JSON.stringify(email);

        return this.http.request(path, requestOptions)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     * Update AppUser with Id
     *
     * @param userId ID of AppUser
     * @param token Accesstoken to authenticate with the API
     * @param user Updated AppUser
     */
    public updateUserById (userId: string, token?: number, user?: models.AppUser, extraHttpRequestParams?: any ) : Observable<models.AppUser> {
        const path = this.basePath + '/users/{userId}'
            .replace('{' + 'userId' + '}', String(userId));

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'userId' is not null or undefined
        if (userId === null || userId === undefined) {
            throw new Error('Required parameter userId was null or undefined when calling updateUserById.');
        }
            headerParams.set('token', String(token));

        let requestOptions: RequestOptionsArgs = {
            method: 'PUT',
            headers: headerParams,
            search: queryParameters
        };
        requestOptions.body = JSON.stringify(user);

        return this.http.request(path, requestOptions)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     * Update the AppUser&#39;s Role
     *
     * @param userId ID of AppUser
     * @param token Accesstoken to authenticate with the API
     * @param role The AppUser&#39;s new Role
     */
    public updateUserRole (userId: number, token?: number, role?: number, extraHttpRequestParams?: any ) : Observable<{}> {
        const path = this.basePath + '/users/{userId}/role'
            .replace('{' + 'userId' + '}', String(userId));

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'userId' is not null or undefined
        if (userId === null || userId === undefined) {
            throw new Error('Required parameter userId was null or undefined when calling updateUserRole.');
        }
            headerParams.set('token', String(token));

        let requestOptions: RequestOptionsArgs = {
            method: 'PUT',
            headers: headerParams,
            search: queryParameters
        };
        requestOptions.body = JSON.stringify(role);

        return this.http.request(path, requestOptions)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    public login(username: string, password: string, token?: string): Observable<any> {
        return null;
    }

    public logout(token: string): Observable<any> {
        return null;
    }
}
