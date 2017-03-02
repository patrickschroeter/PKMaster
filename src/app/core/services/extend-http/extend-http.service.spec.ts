/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HttpModule, XHRBackend, RequestOptions } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { ExtendHttpService } from './extend-http.service';

describe('ExtendHttpService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: ExtendHttpService,
                    useFactory: (xhrBackend: XHRBackend, requestOptions: RequestOptions, router: Router) =>
                        new ExtendHttpService(xhrBackend, requestOptions, router),
                    deps: [XHRBackend, RequestOptions, Router]
                }
            ],
            imports: [
                HttpModule,
                RouterTestingModule.withRoutes([
                    { path: '', component: class { } },
                ]),
            ]
        });
    });

    it('should ...', inject([ExtendHttpService], (service: ExtendHttpService) => {
        expect(service).toBeTruthy();
    }));
});
