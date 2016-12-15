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
export class FormApi {
    protected basePath = 'https://pk.multimedia.hs-augsburg.de:8000/';
    public defaultHeaders : Headers = new Headers();

    constructor(protected http: Http, @Optional() basePath: string) {
        if (basePath) {
            this.basePath = basePath;
        }
    }

    /**
     * Create new Form
     * 
     * @param token Accesstoken to authenticate with the API
     * @param form new Form
     */
    public addForm (token?: number, form?: models.FormCreateDto, extraHttpRequestParams?: any ) : Observable<models.FormsDto> {
        const path = this.basePath + '/forms';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
            headerParams.set('token', String(token));

        let requestOptions: RequestOptionsArgs = {
            method: 'POST',
            headers: headerParams,
            search: queryParameters
        };
        requestOptions.body = JSON.stringify(form);

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
     * Delete Form with Id
     * 
     * @param formId ID of the Form
     * @param token Accesstoken to authenticate with the API
     */
    public deleteFormById (formId: string, token?: number, extraHttpRequestParams?: any ) : Observable<{}> {
        const path = this.basePath + '/forms/{formId}'
            .replace('{' + 'formId' + '}', String(formId));

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'formId' is not null or undefined
        if (formId === null || formId === undefined) {
            throw new Error('Required parameter formId was null or undefined when calling deleteFormById.');
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
     * GET one Form by Id
     * 
     * @param formId ID of the Form
     * @param token Accesstoken to authenticate with the API
     */
    public getFormById (formId: string, token?: number, extraHttpRequestParams?: any ) : Observable<models.SingleFormDto> {
        const path = this.basePath + '/forms/{formId}'
            .replace('{' + 'formId' + '}', String(formId));

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'formId' is not null or undefined
        if (formId === null || formId === undefined) {
            throw new Error('Required parameter formId was null or undefined when calling getFormById.');
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
     * GET the config for input types
     * 
     * @param token Accesstoken to authenticate with the API
     */
    public getFormConfig (token?: number, extraHttpRequestParams?: any ) : Observable<models.Field> {
        const path = this.basePath + '/forms/config/types';

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
     * GET the config for input options
     * 
     * @param token Accesstoken to authenticate with the API
     */
    public getFormOptions (token?: number, extraHttpRequestParams?: any ) : Observable<any> {
        const path = this.basePath + '/forms/config/options';

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
     * GET the config for input Styles
     * 
     * @param token Accesstoken to authenticate with the API
     */
    public getFormStyles (token?: number, extraHttpRequestParams?: any ) : Observable<any> {
        const path = this.basePath + '/forms/config/styles';

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
     * GET the config for input Validations
     * 
     * @param token Accesstoken to authenticate with the API
     */
    public getFormValidations (token?: number, extraHttpRequestParams?: any ) : Observable<any> {
        const path = this.basePath + '/forms/config/validations';

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
     * GET all Forms
     * The Forms Endpoint returns all Forms
     * @param token Accesstoken to authenticate with the API
     */
    public getForms (token?: number, extraHttpRequestParams?: any ) : Observable<Array<models.FormsDto>> {
        const path = this.basePath + '/forms';

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
     * Update Form with Id
     * 
     * @param formId ID of the Form
     * @param token Accesstoken to authenticate with the API
     * @param form Updated Form
     */
    public updateFormById (formId: number, token?: number, form?: models.Form, extraHttpRequestParams?: any ) : Observable<models.Form> {
        const path = this.basePath + '/forms/{formId}'
            .replace('{' + 'formId' + '}', String(formId));

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'formId' is not null or undefined
        if (formId === null || formId === undefined) {
            throw new Error('Required parameter formId was null or undefined when calling updateFormById.');
        }
            headerParams.set('token', String(token));

        let requestOptions: RequestOptionsArgs = {
            method: 'PUT',
            headers: headerParams,
            search: queryParameters
        };
        requestOptions.body = JSON.stringify(form);

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