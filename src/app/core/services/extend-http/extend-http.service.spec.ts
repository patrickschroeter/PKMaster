/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ExtendHttpService } from './extend-http.service';

describe('ExtendHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExtendHttpService]
    });
  });

  it('should ...', inject([ExtendHttpService], (service: ExtendHttpService) => {
    expect(service).toBeTruthy();
  }));
});
