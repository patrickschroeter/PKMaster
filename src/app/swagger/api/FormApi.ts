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
import { Parse } from 'app/shared/decorators/parse.decorator';

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
     * Activate Form
     *
     * @param formId ID of the Form
     */
    @Parse('FormDetailDto')
    public activateForm (formId: string, extraHttpRequestParams?: any ) : Observable<models.FormDetailDto> {
        const path = this.basePath + '/forms/{formId}/activate'
            .replace('{' + 'formId' + '}', String(formId));

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'formId' is not null or undefined
        if (formId === null || formId === undefined) {
            throw new Error('Required parameter formId was null or undefined when calling activateForm.');
        }
        let requestOptions: RequestOptionsArgs = {
            method: 'PUT',
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
     * Create new Form
     *
     * @param form new Form
     */
    @Parse('FormDetailDto')
    public addForm (form?: models.FormCreateDto, extraHttpRequestParams?: any ) : Observable<models.FormDetailDto> {
        const path = this.basePath + '/forms';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
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
     */
    public deleteFormById (formId: string, extraHttpRequestParams?: any ) : Observable<{}> {
        const path = this.basePath + '/forms/{formId}'
            .replace('{' + 'formId' + '}', String(formId));

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'formId' is not null or undefined
        if (formId === null || formId === undefined) {
            throw new Error('Required parameter formId was null or undefined when calling deleteFormById.');
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
                    return response.toString();
                }
            });
    }

    /**
     * GET one Form by Id
     *
     * @param formId ID of the Form
     */
    @Parse('FormDetailDto')
    public getFormById (formId: string, extraHttpRequestParams?: any ) : Observable<models.FormDetailDto> {
        const path = this.basePath + '/forms/{formId}'
            .replace('{' + 'formId' + '}', String(formId));

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'formId' is not null or undefined
        if (formId === null || formId === undefined) {
            throw new Error('Required parameter formId was null or undefined when calling getFormById.');
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
     * GET all Forms
     * The Forms Endpoint returns all Forms
     */
    @Parse('FormListDto')
    public getForms (extraHttpRequestParams?: any ) : Observable<Array<models.FormListDto>> {
        const path = this.basePath + '/forms';

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
     * Update Form with Id
     *
     * @param formId ID of the Form
     * @param formCreateDto The updated form
     */
    @Parse('FormDetailDto')
    public updateFormById (formId: string, formCreateDto?: models.FormCreateDto, extraHttpRequestParams?: any ) : Observable<models.FormDetailDto> {
        const path = this.basePath + '/forms/{formId}'
            .replace('{' + 'formId' + '}', String(formId));

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'formId' is not null or undefined
        if (formId === null || formId === undefined) {
            throw new Error('Required parameter formId was null or undefined when calling updateFormById.');
        }
        let requestOptions: RequestOptionsArgs = {
            method: 'PUT',
            headers: headerParams,
            search: queryParameters
        };
        requestOptions.body = JSON.stringify(formCreateDto);

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
