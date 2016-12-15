import { Injectable } from '@angular/core';
import { Http, Request, RequestOptionsArgs, ConnectionBackend, RequestOptions, Headers, Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { AuthenticationService } from './..';

/**
 * Credits to https://www.illucit.com/blog/2016/03/angular2-http-authentication-interceptor/
 */

@Injectable()
export class ExtendHttpService extends Http {


    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions, private authentication: AuthenticationService) {
        super(backend, defaultOptions);
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        if (!options) { options = { headers: new Headers() }; };
        options.headers.set('authentication', this.authentication.token);
        return super.request(url, options);
    }

}
