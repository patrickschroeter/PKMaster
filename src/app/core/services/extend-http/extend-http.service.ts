import { Injectable } from '@angular/core';
import { Http, Request, RequestOptionsArgs, ConnectionBackend, RequestOptions, Headers, Response } from '@angular/http';

import { Observable, Observer } from 'rxjs/Rx';
import { AuthenticationService } from './..';

/**
 * Credits to https://www.illucit.com/blog/2016/03/angular2-http-authentication-interceptor/
 */

@Injectable()
export class ExtendHttpService extends Http {


    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
        super(backend, defaultOptions);
    }

    /**
     * set required attribute to the request.header
     * @param {(String|Request)} url
     * @param {RequestOptionsArgs} [options]
     */
    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        if (!options) { options = { headers: new Headers() }; };
        options.headers.set('Authorization', AuthenticationService.getStaticToken());
        options.headers.set('Accept', 'application/json');
        options.headers.set('Content-Type', 'application/json');
        // TODO: hack
        if (typeof url === 'string' && (url as string).indexOf('/connect/token')) {
            options.headers.set('Content-Type', 'application/x-www-form-urlencoded');
        }
        return super.request(url, options);
    }

}
