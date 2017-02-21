import { Http, Headers, RequestOptionsArgs, Response, URLSearchParams } from '@angular/http';
import { Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FieldDefinitionDto, StyleDto, ValidationDto, StatusDto } from './../../../swagger';

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

    /**
     * GET all possible Status
     *
     */
    public getStatusValues(extraHttpRequestParams?: any): Observable<Array<StatusDto>> {
        return new Observable(observer => observer.next([]));
    }

}
