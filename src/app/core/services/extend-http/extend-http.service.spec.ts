/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HttpModule, XHRBackend, RequestOptions } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ExtendHttpService } from './extend-http.service';

describe('ExtendHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
          { provide: ExtendHttpService,
              useFactory: (xhrBackend: XHRBackend, requestOptions: RequestOptions) =>
               new ExtendHttpService(xhrBackend, requestOptions),
            deps: [XHRBackend, RequestOptions]
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
