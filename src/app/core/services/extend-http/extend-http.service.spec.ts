/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HttpModule, XHRBackend, RequestOptions } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ExtendHttpService } from './extend-http.service';

import { AuthenticationService, AuthenticationMock } from './..';

describe('ExtendHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
          { provide: ExtendHttpService,
              useFactory: (xhrBackend: XHRBackend, requestOptions: RequestOptions, authentication: AuthenticationService) =>
               new ExtendHttpService(xhrBackend, requestOptions, authentication),
            deps: [XHRBackend, RequestOptions, AuthenticationService]
          },
          { provide: AuthenticationService, useClass: AuthenticationMock }
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
