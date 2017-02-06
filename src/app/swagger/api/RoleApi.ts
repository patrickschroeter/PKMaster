/**
 * API Schnittstelle für die Prüfungskommision der Hochschule Augsburg
 * Hier sind alle Routen aufgelistet die zur verfügung stehen. Zuvor muss jedoch ein JWT Token überden Authorize Button hinzufügen
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
export class RoleApi {
    protected basePath = 'https://pk.multimedia.hs-augsburg.de:8000/';
    public defaultHeaders : Headers = new Headers();

    constructor(protected http: Http, @Optional() basePath: string) {
        if (basePath) {
            this.basePath = basePath;
        }
    }

    /**
     * Add Permission to Role
     *
     * @param roleId ID of Role
     * @param permissionId ID of Permission
     * @param permissionId2
     */
    public addPermissionToRole (roleId: string, permissionId: string, extraHttpRequestParams?: any ) : Observable<{}> {
        const path = this.basePath + '/roles/{roleId}/permissions/{permission_id}'
            .replace('{' + 'roleId' + '}', String(roleId))
            .replace('{' + 'permissionId' + '}', String(permissionId))

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'roleId' is not null or undefined
        if (roleId === null || roleId === undefined) {
            throw new Error('Required parameter roleId was null or undefined when calling addPermissionToRole.');
        }
        // verify required parameter 'permissionId' is not null or undefined
        if (permissionId === null || permissionId === undefined) {
            throw new Error('Required parameter permissionId was null or undefined when calling addPermissionToRole.');
        }
        let requestOptions: RequestOptionsArgs = {
            method: 'POST',
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
     * Create new Role
     *
     * @param role The new Role Object
     */
    public addRole (role?: models.Role, extraHttpRequestParams?: any ) : Observable<models.Role> {
        const path = this.basePath + '/roles';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        let requestOptions: RequestOptionsArgs = {
            method: 'POST',
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

    /**
     * Remove Permission of Role
     *
     * @param roleId ID of Role
     * @param permissionId ID of Permission
     * @param permissionId2
     */
    public deletePermissionOfRole (roleId: string, permissionId: string, extraHttpRequestParams?: any ) : Observable<{}> {
        const path = this.basePath + '/roles/{roleId}/permissions/{permission_id}'
            .replace('{' + 'roleId' + '}', String(roleId))
            .replace('{' + 'permissionId' + '}', String(permissionId))

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'roleId' is not null or undefined
        if (roleId === null || roleId === undefined) {
            throw new Error('Required parameter roleId was null or undefined when calling deletePermissionOfRole.');
        }
        // verify required parameter 'permissionId' is not null or undefined
        if (permissionId === null || permissionId === undefined) {
            throw new Error('Required parameter permissionId was null or undefined when calling deletePermissionOfRole.');
        }
        let requestOptions: RequestOptionsArgs = {
            method: 'DELETE',
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
     * Delete Role with Id
     *
     * @param roleId ID of Role
     */
    public deleteRoleById (roleId: string, extraHttpRequestParams?: any ) : Observable<{}> {
        const path = this.basePath + '/roles/{roleId}'
            .replace('{' + 'roleId' + '}', String(roleId));

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'roleId' is not null or undefined
        if (roleId === null || roleId === undefined) {
            throw new Error('Required parameter roleId was null or undefined when calling deleteRoleById.');
        }
        let requestOptions: RequestOptionsArgs = {
            method: 'DELETE',
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
     * GET one Role by Id
     *
     * @param roleId ID of Role
     */
    public getRoleById (roleId: string, extraHttpRequestParams?: any ) : Observable<models.RoleDto> {
        const path = this.basePath + '/roles/{roleId}'
            .replace('{' + 'roleId' + '}', String(roleId));

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'roleId' is not null or undefined
        if (roleId === null || roleId === undefined) {
            throw new Error('Required parameter roleId was null or undefined when calling getRoleById.');
        }
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
     * GET all Roles
     * The Roles Endpoint returns all Roles
     */
    public getRoles (extraHttpRequestParams?: any ) : Observable<Array<models.RoleDto>> {
        const path = this.basePath + '/roles';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
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
     * Update Role with Id
     *
     * @param roleId ID of Role
     * @param role Updated Role
     */
    public updateRoleById (roleId: string, role?: models.Role, extraHttpRequestParams?: any ) : Observable<models.Role> {
        const path = this.basePath + '/roles/{roleId}'
            .replace('{' + 'roleId' + '}', String(roleId));

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'roleId' is not null or undefined
        if (roleId === null || roleId === undefined) {
            throw new Error('Required parameter roleId was null or undefined when calling updateRoleById.');
        }
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

}
