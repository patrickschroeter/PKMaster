/**
 * API Schnittstelle für die Prüfungskommision der Hochschule Augsburg
 * Hier sind alle Routen aufgelistet die zur verfügung stehen. Zuvor muss jedoch ein JWT Token überden Authorize Button hinzugefügt werden
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
     * @param comment New Comment
     */
    public addCommentToApplication (applicationId: string, comment?: models.CommentCreateDto, extraHttpRequestParams?: any ) : Observable<Array<models.CommentDetailDto>> {
        const path = this.basePath + '/applications/{applicationId}/comments'
            .replace('{' + 'applicationId' + '}', String(applicationId));

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'applicationId' is not null or undefined
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling addCommentToApplication.');
        }
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
     * @param application The new Application Object
     */
    public createApplication (application?: models.ApplicationCreateDto, extraHttpRequestParams?: any ) : Observable<models.ApplicationDetailDto> {
        const path = this.basePath + '/applications';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        let requestOptions: RequestOptionsArgs = {
            method: 'POST',
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
     * Delete Application with Id
     *
     * @param applicationId ID of the Application
     */
    public deleteApplicationById (applicationId: string, extraHttpRequestParams?: any ) : Observable<{}> {
        const path = this.basePath + '/applications/{applicationId}'
            .replace('{' + 'applicationId' + '}', String(applicationId));

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'applicationId' is not null or undefined
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling deleteApplicationById.');
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
     * GET one Application by Id
     *
     * @param applicationId ID of the Application
     */
    public getApplicationById (applicationId: string, extraHttpRequestParams?: any ) : Observable<models.ApplicationDetailDto> {
        const path = this.basePath + '/applications/{applicationId}'
            .replace('{' + 'applicationId' + '}', String(applicationId));

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'applicationId' is not null or undefined
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling getApplicationById.');
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
     * GET all Applications
     * The Applications Endpoint returns all Applications
     * @param filter Filter the Result
     * @param sort Sort the Result
     */
    public getApplications (filter?: string, sort?: string, extraHttpRequestParams?: any ) : Observable<Array<models.ApplicationListDto>> {
        const path = this.basePath + '/applications';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        if (filter !== undefined) {
            queryParameters.set('filter', String(filter));
        }

        if (sort !== undefined) {
            queryParameters.set('sort', String(sort));
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
     * GET history of Application
     * The Applications Endpoint returns the History of a application
     * @param applicationId
     */
    public getHistoryOfApplication (applicationId: string, extraHttpRequestParams?: any ) : Observable<Array<models.ApplicationDetailDto>> {
        const path = this.basePath + '/applications/{applicationId}/history'
            .replace('{' + 'applicationId' + '}', String(applicationId));

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'applicationId' is not null or undefined
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling getHistoryOfApplication.');
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
     * Update Application with Id
     *
     * @param applicationId ID of the Application
     * @param application Application to Update
     */
    public updateApplicationById (applicationId: string, application?: models.ApplicationCreateDto, extraHttpRequestParams?: any ) : Observable<models.ApplicationDetailDto> {
        const path = this.basePath + '/applications/{applicationId}'
            .replace('{' + 'applicationId' + '}', String(applicationId));

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'applicationId' is not null or undefined
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling updateApplicationById.');
        }
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
     * @param comment Updated Comment
     */
    public updateApplicationCommentById (applicationId: string, commentId: string, comment?: models.CommentCreateDto, extraHttpRequestParams?: any ) : Observable<models.CommentDetailDto> {
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
