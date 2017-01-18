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
export class ApplicationApi {
    protected basePath = 'https://pk.multimedia.hs-augsburg.de:8000/';
    public defaultHeaders : Headers = new Headers();

    constructor(protected http: Http, @Optional() basePath: string) {
        if (basePath) {
            this.basePath = basePath;
        }
    }

    /**
     * Add comment to Application
     *
     * @param applicationId ID of the Application
     * @param token Accesstoken to authenticate with the API
     * @param comment New Comment
     */
    public addCommentToApplication (applicationId: string, token?: number, comment?: models.CommentCreateDto, extraHttpRequestParams?: any ) : Observable<models.CommentDto> {
        const path = this.basePath + '/applications/{applicationId}/comments'
            .replace('{' + 'applicationId' + '}', String(applicationId));

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'applicationId' is not null or undefined
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling addCommentToApplication.');
        }
            headerParams.set('token', String(token));

        let requestOptions: RequestOptionsArgs = {
            method: 'POST',
            headers: headerParams,
            search: queryParameters
        };
        requestOptions.body = JSON.stringify(comment);

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
     * Create new Application
     *
     * @param token Accesstoken to authenticate with the API
     * @param application The new Application Object
     */
    public createApplication (token?: number, application?: models.ApplicationCreateDto, extraHttpRequestParams?: any ) : Observable<{}> {
        const path = this.basePath + '/applications';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
            headerParams.set('token', String(token));

        let requestOptions: RequestOptionsArgs = {
            method: 'POST',
            headers: headerParams,
            search: queryParameters
        };
        /** TODO: Hack */
        application.statusId = "ba72b0fb-9969-4942-801e-685b86059421";

        requestOptions.body = JSON.stringify(application);

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
     * Delete Application with Id
     *
     * @param applicationId ID of the Application
     * @param token Accesstoken to authenticate with the API
     */
    public deleteApplicationById (applicationId: string, token?: number, extraHttpRequestParams?: any ) : Observable<{}> {
        const path = this.basePath + '/applications/{applicationId}'
            .replace('{' + 'applicationId' + '}', String(applicationId));

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'applicationId' is not null or undefined
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling deleteApplicationById.');
        }
            headerParams.set('token', String(token));

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
     * GET one Application by Id
     *
     * @param applicationId ID of the Application
     * @param token Accesstoken to authenticate with the API
     */
    public getApplicationById (applicationId: string, token?: number, extraHttpRequestParams?: any ) : Observable<models.ApplicationDto> {
        const path = this.basePath + '/applications/{applicationId}'
            .replace('{' + 'applicationId' + '}', String(applicationId));

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'applicationId' is not null or undefined
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling getApplicationById.');
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
                    let result = response.json();
                    if (result.filledForm) {
                        result.attributes = JSON.parse(result.filledForm);
                    }
                    console.log(result);
                    return response.json();
                }
            });
    }

    /**
     * GET all Applications
     * The Applications Endpoint returns all Applications
     * @param token Accesstoken to authenticate with the API
     * @param filter Filter the Result
     * @param sort Sort the Result
     */
    public getApplications (token?: number, filter?: string, sort?: string, extraHttpRequestParams?: any ) : Observable<Array<models.ApplicationDto>> {
        const path = this.basePath + '/applications';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        if (filter !== undefined) {
            queryParameters.set('filter', String(filter));
        }

        if (sort !== undefined) {
            queryParameters.set('sort', String(sort));
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
     * GET history of Application
     * The Applications Endpoint returns the History of a application
     * @param applicationId
     * @param token Accesstoken to authenticate with the API
     */
    public getHistoryOfApplication (applicationId: string, token?: number, extraHttpRequestParams?: any ) : Observable<Array<models.ApplicationDto>> {
        const path = this.basePath + '/applications/{applicationId}/history'
            .replace('{' + 'applicationId' + '}', String(applicationId));

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'applicationId' is not null or undefined
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling getHistoryOfApplication.');
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
     * Update Application with Id
     *
     * @param applicationId ID of the Application
     * @param token Accesstoken to authenticate with the API
     * @param application Application to Update
     */
    public updateApplicationById (applicationId: string, token?: number, application?: models.ApplicationCreateDto, extraHttpRequestParams?: any ) : Observable<models.ApplicationDto> {
        const path = this.basePath + '/applications/{applicationId}'
            .replace('{' + 'applicationId' + '}', String(applicationId));

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'applicationId' is not null or undefined
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling updateApplicationById.');
        }
            headerParams.set('token', String(token));

        let requestOptions: RequestOptionsArgs = {
            method: 'PUT',
            headers: headerParams,
            search: queryParameters
        };
        requestOptions.body = JSON.stringify(application);

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
     * Update a comment with Id
     *
     * @param applicationId ID of the Application
     * @param commentId ID of the Comment
     * @param token Accesstoken to authenticate with the API
     * @param comment Updated Comment
     */
    public updateApplicationCommentById (applicationId: string, commentId: string, token?: number, comment?: models.CommentCreateDto, extraHttpRequestParams?: any ) : Observable<models.CommentDto> {
        const path = this.basePath + '/applications/{applicationId}/comments/{commentId}'
            .replace('{' + 'applicationId' + '}', String(applicationId))
            .replace('{' + 'commentId' + '}', String(commentId));

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'applicationId' is not null or undefined
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling updateApplicationCommentById.');
        }
        // verify required parameter 'commentId' is not null or undefined
        if (commentId === null || commentId === undefined) {
            throw new Error('Required parameter commentId was null or undefined when calling updateApplicationCommentById.');
        }
            headerParams.set('token', String(token));

        let requestOptions: RequestOptionsArgs = {
            method: 'PUT',
            headers: headerParams,
            search: queryParameters
        };
        requestOptions.body = JSON.stringify(comment);

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
