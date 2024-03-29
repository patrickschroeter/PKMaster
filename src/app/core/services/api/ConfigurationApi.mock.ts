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

import { Http, Headers, RequestOptionsArgs, Response, URLSearchParams } from '@angular/http';
import { Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FieldDefinitionDto, StyleDto, ValidationDto, StatusDto } from 'app/swagger';

@Injectable()
export class ConfigurationApiMock {

    constructor() { }

    /**
     * GET all Field Definitions
     * The config Endpoint returns all form relevant configs
     */
    public getFieldDefinitions(extraHttpRequestParams?: any): Observable<Array<FieldDefinitionDto>> {
        return new Observable(observer => observer.next([]));
    }

    /**
     * GET all possible Styles
     *
     */
    public getFieldStyles(extraHttpRequestParams?: any): Observable<Array<StyleDto>> {
        return new Observable(observer => observer.next([]));
    }

    /**
     * GET all possible Validations
     *
     */
    public getFieldValidations(extraHttpRequestParams?: any): Observable<Array<ValidationDto>> {
        return new Observable(observer => observer.next([]));
    }

}
